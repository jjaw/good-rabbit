// senti-analysis.js
/**
 * Send text to Hugging Face's sentiment-analysis model
 * and return the parsed result, while logging and bubbling up
 * any raw non-JSON response.
 */
export async function querySentiment(text) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.INFERENCE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    }
  );

  // Grab the raw body so we can inspect it
  const raw = await response.text();
  console.log(`HF returned ${response.status}:`, raw);

  let result;
  try {
    result = JSON.parse(raw);
  } catch (err) {
    // Include the raw in the thrown error for visibility
    throw new Error(`Invalid JSON from HF: ${err.message}; raw: ${raw}`);
  }

  if (!response.ok) {
    throw new Error(
      `Hugging Face error ${response.status}: ${result.error || raw}`
    );
  }

  return result;
}
