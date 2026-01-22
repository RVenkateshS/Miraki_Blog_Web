// // api/chat.js
// export default async function handler(req, res) {
//   try {
//     // 1. Safe Data Unpacking (Fixes the Vercel crash)
//     const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
//     const { inputs } = body;

//     // 2. Call Hugging Face
//     const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
//       headers: {
//         Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify({ inputs }),
//     });

//     // 3. Check for errors from Hugging Face
//     if (!response.ok) {
//       const errorData = await response.json();
//       return res.status(response.status).json({ error: errorData });
//     }

//     const result = await response.json();
//     res.status(200).json(result);

//   } catch (error) {
//     console.error("Server Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// api/chat.js

export default async function handler(req, res) {
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { inputs } = body;

    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        inputs: inputs,
        parameters: {
          // CRITICAL: Keep this low (200-300) to finish before Vercel's 10s limit
          max_new_tokens: 250, 
          temperature: 0.7,
          return_full_text: false
        },
        options: {
          // Tells HF to wait if model is loading (instead of 503 error)
          // Note: If this takes >10s, Vercel will still timeout.
          wait_for_model: true 
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    const result = await response.json();
    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}