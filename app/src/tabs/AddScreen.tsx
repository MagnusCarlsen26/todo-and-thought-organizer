import { Text, View, Pressable, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import Wave from '../components/Wave';
import { COLOR_TRANSITION } from '../assets/themes/addScreenThemes';

type ScreenStates = "idle"
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
                    onPress={() => setCurrState(currState === "recording" ? "idle" : "recording")}
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-gray-200 w-64 aspect-square justify-center items-center rounded-full transition-all duration-300"
                    style={{
                        borderColor: COLOR_TRANSITION[colorIndex],
                    }}
                >

                    {currState === "recording" ? (
                        <View className="grid grid-rows-[3fr_1fr]">
                            <View className="flex justify-center items-center">
                                <Wave />
                            </View>
                            <Text className="text-white font-bold text-2xl text-center">
                                Listening...
                            </Text>
                        </View>
                    ) : (
                        <Text className="text-white font-bold text-2xl">
                            Start
                        </Text>
                    )}

                </Pressable>

            </View>

            <View className="absolute bottom-0 -translate-y-1/3 flex-column justify-center items-center gap-2 w-full mt-16">
                {stateTransitionButton("paused", setCurrState, "bg-emerald-700")}
                {stateTransitionButton("cancel", setCurrState, "bg-red-500")}
                {stateTransitionButton("stop", setCurrState, "bg-green-500")}
            </View>

        </View>
    );
}

function stateTransitionButton(
    state: string,
    setCurrState: (state: ScreenStates) => void,
    bgColor: string
) {
    return (
        <Pressable 
            onPress={() => setCurrState(state)}
            className={`${bgColor} w-full py-6 border-2 rounded-3xl`}
        >
            <Text className="text-white text-center font-bold text-2xl">{state}</Text>
        </Pressable>
    );
}