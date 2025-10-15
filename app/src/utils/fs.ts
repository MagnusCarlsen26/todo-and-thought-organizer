import * as FileSystem from 'expo-file-system/legacy';

export async function readFileAsBase64(uri: string): Promise<string> {
    return FileSystem.readAsStringAsync(uri, { encoding: 'base64' as any });
}