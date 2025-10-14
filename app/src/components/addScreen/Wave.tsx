import React, { useEffect, useCallback } from 'react';
import { View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
    interpolate,
    cancelAnimation,
} from 'react-native-reanimated';
import { COLOR_TRANSITION } from '../../assets/themes/addScreenThemes';

type AnimationState = "none" | "running" | "still";

function WaveBar({ 
    delay_, 
    color_, 
    animationState 
}: { 
    delay_: number, 
    color_: string, 
    animationState: AnimationState 
}) {
    const progress = useSharedValue(0);

    useEffect(() => {
        if (animationState === 'running') {
            const timeout = setTimeout(() => {
                progress.value = withRepeat(
                    withTiming(1, { duration: 1000, easing: Easing.linear }),
                    -1,
                    true
                );
            }, delay_);
            return () => clearTimeout(timeout);
        } else {
            cancelAnimation(progress);
            if (animationState === 'none') {
                progress.value = withTiming(0);
            }
        }
        return () => {
            cancelAnimation(progress);
        }
    }, [animationState, delay_, progress]);

    const animatedStyle = useAnimatedStyle(() => {
        const height = interpolate(
            progress.value,
            [0, 0.5, 1],
            [10, 50, 10]
        );
        return {
            height: height,
            margin: 2,
            backgroundColor: color_,
            width: 10,
        };
    });

    return (
        <Animated.View style={animatedStyle} />
    );
};

export default function Wave({ animationState }: { animationState: AnimationState }) {

    return (
        <View className="rounded-full flex-row items-center justify-center">
            {[...Array(5)].map((_, i) => (
                <WaveBar 
                    key={i} 
                    delay_={i * 100}
                    color_={COLOR_TRANSITION[i]}
                    animationState={animationState}
                />
            ))}
        </View>
    );
}