export type UploadAudioParams = {
    mimeType: string; // e.g. 'audio/m4a' or 'audio/wav'
    base64: string;   // raw base64 string without data: prefix
};

export type UploadAudioResponse = {
    ok: boolean;
    transcription?: string;
    categorization?: any;
    error?: string;
};

export async function uploadAudio({ mimeType, base64 }: UploadAudioParams): Promise<UploadAudioResponse> {
    const url = 'http://192.168.1.17:3000/categorization/transcribeAndCategorize';

    try {
        console.log('[uploadAudio] Sending fetch request...');
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ audio: { base64, mimeType } })
        });
        console.log('[uploadAudio] Fetch completed. Status:', resp.status);

        const data = await resp.json();

        console.log('[uploadAudio] Upload and processing successful.');
        return data;
    } catch (error) {
        console.error('[uploadAudio] Exception caught:', error);
        return { ok: false, error: error instanceof Error ? error.message : String(error) };
    }
}