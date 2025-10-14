import * as FileSystem from 'expo-file-system';

export async function readFileAsBase64(uri: string): Promise<string> {
    // Using string literal to avoid type issues across SDKs
    return FileSystem.readAsStringAsync(uri, { encoding: 'base64' as any });
}


