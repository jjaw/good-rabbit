export async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
		{
			headers: { Authorization: `Bearer ${process.env.INFERENCE_API_KEY}` },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

