import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { ValidTodo } from '../../constants/todo.type';

interface RenderActionsProps {
    dragX: Animated.AnimatedInterpolation<number>;
    item: ValidTodo;
    onAction: (todo: ValidTodo) => void;
    children: React.ReactNode;
    actionColor: string;
}

export default function RenderActions({ 
    dragX, 
    item, 
    onAction, 
    children,
    actionColor,
}: RenderActionsProps) {
    const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 1],
        extrapolate: 'clamp',
    });

    return (
        <TouchableOpacity 
            onPress={() => onAction(item)} 
            className={`${actionColor} justify-center items-center w-20 m-2 rounded-lg`}
        >
            <Animated.View 
                className="flex-row items-center" 
                style={{ transform: [{ scale }] }}
            >
                    {children}
            </Animated.View>
        </TouchableOpacity>
    );
}
