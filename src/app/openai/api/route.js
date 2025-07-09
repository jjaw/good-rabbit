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

    if (!recipientName) {
      return new NextResponse(
        "Recipient's name not found",
        { status: 400 }
      );
    }

    const message = await generateMessage({ recipientName, extra });

    try {
      const jsonResponse = await querySentiment(message);
      const label = jsonResponse[0][0].label;
      console.log("Sentiment label:", label);

      // Handle both model response formats:
      // cardiffnlp/twitter-roberta-base-sentiment-latest returns: LABEL_0 (negative), LABEL_1 (neutral), LABEL_2 (positive)
      // ProsusAI/finbert returns: POSITIVE, NEGATIVE
      const isPositive = label === "LABEL_2" || label === "POSITIVE";
      
      if (isPositive) {
        try {
          await resend.emails.send({
            from: "hello@goodrabb.it",
            to: email,
            subject: "Random act of positivity!",
            text: message,
            html: `<strong>${message}</strong>`,
            react: EmailTemplate(message, recipientName),
          });
          return NextResponse.json({
            success: true,
            messageSent: message,
          });
        } catch (err) {
          console.error("Error sending email:", err);
          return new NextResponse("Error with sending email", { status: 400 });
        }
      } else {
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
