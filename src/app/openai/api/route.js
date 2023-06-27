import { NextResponse } from 'next/server';

const generateMessage = async ({
  senderName,
  receipientName,
  extra,
}) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "text-ada-001",
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
  }
} 

export async function POST(req) {
  try {
    // Parse JSON data from ReadableStream
    // body.senderName
    // body.recipientName
    // body.email
    // body.extra
    const body = await req.json();
    const { senderName, receipientName, email, extra } = body;

    // Guard clause checks for recipient's name,
    // and returns early if it is not found
    if (!body.receipientName) {
      // Sends a HTTP bad request error code
      return new NextResponse('Recipient\'s name not found', { status: 400 });
    }

    const message = await generateMessage({
      senderName,
      receipientName,
      extra,
    });

    // Found the name.
    // Construct the response body as an object
    const responseData = {
      data: `${body.senderName} ${body.receipientName} ${body.email} ${body.extra}`,
      message: message
    };
   
    // Create the response with JSON data and Content-Type header
    const response = new NextResponse(JSON.stringify(responseData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    // Log the error and return a 500 status code
    console.error('An error occurred:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
