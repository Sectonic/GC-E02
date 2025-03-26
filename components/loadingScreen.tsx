import { Text, View } from "react-native";

export default function LoadingScreen() {
    return (
        <View className="bg-slate-900 flex-1 justify-center items-center">
            <Text className="text-white text-xl">Loading...</Text>
        </View>
    );
}