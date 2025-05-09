import AuthorizedRoute from "@/components/authorizedRoute";
import { auth } from "@/src/firebase/config";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useRouter } from "expo-router";

export default function Settings() {
    const router = useRouter();
    return (
        <AuthorizedRoute caregiverOnly={true}>
            <SafeAreaView className="flex-1 bg-slate-900 px-6 py-12">
                <Text className="mt-3 text-xl text-white font-semibold text-center">Caregiver QR Code</Text>
                <Text className="text-gray-400 text-center mb-4">Have patients scan this signing in to connect to your account</Text>
                <View className="mx-auto">
                    <QRCode
                        size={250}
                        value={auth.currentUser?.uid}
                        color="#4f46e5"
                        backgroundColor="#0f172a"
                        quietZone={10}
                    />
                </View>
                <View className="w-full h-[1px] bg-slate-800 mt-2 mb-4" />
                <TouchableOpacity
                    className="bg-slate-800 rounded-full p-4"
                    onPress={() => router.push("/settings/patient")}
                >
                    <Text className="text-white text-center font-medium">Patient Settings</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </AuthorizedRoute>
    )
}