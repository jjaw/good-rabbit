// src/lib/sentiment.js

/**
 * Send a text string to Hugging Face’s sentiment-analysis model
 * (distilbert-base-uncased-finetuned-sst-2-english) and return the result.
 *
 * @param {string} text  The text you want to classify.
 * @returns {Promise<Object[]>}  An array of { label, score } objects.
 */
export async function querySentiment(text) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.INFERENCE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    // Surface the HF error message if available
    throw new Error(result.error || "Hugging Face inference error");
  }

  return result;
}
