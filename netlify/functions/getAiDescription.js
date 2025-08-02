const { GoogleGenAI } = require("@google/genai");

// The API key is securely accessed from Netlify's environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { prompt, responseSchema, image } = JSON.parse(event.body);
    
    if (!prompt || !responseSchema || !image) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing required parameters: prompt, responseSchema, and image.' }) };
    }

    const imagePart = {
      inlineData: {
        data: image.data,
        mimeType: image.mimeType,
      },
    };
    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    // The response.text from Gemini is the JSON string we need.
    // We return it directly with the correct content type.
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: response.text, 
    };

  } catch (error) {
    console.error('getAiDescription Function Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
