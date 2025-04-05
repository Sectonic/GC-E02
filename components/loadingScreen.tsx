import { ActivityIndicator, View } from "react-native";

export default function LoadingScreen() {
    return (
        <View className="bg-slate-900 flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#4f46e5" />
        </View>
    );
}