// senti-analysis.js
/**
 * Send text to Hugging Face's sentiment-analysis model
 * and return the parsed result, while logging and bubbling up
 * any raw non-JSON response.
 */
export async function querySentiment(text) {
  // Check if API key is available
  if (!process.env.INFERENCE_API_KEY) {
    throw new Error("INFERENCE_API_KEY environment variable is not set");
  }

  console.log("Using HF API key:", process.env.INFERENCE_API_KEY.substring(0, 10) + "...");
  
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

  // If we get a 404 or "Not Found", try a different model as fallback
  if (response.status === 404 || raw.includes("Not Found")) {
    console.log("Primary model not found, trying fallback model...");
    
    const fallbackResponse = await fetch(
      "https://api-inference.huggingface.co/models/ProsusAI/finbert",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.INFERENCE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const fallbackRaw = await fallbackResponse.text();
    console.log(`Fallback HF returned ${fallbackResponse.status}:`, fallbackRaw);

    let result;
    try {
      result = JSON.parse(fallbackRaw);
    } catch (err) {
      throw new Error(`Invalid JSON from fallback HF: ${err.message}; raw: ${fallbackRaw}`);
    }

    if (!fallbackResponse.ok) {
      throw new Error(
        `Hugging Face fallback error ${fallbackResponse.status}: ${result.error || fallbackRaw}`
      );
    }

    // FinBERT returns POSITIVE/NEGATIVE labels
    return result;
  }

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
