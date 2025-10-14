import { Text, View, Pressable, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import Wave from '../components/addScreen/Wave';
import { COLOR_TRANSITION } from '../assets/themes/addScreenThemes';
import { stateConfig } from '../constants/addScreen/stateConfig';
import StateTransitionButtons from '../components/addScreen/stateTransitionButtons';

export type ScreenStates = "idle"
    | "recording"
    | "paused"
    | "processing"

export default function ViewTodos() {
    
    const [currState, setCurrState] = useState<ScreenStates>("idle");
    const [colorIndex, setColorIndex] = useState(0);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const firstRender = useRef(true);

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
                            setCurrState(stateConfig[currState].onClickTransition);
                        }
                    }}
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-gray-200 w-64 aspect-square justify-center items-center rounded-full transition-all duration-300"
                    style={{
                        borderColor: COLOR_TRANSITION[colorIndex],
                    }}
                >

                    {stateConfig[currState].waveAnimationState === "running" ? (
                        <View className="grid grid-rows-[3fr_1fr]">
                            <View className="flex justify-center items-center">
                                <Wave />
                            </View>
                            <Text className="text-white font-bold text-2xl text-center">
                                {stateConfig[currState].mainButtonText}
                            </Text>
                        </View>
                    ) : (
                        <Text className="text-white font-bold text-2xl">
                            {stateConfig[currState].mainButtonText}
                        </Text>
                    )}

                </Pressable>

            </View>

            <View className="absolute bottom-0 -translate-y-1/3 w-full">
                <StateTransitionButtons currState={currState} setCurrState={setCurrState} />
            </View>

        </View>
    );
}