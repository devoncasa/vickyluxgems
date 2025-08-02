const { GoogleGenAI } = require("@google/genai");

// The API key is securely accessed from Netlify's environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Transforms the client-side message list into the format required by the Gemini API
const buildGeminiHistory = (messages) => {
    // Filter out the last message if it's an AI message (placeholder)
    const history = messages.filter((_, i) => i < messages.length - 1 || messages[messages.length - 1].sender === 'user');
    return history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));
};

exports.handler = async function(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { history, systemInstruction } = JSON.parse(event.body);

        if (!history || !Array.isArray(history) || history.length === 0) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing or invalid history parameter.' }) };
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: buildGeminiHistory(history),
            config: {
                systemInstruction: systemInstruction || 'You are a helpful assistant.',
            },
        });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: response.text }),
        };

    } catch (error) {
        console.error('Chat Handler Error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
