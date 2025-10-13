import { Text, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';

import Wave from '../components/Wave';
import { COLOR_TRANSITION } from '../assets/themes/addScreenThemes';

export default function ViewTodos() {
    const [isRecording, setIsRecording] = useState(false);
    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
        if (isRecording) {
            const interval = setInterval(() => {
                setColorIndex((prev) => (prev + 1) % COLOR_TRANSITION.length);
                }, 1000);
                return () => clearInterval(interval);
        }

    }, [isRecording]);

    return (
        <View className="flex-1 bg-slate-950 justify-center items-center">
            <Pressable
                onPress={() => setIsRecording(!isRecording)}
                className="border-4 border-gray-200 w-64 aspect-square justify-center items-center rounded-full transition-all duration-300"
                style={{
                    borderColor: COLOR_TRANSITION[colorIndex],
                }}
            >

                {isRecording ? (
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
    );
}