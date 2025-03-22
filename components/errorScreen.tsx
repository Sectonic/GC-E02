import { View, Text } from "react-native";

export default function ErrorScreen({ error }: { error: string }) {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-red-500 text-xl">An error occurred: {error}</Text>
        </View>
    );
}