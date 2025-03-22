import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QR() {
    return (
        <SafeAreaView className="bg-slate-900 flex-1 h-full justify-center items-center ">
            <Text className="text-white text-xl">QR Screen</Text>
            <Link href="/auth/carereceiver" className="text-white text-center underline">Go to Care Receiver</Link>
        </SafeAreaView>
    )
}