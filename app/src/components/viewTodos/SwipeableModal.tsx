import React from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import useAnimatedModal from "./useAnimatedModal";

interface SwipeableModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SwipeableModal({
  isVisible,
  onClose,
  children,
}: SwipeableModalProps) {
  const { overlayOpacity, contentTranslateY, contentOpacity } = useAnimatedModal({
    isVisible,
  });

  return (
    <Modal animationType="none" transparent visible={isVisible} onRequestClose={onClose}>
      {/* Overlay */}
      <Animated.View
        className="absolute inset-0 bg-black/50"
        style={{ opacity: overlayOpacity }}
      />

      {/* Dismiss area */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="absolute inset-0" />
      </TouchableWithoutFeedback>

      {/* Modal content */}
      <View className="flex-1 justify-center items-center" pointerEvents="box-none">
        <Animated.View
          className="w-[90%] z-20"
          style={{
            transform: [{ translateY: contentTranslateY }],
            opacity: contentOpacity,
          }}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}
