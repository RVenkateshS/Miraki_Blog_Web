// api/chat.js
export default async function handler(req, res) {
  // 1. Get the message from your frontend
  const { inputs, parameters } = JSON.parse(req.body);

  // 2. Send it to Hugging Face (Mistral Model)
  const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
    headers: {
      Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`, // Securely uses the key from Vercel
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs, parameters }),
  });

  // 3. Handle errors
  if (!response.ok) {
     const error = await response.json();
     return res.status(response.status).json(error);
  }

  // 4. Send the answer back to your website
  const result = await response.json();
  res.status(200).json(result);
}