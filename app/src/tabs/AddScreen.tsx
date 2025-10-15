import { Text, View, Pressable, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import Wave from '../components/addScreen/Wave';
import LoadingBar from '../components/addScreen/loadingBar';
import { COLOR_TRANSITION } from '../assets/themes/addScreenThemes';
import { stateConfig } from '../constants/addScreen/stateConfig';
import StateTransitionButtons from '../components/addScreen/stateTransitionButtons';
import { uploadAudio } from '../utils/uploadAudio';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

export type ScreenStates = "idle"
    | "recording"
    | "paused"
    | "processing"

export default function AddScreen() {
    
    const [currState, setCurrState] = useState<ScreenStates>("idle");
    const [colorIndex, setColorIndex] = useState(0);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    
    const progressAnim = useRef(new Animated.Value(0)).current;
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    
    const firstRender = useRef(true);
    const { start, pause, resume, cancel, stopAndGetBase64, elapsedSeconds } = useAudioRecorder();

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        // // Animate scale when isRecording changes
        // Animated.timing(scaleAnim, {
        //     toValue: currState === "recording" ? 1 : 0,
        //     duration: 300,
        //     useNativeDriver: true,
        // }).start();

        // Cycle border color when recording
        let interval: NodeJS.Timeout | undefined;
        if (currState === "recording") {
            interval = setInterval(() => {
                setColorIndex((prev) => (prev + 1) % COLOR_TRANSITION.length);
            }, 1000);
        }

        // Clear interval on cleanup
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [currState]);

    const handleStateChange = (newState: ScreenStates) => {
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

    return (
        <View className="h-screen w-screen">
            <View 
                className="relative h-full w-full"
                style={{
                    borderColor: COLOR_TRANSITION[colorIndex],
                }}
            >

                <Pressable
                    onPress={() => {
                        if (stateConfig[currState].onClickTransition) {
                            handleStateChange(stateConfig[currState].onClickTransition);
                        }
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 border-4 border-gray-200 aspect-square justify-center items-center rounded-full transition-all duration-300"
                    style={{
                        borderColor: COLOR_TRANSITION[colorIndex],
                    }}
                >

                    {stateConfig[currState].waveAnimationState === "running" || stateConfig[currState].waveAnimationState === "still" ? (
                        <View className="flex flex-col">
                            <View className="h-1/2 flex justify-end items-center">
                                <Wave animationState={stateConfig[currState].waveAnimationState} />
                            </View>
                            <View className="h-1/3 flex justify-center items-center">
                                <Text className="text-white font-bold text-lg text-center">
                                    {stateConfig[currState].mainButtonText}
                                </Text>
                                {(currState === 'recording' || currState === 'paused') && (
                                    <Text className="text-white font-bold text-base">
                                        {formatTime(elapsedSeconds)}
                                    </Text>
                                )}
                            </View>
                        </View>
                    ) : (
                        currState === 'processing' ? (
                            <View className="flex justify-center items-center w-full">
                                <Text className="text-white font-bold text-2xl">
                                    {stateConfig[currState].mainButtonText}
                                </Text>
                                <LoadingBar 
                                    progress={progressAnim}
                                    widthPx={progressBarWidth}
                                    tintColor={COLOR_TRANSITION[colorIndex]}
                                    onMeasuredWidth={(w) => setProgressBarWidth(w)}
                                />
                            </View>
                        ) : (
                            <View className="flex justify-center items-center">
                                <Text className="text-white font-bold text-2xl">
                                    {stateConfig[currState].mainButtonText}
                                </Text>
                                
                                    {(currState === 'recording' || currState === 'paused') && (
                                        <Text className="text-white font-bold text-xl">
                                            {formatTime(elapsedSeconds)}
                                        </Text>
                                    )
                                }
                            </View>
                        )

                    )}

                </Pressable>

            </View>

            <View className="absolute bottom-0 -translate-y-1/3 w-full px-2">
                <StateTransitionButtons 
                    currState={currState} 
                    handleStateChange={handleStateChange} 
                />
            </View>

        </View>
    );
}