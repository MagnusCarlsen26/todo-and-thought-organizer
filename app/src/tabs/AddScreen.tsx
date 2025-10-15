import { Text, View, Pressable, Animated, Modal } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import { COLOR_TRANSITION } from '../assets/themes/addScreenThemes';
import { stateConfig } from '../constants/addScreen/stateConfig';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { formatTime } from '../utils/addScreen/formatTime';
import { handleStateChangeLogic } from '../utils/addScreen/handleStateChange';
import { ValidTodo } from '../constants/todo.type';

import Wave from '../components/addScreen/Wave';
import LoadingBar from '../components/addScreen/loadingBar';
import StateTransitionButtons from '../components/addScreen/stateTransitionButtons';
import CategorizationModal from '../components/addScreen/CategorizationModal';

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
    
    const [showCategorizationModal, setShowCategorizationModal] = useState(false);
    const [categorizationResult, setCategorizationResult] = useState<ValidTodo[] | null>(null);
    
    const firstRender = useRef(true);
    const { start, pause, resume, cancel, stopAndGetBase64, elapsedSeconds } = useAudioRecorder();

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
        handleStateChangeLogic({
            newState,
            currState,
            setCurrState,
            progressAnim,
            start,
            pause,
            resume,
            cancel,
            stopAndGetBase64,
            setShowCategorizationModal,
            setCategorizationResult,
        });
    };

    const handleCloseModal = () => {
        setShowCategorizationModal(false);
        setCategorizationResult(null);
    };

    const handleSaveCategorization = () => {
        // Here you would typically save the categorized todo to your storage/state
        console.log('Saving categorized todo:', categorizationResult);
        handleCloseModal();
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

            <CategorizationModal
                visible={showCategorizationModal}
                categorizationResult={categorizationResult ?? []}
                onClose={handleCloseModal}
                onSave={handleSaveCategorization}
            />

        </View>
    );
}