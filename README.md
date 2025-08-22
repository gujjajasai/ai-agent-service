# Autonomous AI Customer Support System - AI Agent (Node.js)

This is a specialized microservice that acts as the intelligent "brain" for a full-stack, AI-powered customer support application. Built with Node.js and Express.js, its sole purpose is to handle all real-time, conversational interactions with external Generative AI models.

---

## About The Project

This service provides a conversational AI endpoint for the customer-facing chatbot. It manages chat history, uses advanced prompt engineering to guide the AI's persona and logic, and returns natural, helpful responses in real-time.

This project demonstrates the ability to build lightweight, high-performance microservices and integrate state-of-the-art AI models to solve a specific, complex task.

### Key Features:
*   **Conversational AI:** Provides a `POST /api/ai/chat` endpoint that manages back-and-forth conversations with context.
*   **Advanced Prompt Engineering:** Uses structured prompts and system instructions to define the AI's persona, rules, and conversational flow.
*   **Stateful Context:** Manages conversation history to provide context-aware replies.
*   **Secure API Key Management:** Loads the AI provider's API key from environment variables (`.env` file) for security, a critical best practice.

### Tech Stack:
*   **Language:** Node.js
*   **Framework:** Express.js
*   **Generative AI:** Google Gemini Pro (`gemini-1.5-flash`)
*   **Libraries:** `@google/generative-ai`, `cors`, `dotenv`
*   **Deployment:** Render

---

## Architecture

This AI Agent is a specialized service in a three-part application:

1.  **[Frontend (Next.js)](https://github.com/gujjajasai/support-ticket-frontend):** The UI that calls this agent's chat endpoint. <!-- Replace with your frontend repo URL -->
2.  **[Core Backend (Java)](https://github.com/gujjajasai/support-ticket-backend):** The main application server that orchestrates the overall system. <!-- Replace with your backend repo URL -->
3.  **AI Agent (This Repository):** The intelligent processing unit.

---

## Getting Started

To run this project locally:

1.  Clone the repository and navigate into the folder.
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the root directory.
4.  Add your Google AI API key to the `.env` file:
    ```
    GOOGLE_API_KEY=YOUR_API_KEY_HERE
    ```
5.  Run the server:
    ```sh
    node index.js
    ```
    The server will start on `http://localhost:3001`.