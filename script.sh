#!/bin/bash

APP=todo-and-thought-organizer && \
npx --yes create-expo-app@latest "$APP" -t expo-template-blank-typescript && \
cd "$APP" && \
# Core deps
npm i nativewind tailwindcss && \
# Reanimated v4 (required by SDK 54)
npx --yes expo install react-native-reanimated@~4.1.0 && \
# Ensure Babel preset aligns with SDK 54 and install worklets plugin used by NativeWind
npm i -D babel-preset-expo@~54.0.0 react-native-worklets && \
# Tailwind config + PostCSS
npx --yes tailwindcss init -p && \
# tailwind.config.js
cat > tailwind.config.js <<'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: { extend: {} },
  plugins: [],
}
EOF
# babel.config.js (NativeWind is a preset; no reanimated plugin here)
cat > babel.config.js <<'EOF'
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'nativewind/babel'],
  };
};
EOF
# metro.config.js
cat > metro.config.js <<'EOF'
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './globals.css' });
EOF
# globals.css for Tailwind
cat > globals.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF
# NativeWind types (avoids tsconfig editing)
cat > nativewind-env.d.ts <<'EOF'
/// <reference types="nativewind/types" />
EOF
# Import CSS for web/native interop
sed -i '1i import "./globals.css";' index.ts
# Example Tailwind usage (optional)
cat > App.tsx <<'EOF'
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
EOF
echo "Done. Run: npm run android | npm run ios | npm run web"

# Web deps (Expo will pick matching versions)
npx --yes expo install react-dom react-native-web @expo/metro-runtime && \
npm i -D autoprefixer