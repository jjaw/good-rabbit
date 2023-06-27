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
          prompt: `Write a nice short email that encourages positivity for my friend ${receipientName}. Some relevant information are ${extra}. The message should be not be more than 100 words. Keep it short and sweet. My name is ${senderName}. If I didn't give you a name, then it's irrelevant.`,
          max_tokens: 100,
          temperature: 0.5,
          top_p: 0.5,
        }),
      }
    );
    const GPTdata = await response.json();
    console.log(process.env.OPENAI_API_KEY);
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
