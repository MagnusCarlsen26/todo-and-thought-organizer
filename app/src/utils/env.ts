import { Platform } from 'react-native';

export function getServerBaseUrl(): string {
    return Platform.select({
        android: 'http://10.0.2.2:5000',
        ios: 'http://localhost:5000',
        default: 'http://localhost:5000'
    }) as string;
}


