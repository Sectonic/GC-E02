import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
    return (
        <SafeAreaView className="flex-1 bg-slate-900">
            <View className="p-12">
                <Text className="text-white">Settings Screen</Text>
            </View>
        </SafeAreaView>
    )
}