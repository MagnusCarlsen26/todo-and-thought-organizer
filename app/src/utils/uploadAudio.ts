import { ValidTodo } from "../constants/todo.type";
import { SERVER_URL } from "../constants/apiUrl";

export type UploadAudioParams = {
    mimeType: string;
    base64: string;
};

export async function uploadAudio({ mimeType, base64 }: UploadAudioParams): Promise<ValidTodo[] | null> {
    const url = `${SERVER_URL}/categorization/transcribeAndCategorize`;

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ audio: { base64, mimeType } })
        });

        const data = await resp.json();

        return JSON.parse(data.categorization) as ValidTodo[];
    } catch (error) {
        console.error('[uploadAudio] Exception caught:', error);
        return null;
    }
}