import { auth } from "@/src/firebase/config";
import { Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';

export default function CaregiverSettings() {

    return (
        <View className="p-12">
            <Text className="mt-3 text-xl text-white font-semibold text-center">Caregiver QR Code</Text>
            <Text className="text-gray-400 text-center mb-4">Have patients scan this signing in to connect to your account</Text>
            <View className="mx-auto">
                <QRCode
                    size={200}
                    value={auth.currentUser?.uid}
                    color="#4f46e5"
                    backgroundColor="#0f172a"
                    quietZone={10}
                />
            </View>
        </View>
    )
}