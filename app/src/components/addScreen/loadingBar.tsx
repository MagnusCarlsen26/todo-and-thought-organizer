import React from 'react';
import { View, Animated } from 'react-native';

type LoadingBarProps = {
    progress: Animated.AnimatedInterpolation<number> | Animated.Value;
    widthPx?: number;
    tintColor: string;
    className?: string;
    onMeasuredWidth?: (w: number) => void;
};

export default function LoadingBar({ 
    progress, 
    widthPx, 
    tintColor, 
    className, 
    onMeasuredWidth 
}: LoadingBarProps) {
    return (
        <View
            className={className ?? "mt-4 w-3/4 h-2 bg-white/20 rounded-full overflow-hidden"}
            onLayout={(e) => onMeasuredWidth?.(e.nativeEvent.layout.width)}
        >
            <Animated.View
                style={{
                    width: typeof widthPx === 'number' ? Animated.multiply(progress as Animated.Value, widthPx) : 0,
                    height: '100%',
                    backgroundColor: tintColor,
                    borderRadius: 9999,
                }}
            />
        </View>
    );
}


