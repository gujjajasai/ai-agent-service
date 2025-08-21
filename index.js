const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
const PORT = 3001;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// This is the new, simplified chat endpoint
app.post('/api/ai/chat', async (req, res) => {
    try {
        const { history, message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Request body must contain a 'message'." });
        }

        // --- THIS IS THE DEFINITIVE FIX ---
        // We will now prepare the history ON THE BACKEND to ensure it's always valid.

        // 1. Create the correctly formatted history for the AI model
        const formattedHistory = history.map(msg => ({
            role: msg.author === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // 2. The crucial validation step:
        // If the history starts with a 'model' message, we simply remove it.
        // This makes the backend resilient to what the frontend sends.
        if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
            formattedHistory.shift(); // .shift() removes the first element from an array
        }

        // 3. Start the chat with the GUARANTEED-TO-BE-VALID history
        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                maxOutputTokens: 200,
            },
        });
        
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error("An error occurred in the chat endpoint:", error);
        res.status(500).json({ error: "An internal server error occurred." });
    }
});
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({ status: "AI Agent is running" }));
});
app.listen(PORT, () => {
    console.log(`AI Agent server is running on http://localhost:${PORT}`);
});