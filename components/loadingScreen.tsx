import { Text, View } from "react-native";

export default function LoadingScreen() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-white text-xl">Loading...</Text>
        </View>
    );
}