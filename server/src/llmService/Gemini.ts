import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

export const callGeminiAPI = async (
    modelName: string,
    prompt: string,
    parts: any[] = [],
    generationConfig: any = { responseMimeType: "text/plain" }
): Promise<string | null> => {

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        console.error("Gemini API Key is not set.");
        throw new Error('Gemini API Key is not set.');
    }

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: modelName });

        const allParts = [{ text: prompt }, ...parts];

        const result = await model.generateContent({
            contents: [{
                role: "user",
                parts: allParts,
            }],
            generationConfig,
        });

        const responseText = result.response.text();
        console.log('Gemini API Response:', responseText);
        return responseText;

    } catch (error) {

        console.error('Failed to call Gemini API:', error);
        throw new Error(`Failed to call Gemini API ${error}`);

    }
};