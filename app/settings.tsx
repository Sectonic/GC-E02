import AuthorizedRoute from "@/components/authorizedRoute";
import { auth } from "@/src/firebase/config";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from 'react-native-qrcode-svg';
import { useEffect } from "react";

export default function Settings() {

    useEffect(() => {
        console.log(auth.currentUser?.uid);
    }, [])

    return (
        <AuthorizedRoute>
            <SafeAreaView className="flex-1 bg-slate-900">
                {auth.currentUser && 
                    <View className="p-12">
                        <Text className="mt-3 text-xl text-white font-semibold text-center">Caregiver QR Code</Text>
                        <Text className="text-gray-400 text-center mb-4">Have care receivers scan this signing in to connect to your account</Text>
                        <View className="mx-auto">
                            <QRCode                             
                                size={200}
                                value={auth.currentUser.uid}
                                color="#4f46e5"
                                backgroundColor="#0f172a"
                                quietZone={10}
                            />
                        </View>
                    </View>
                }
            </SafeAreaView>
        </AuthorizedRoute>
    )
}