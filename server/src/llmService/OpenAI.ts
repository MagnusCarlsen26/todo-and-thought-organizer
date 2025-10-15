import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

export const callOpenAIAPI = async (
    modelName: string,
    prompt: string,
    options: any = {}
): Promise<string | null> => {

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
        console.error("OpenAI API Key is not set.");
        throw new Error('OpenAI API Key is not set.');
    }

    try {
        const openai = new OpenAI({
            apiKey: OPENAI_API_KEY,
        });

        const chatCompletion = await openai.chat.completions.create({
            messages: [{
                role: "user",
                content: prompt
            }],
            model: modelName,
            ...options
        });

        const responseText = chatCompletion.choices?.[0]?.message?.content ?? null;
        console.log('OpenAI API Response:', responseText);
        return responseText;

    } catch (error) {
        console.error('Failed to call OpenAI API:', error);
        throw new Error(`Failed to call OpenAI API ${error}`);
    }
};
