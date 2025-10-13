import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
    interpolate,
} from 'react-native-reanimated';
import { COLOR_TRANSITION } from '../assets/themes/addScreenThemes';

const WaveBar = ({ delay_, color_ }: { delay_: number, color_: string }) => {
    const progress = useSharedValue(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            progress.value = withRepeat(
                withTiming(1, { duration: 1000, easing: Easing.linear }),
                -1,
                true
            );
        }, delay_);
        return () => clearTimeout(timeout);
    }, []);

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

export default function Wave() {

    return (
        <View className="rounded-full flex-row items-center justify-center">
            {[...Array(5)].map((_, i) => (
                <WaveBar 
                    key={i} 
                    delay_={i * 100}
                    color_={COLOR_TRANSITION[i]}
                />
            ))}
        </View>
    );
}