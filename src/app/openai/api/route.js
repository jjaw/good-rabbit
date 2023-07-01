import { NextResponse } from 'next/server';
import EmailTemplate from "@/app/components/email-template";
import { Resend } from "resend";
import { query } from "@/app/components/senti-analysis";
//import { RESEND_API_KEY } from '$env/static/public';

// on vercel
//const resend = new Resend(RESEND_API_KEY);

// works for non vercel
// 
 const resend = new Resend(process.env.RESEND_API_KEY);

const generateMessage = async ({
  receipientName,
  extra,
}) => {
  try {
    console.log("fetching from openapi");
    const response = await fetch(
      "https://api.openai.com/v1/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `Write a nice message (no more than 88 words) of positivity for ${receipientName}. I am a friend but that's irrelevant. Some relevant information are ${extra}.`,
          max_tokens: 120,
          temperature: 1,
          top_p: 0.77,
        }),
      }
    );
    
    const GPTdata = await response.json();
    
    
    return GPTdata.choices[0].text;
  } catch (err) {
    console.error(err);
    throw err;
  }
} 
console.log("fetched from openAI");
export async function POST(req) {
  try {
    // Parse JSON data from ReadableStream
    // body.senderName
    // body.recipientName
    // body.email
    // body.extra
    
    console.log("waiting req from POST");
    const body = await req.json();
    console.log("retrieve body");

    const { senderName, receipientName, email, extra } = body;

    // Guard clause checks for recipient's name,
    // and returns early if it is not found
    if (!body.receipientName) {
      // Sends a HTTP bad request error code
      return new NextResponse('Recipient\'s name not found', { status: 400 });
    }
    console.log("generating message");
    const message = await generateMessage({
      receipientName,
      extra,
    });
    console.log("message generated");
    // Text sentiment analysis
    try {
      console.log("try sentiment analysis")
      const jsonResponse = await query(message);
      const label = jsonResponse[0][0].label;
      console.log(message);
      console.log(label);
      if (label === "POSITIVE") {
        // Try to send email
        try {
          const data = await resend.emails.send({
            from: "hello@goodrabb.it",
            to: "delivered@resend.dev", // For testing use delivered@resend.dev
            subject: "Random act of positivity!",
            text: message,
            html: `<strong>${message}</strong>`,
            react: EmailTemplate(message, receipientName)
          });

          const responseData = {
            data: `${senderName} ${receipientName} ${email} ${extra}`,
            message: message,
            success: "Email sent success",
            //react: EmailTemplate(message)
          };
          // Create the response with JSON data and Content-Type header
          const response = new NextResponse(JSON.stringify({responseData}), {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          // Return the response
          return response;
        } catch (err) {
          // Error with outbound mail
          console.error('An error occurred:', err);
          return new NextResponse('Error with sending email', { status: 400 });
        }
      } else {
        // If text failed sentiment analysis
        return new NextResponse(JSON.stringify({ error: "say nicer things~" }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Request failed with error:', error);
      return new NextResponse(JSON.stringify({ error: "Error with sentiment analysis query" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
  } catch (error) {
    // Log the error and return a 500 status code
    console.error('An error occurred:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
