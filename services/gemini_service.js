import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
    const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: "Hello! Tell me a fun fact.",
    });

    console.log(response.text);
}

run();
