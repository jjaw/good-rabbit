// senti-analysis.js
/**
 * Send text to Hugging Face’s sentiment-analysis model
 * and return the parsed result, logging raw responses.
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
      body: JSON.stringify({ inputs: text }),
    }
  );

  // Grab raw text so we can log exactly what HF returned
  const raw = await response.text();
  console.log(`HF returned ${response.status}:`, raw);

  // Parse JSON (or throw if malformed)
  let result;
  try {
    result = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid JSON from HF: ${err.message}`);
  }

  // If HF returned an error status, include the message
  if (!response.ok) {
    throw new Error(
      `Hugging Face error ${response.status}: ${result.error || raw}`
    );
  }

  return result;
}
