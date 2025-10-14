export type UploadAudioParams = {
    serverBaseUrl?: string;
    filename?: string;
    mimeType: string; // e.g. 'audio/m4a' or 'audio/wav'
    base64: string;   // raw base64 string without data: prefix
};

export type UploadAudioResponse = {
    ok: boolean;
    filename?: string | null;
    mimeType?: string;
    sizeBytes?: number;
    error?: string;
};

export async function uploadAudio({ serverBaseUrl, filename, mimeType, base64 }: UploadAudioParams): Promise<UploadAudioResponse> {
    const url = `${serverBaseUrl ?? 'http://localhost:5000'}/upload-audio`;
    const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, mimeType, base64 })
    });
    const data = await resp.json();
    return data as UploadAudioResponse;
}


