// route.js
import { NextResponse } from 'next/server';
import EmailTemplate from "@/app/components/email-template";
import { Resend } from "resend";
import { querySentiment, testAPIKey } from "@/app/components/senti-analysis";
import generateMessage from "@/app/components/generate-message";

const resend = new Resend(process.env.RESEND_API_KEY);

// Test endpoint to check API key status
export async function GET() {
  try {
    console.log("Testing API keys...");
    console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);
    console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
    console.log("INFERENCE_API_KEY exists:", !!process.env.INFERENCE_API_KEY);
    
    const testResult = await testAPIKey();
    return NextResponse.json(testResult);
  } catch (error) {
    console.error("GET endpoint error:", error);
    return NextResponse.json({ valid: false, error: error.message });
  }
}

export async function POST(req) {
  try {
    console.log("POST request received");
    
    // Check environment variables
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY missing");
      return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
    }
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY missing");
      return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
    }
    if (!process.env.INFERENCE_API_KEY) {
      console.error("INFERENCE_API_KEY missing");
      return NextResponse.json({ error: "INFERENCE_API_KEY not configured" }, { status: 500 });
    }

    const body = await req.json();
    console.log("Request body:", { senderName: body.senderName, recipientName: body.recipientName, email: body.email });
    
    const { senderName, recipientName, email, extra } = body;

    if (!recipientName) {
      return new NextResponse(
        "Recipient's name not found",
        { status: 400 }
      );
    }

    console.log("Generating message...");
    const message = await generateMessage({ recipientName, extra });
    console.log("Generated message:", message);

    try {
      console.log("Running sentiment analysis...");
      const jsonResponse = await querySentiment(message);
      const label = jsonResponse[0][0].label;
      console.log("Sentiment label:", label);

      // tabularisai/multilingual-sentiment-analysis returns:
      // "Very Negative", "Negative", "Neutral", "Positive", "Very Positive" (with spaces)
      const isAcceptable = label === "Neutral" || label === "Positive" || label === "Very Positive";
      
      if (isAcceptable) {
        console.log("Sentiment acceptable, sending email...");
        try {
          await resend.emails.send({
            from: "hello@goodrabb.it",
            to: email,
            subject: "Random act of positivity!",
            text: message,
            html: `<strong>${message}</strong>`,
            react: EmailTemplate(message, recipientName),
          });
          console.log("Email sent successfully");
          return NextResponse.json({
            success: true,
            messageSent: message,
          });
        } catch (err) {
          console.error("Error sending email:", err);
          return new NextResponse("Error with sending email", { status: 400 });
        }
      } else {
        console.log("Sentiment not acceptable:", label);
        return NextResponse.json(
          { error: "say nicer things~" },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Sentiment analysis failed:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Internal error in POST handler:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
