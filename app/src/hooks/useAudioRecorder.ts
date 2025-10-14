import { useCallback, useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import requestAudioPermission from '../utils/permissions/audioPermission';
import { readFileAsBase64 } from '../utils/fs';

export type RecorderStatus = 'idle' | 'recording' | 'paused';

export type StopResult = {
    base64: string;
    filename: string;
    mimeType: string;
};

export function useAudioRecorder() {
    const recordingRef = useRef<Audio.Recording | null>(null);
    const [status, setStatus] = useState<RecorderStatus>('idle');
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    // tick timer when recording
    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (status === 'recording') {
            interval = setInterval(() => {
                setElapsedSeconds(prev => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [status]);

    const ensurePermission = useCallback(async () => {
        if (permissionGranted) return true;
        const ok = await requestAudioPermission();
        setPermissionGranted(!!ok);
        return !!ok;
    }, [permissionGranted]);

    const start = useCallback(async () => {
        const ok = await ensurePermission();
        if (!ok) return false;
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        await recording.startAsync();
        recordingRef.current = recording;
        setElapsedSeconds(0);
        setStatus('recording');
        return true;
    }, [ensurePermission]);

    const pause = useCallback(async () => {
        const recording = recordingRef.current;
        if (!recording) return;
        try {
            await recording.pauseAsync();
            setStatus('paused');
        } catch {}
    }, []);

    const resume = useCallback(async () => {
        const recording = recordingRef.current;
        if (!recording) return;
        try {
            await recording.startAsync();
            setStatus('recording');
        } catch {}
    }, []);

    const cancel = useCallback(async () => {
        const recording = recordingRef.current;
        if (!recording) return;
        try {
            await recording.stopAndUnloadAsync();
        } catch {}
        const uri = recording.getURI();
        if (uri) {
            try { await FileSystem.deleteAsync(uri, { idempotent: true }); } catch {}
        }
        recordingRef.current = null;
        setElapsedSeconds(0);
        setStatus('idle');
    }, []);

    const stopAndGetBase64 = useCallback(async (): Promise<StopResult> => {
        const recording = recordingRef.current;
        if (!recording) throw new Error('No active recording');
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        if (!uri) throw new Error('No recording URI');
        const base64 = await readFileAsBase64(uri);
        try { await FileSystem.deleteAsync(uri, { idempotent: true }); } catch {}
        recordingRef.current = null;
        setElapsedSeconds(0);
        setStatus('idle');
        return { base64, filename: `recording-${Date.now()}.m4a`, mimeType: 'audio/m4a' };
    }, []);

    return {
        status,
        elapsedSeconds,
        start,
        pause,
        resume,
        cancel,
        stopAndGetBase64,
    };
}


