import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-700">NativeWind + Expo + Tailwind</Text>
      <Text className="mt-2 text-base text-gray-700">Edit App.tsx to get started.</Text>
      <StatusBar style="auto" />
    </View>
  );
}
