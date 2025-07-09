// senti-analysis.js
/**
 * Send text to Hugging Face's sentiment-analysis model
 * and return the parsed result, while logging and bubbling up
 * any raw non-JSON response.
 */

// Test function to check if API key is valid
export async function testAPIKey() {
  if (!process.env.INFERENCE_API_KEY) {
    return { valid: false, error: "API key not set" };
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/tabularisai/multilingual-sentiment-analysis",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.INFERENCE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: "test" }),
      }
    );

    if (response.status === 401) {
      return { valid: false, error: "Invalid API key" };
    } else if (response.status === 429) {
      return { valid: false, error: "Rate limited" };
    } else if (response.ok) {
      return { valid: true };
    } else {
      const text = await response.text();
      return { valid: false, error: `HTTP ${response.status}: ${text}` };
    }
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

export async function querySentiment(text) {
  // Check if API key is available
  if (!process.env.INFERENCE_API_KEY) {
    throw new Error("INFERENCE_API_KEY environment variable is not set");
  }

  console.log("Using HF API key:", process.env.INFERENCE_API_KEY.substring(0, 10) + "...");
  
  const response = await fetch(
    "https://api-inference.huggingface.co/models/tabularisai/multilingual-sentiment-analysis",
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

  // If we get a 401, provide specific guidance
  if (response.status === 401) {
    console.error("401 Unauthorized - API key is invalid or expired");
    throw new Error("Invalid Hugging Face API key. Please check your INFERENCE_API_KEY in Vercel environment variables.");
  }

  // If we get a 429, it's rate limiting
  if (response.status === 429) {
    console.error("429 Rate Limited - Too many requests");
    throw new Error("Rate limited by Hugging Face. Please try again later or upgrade your plan.");
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
