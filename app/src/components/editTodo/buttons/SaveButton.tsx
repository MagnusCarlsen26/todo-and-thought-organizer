import { Pressable, Text } from "react-native";

export default function SaveButton({ handleSave }: { handleSave: () => void }) {
    return (
      <Pressable
        className='px-4 py-2 rounded-md disabled:opacity-50 bg-green-700'
        onPress={handleSave}
      >
        <Text className="text-white font-bold">Save</Text>
      </Pressable>
    )
}