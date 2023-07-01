const generateMessage = async ({
  recipientName,
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
          model: "text-davinci-003",
          prompt: `Write a nice message (no more than 88 words) of positivity for ${recipientName}. I am a friend but that's irrelevant. Some relevant information are ${extra}.`,
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

export default generateMessage;