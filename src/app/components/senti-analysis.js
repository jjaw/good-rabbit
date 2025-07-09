// src/lib/sentiment.js

/**
 * Classify a piece of text with distilbert-sst2 via Hugging Face’s serverless API.
 * @param {string} text  The text to analyze.
 * @returns {Promise<Array<{ label: string, score: number }>>}
 */
export async function querySentiment(text) {
  const API_URL =
    "https://router.huggingface.co/hf-inference/models/distilbert-base-uncased-finetuned-sst-2-english";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: text }),
  });

  // Log raw status & body for easier debugging
  const raw = await response.text();
  console.log("HF status:", response.status, response.statusText);
  console.log("HF body:", raw);

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(`Non-JSON response from HF: ${raw}`);
  }

  if (!response.ok) {
    // Propagate the API’s own error message when available
    throw new Error(data.error || `HF error ${response.status}`);
  }

  return data;  // e.g. [ { label: "POSITIVE", score: 0.99 } ]
}
