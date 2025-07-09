// route.js
import { NextResponse } from 'next/server';
import EmailTemplate from "@/app/components/email-template";
import { Resend } from "resend";
import { querySentiment } from "@/app/components/senti-analysis";
import generateMessage from "@/app/components/generate-message";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { senderName, recipientName, email, extra } = body;

    // Guard clause for recipientName
    if (!recipientName) {
      return new NextResponse(
        "Recipient's name not found",
        { status: 400 }
      );
    }

    // Generate the message
    const message = await generateMessage({
      recipientName,
      extra,
    });

    // Sentiment analysis
    try {
      const jsonResponse = await querySentiment(message);
      // adjust indexing if your model returns differently
      const label = jsonResponse[0][0].label;
      console.log("Sentiment label:", label);

      if (label === "POSITIVE") {
        // Send the email
        try {
          const data = await resend.emails.send({
            from: "hello@goodrabb.it",
            to: email, // use delivered@resend.dev for testing
            subject: "Random act of positivity!",
            text: message,
            html: `<strong>${message}</strong>`,
            react: EmailTemplate(message, recipientName),
          });

          const responseData = {
            data: `${senderName} ${recipientName} ${email} ${extra}`,
            message,
            success: "Email sent successfully",
          };

          return new NextResponse(
            JSON.stringify({ responseData }),
            {
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (err) {
          console.error("Error sending email:", err);
          return new NextResponse(
            "Error with sending email",
            { status: 400 }
          );
        }
      } else {
        return new NextResponse(
          JSON.stringify({ error: "say nicer things~" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } catch (error) {
      // Bubble up the real HF error
      console.error("Sentiment analysis failed:", error);
      return new NextResponse(
        JSON.stringify({ error: error.message }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Internal error in POST handler:", error);
    return new NextResponse(
      "Internal Server Error",
      { status: 500 }
    );
  }
}
