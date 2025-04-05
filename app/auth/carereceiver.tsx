import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/firebase/config";
import LoadingScreen from "@/components/loadingScreen";

export default function CareReceiver() {
    const { uid } = useLocalSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [validUser, setValidUser] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            if (!uid || typeof uid != 'string') {
                router.replace("/auth/qr");
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, "", uid as string));
                
                if (userDoc.exists()) {
                    setValidUser(true);
                } else {
                    router.replace("/auth/qr");
                }
            } catch (error) {
                console.error("Error checking user:", error);
                router.replace("/auth/qr");
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [uid, router]);

    if (loading || !validUser) {
        return <LoadingScreen />;
    }

    return (
        <SafeAreaView className="bg-slate-900 flex-1 h-full justify-center items-center">
            <Text className="text-white text-xl">Carereceiver Screen</Text>
        </SafeAreaView>
    )
}