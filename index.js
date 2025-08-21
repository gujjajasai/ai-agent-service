const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Use Render's port if available

// --- Middleware Setup ---
// Allow requests from your specific Vercel frontend URL
const corsOptions = {
  origin: 'https://support-ticket-frontend-gujjajasai.vercel.app' // Replace with your actual frontend URL
};
app.use(cors(corsOptions));
app.use(express.json());

// --- AI Client Initialization ---
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- API Routes ---
// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ status: "AI Agent is alive and running" });
});

// Chat route
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { history, message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Request body must contain a 'message'." });
    }
    const chat = model.startChat({
      history: history.map(msg => ({
          role: msg.author === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
      })),
    });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    res.json({ reply: response.text() });
  } catch (error) {
    console.error("Chat endpoint error:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`AI Agent server is running on port ${PORT}`);
});