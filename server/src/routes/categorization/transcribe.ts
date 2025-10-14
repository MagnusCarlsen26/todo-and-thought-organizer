import { CATEGORISE_TODO_PROMPT, TRANSCRIBE_AUDIO_PROMPT } from "../../constants/systemPrompt.js";
import { callOpenAIAPI } from "../../llmService/OpenAI.js";
import { callGeminiAPI } from "../../llmService/Gemini.js";

import { Router } from 'express';
const router = Router();

router.post('/transcribeAndCategorize', async (req, res) => {
    try {
        const { audio } = req.body as { audio?: { base64?: string; mimeType?: string } };
        if (!audio?.base64 || !audio?.mimeType) {
            return res.status(400).json({ error: 'Missing audio.base64 or audio.mimeType' });
        }

        // Prepare Gemini inlineData part for audio
        const inlineAudioPart = {
            inlineData: {
                data: audio.base64,
                mimeType: audio.mimeType,
            }
        } as any;

        // Get transcription from Gemini
        const transcription = await callGeminiAPI(
            "gemini-2.5-flash",
            TRANSCRIBE_AUDIO_PROMPT,
            [inlineAudioPart],
            { responseMimeType: "text/plain" }
        );

        // Get categorization from OpenAI
        const categorization = await callOpenAIAPI(
            "gpt-5-mini",
            `${CATEGORISE_TODO_PROMPT}\n\nTranscription:\n${transcription ?? ''}`
        );

        res.json({ transcription, categorization });
        
    } catch (error) {
        console.error('transcribe error', error);
        res.status(500).json({ error: 'Failed to transcribe audio' });
    }
});

export default router;