import { Pressable, Text } from "react-native";

export default function DeleteButton({ handleDelete }: { handleDelete: () => void }) {
    return (
      <Pressable
        className='px-4 py-2 rounded-md disabled:opacity-50 bg-red-700'
        onPress={handleDelete}
      >
        <Text className="text-white font-bold">Delete</Text>
      </Pressable>
    )
}