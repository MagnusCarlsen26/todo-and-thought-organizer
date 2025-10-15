import { Animated, Easing } from 'react-native';
import { ScreenStates } from '../../tabs/AddScreen';
import { uploadAudio } from '../uploadAudio';

type HandleStateChangeParams = {
    newState: ScreenStates;
    currState: ScreenStates;
    setCurrState: (state: ScreenStates) => void;
    progressAnim: Animated.Value;
    start: () => Promise<boolean>;
    pause: () => Promise<void>;
    resume: () => Promise<void>;
    cancel: () => Promise<void>;
    stopAndGetBase64: () => Promise<{ base64: string; mimeType: string; }>;
};

export const handleStateChangeLogic = ({
    newState,
    currState,
    setCurrState,
    progressAnim,
    start,
    pause,
    resume,
    cancel,
    stopAndGetBase64,
}: HandleStateChangeParams) => {
    void (async () => {
        if ((currState === 'idle') && newState === 'recording') {
            const ok = await start();
            if (ok) {
                setCurrState('recording');
            }
            return;
        }

        if ((currState === 'recording') && newState === 'paused') {
            await pause();
            setCurrState('paused');
            return;
        }

        if ((currState === 'paused') && newState === 'recording') {
            await resume();
            setCurrState('recording');
            return;
        }

        if ((currState === 'recording' || currState === 'paused') && newState === 'processing') {
            setCurrState('processing');

            // Reset and start fake progress to 90% over 5s
            progressAnim.setValue(0);
            const ninetyPercentAnimation = new Promise<void>((resolve) => {
                Animated.timing(progressAnim, {
                    toValue: 0.9,
                    duration: 5000,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: false, // width animation cannot use native driver
                }).start(() => resolve());
            });

            try {
                // Stop recording and start upload
                const { base64, mimeType } = await stopAndGetBase64();
                const uploadPromise = uploadAudio({ mimeType, base64 });

                // Wait for both: fake progress to 90% and the real upload to complete
                const [_, result] = await Promise.all([ninetyPercentAnimation, uploadPromise]);

                // Smoothly fill the remaining 10% when the response is received
                await new Promise<void>((resolve) => {
                    Animated.timing(progressAnim, {
                        toValue: 1,
                        duration: 300,
                        easing: Easing.inOut(Easing.quad),
                        useNativeDriver: false,
                    }).start(() => resolve());
                });

                console.log('Upload result:', result);
            } catch (error) {
                console.error('Upload failed:', error);
            } finally {
                // Briefly show 100% then reset
                setTimeout(() => {
                    setCurrState('idle');
                    progressAnim.setValue(0);
                }, 150);
            }
            return;
        }

        if ((currState === 'recording' || currState === 'paused') && newState === 'idle') {
            await cancel();
            setCurrState('idle');
            return;
        }

        setCurrState(newState);
    })();
};
