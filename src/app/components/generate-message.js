const generateMessage = async ({ recipientName, extra }) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",        // use the chat model
          messages: [
            // optional system prompt to steer tone
            {
              role: "system",
              content: "You are a friendly coach. Always write short uplifting notes under 88 words"
            },
            {
              role: "user",
              content: `Write a nice message (no more than 88 words) of positivity for ${recipientName}. I am a friend but that's irrelevant. Some relevant information are ${extra}.`
            }
          ],
          max_tokens: 120,
          temperature: 1,
          top_p: 0.77,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // surface any API error
      throw new Error(data.error?.message || "OpenAI API error");
    }

    // extract the assistant's message
    return data.choices[0].message.content.trim();

  } catch (err) {
    console.error("generateMessage error:", err);
    throw err;
  }
}

export default generateMessage;
