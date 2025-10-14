import { Audio } from "expo-av";
import { Alert } from "react-native";

export default async function requestAudioPermission() {
    
    const { status } = await Audio.requestPermissionsAsync();
    
    if (status !== "granted") {
        Alert.alert("Permission denied", "Please grant permission to access the microphone");
        return false;
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      staysActiveInBackground: false,
    });

    return true;

}
