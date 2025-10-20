import { ValidTodo } from "../constants/todo.type";
import { SERVER_URL } from "../constants/apiUrl";

export type UploadAudioParams = {
    mimeType: string; // e.g. 'audio/m4a' or 'audio/wav'
    base64: string;   // raw base64 string without data: prefix
};

export async function uploadAudio({ mimeType, base64 }: UploadAudioParams): Promise<ValidTodo[] | null> {
    const url = `${SERVER_URL}/categorization/transcribeAndCategorize`;

    try {
        console.log('[uploadAudio] Sending fetch request...');
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ audio: { base64, mimeType } })
        });
        console.log('[uploadAudio] Fetch completed. Status:', resp.status);
        const data = await resp.json();

        return JSON.parse(data.categorization) as ValidTodo[];
    } catch (error) {
        console.error('[uploadAudio] Exception caught:', error);
        return null;
    }
}