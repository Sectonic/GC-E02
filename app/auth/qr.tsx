import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import LoadingScreen from "@/components/loadingScreen";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";

export default function QR() {
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState<boolean>(false);

    useEffect(() => {
        requestPermission(); 
    }, [])

    useEffect(() => {
        if (permission && permission.status != "undetermined" && !permission.granted) {
            Toast.show({
                type: 'error',
                text1: 'Permission error',
                text2: 'Camera permissions are necessary to login as a care-receiver'
            });
            setTimeout(() => {
                router.back();
            }, 1);
        }
    }, [permission]);
    
    if (!permission || !permission.granted) {
        return <LoadingScreen />
    }
    
    const onScan = async (result: BarcodeScanningResult) => {
        if (scanned) return;
        setScanned(true);

        console.log(result.data);
        
        setTimeout(() => {
            setScanned(false);
        }, 1000);
    }

    return (
        <View className="bg-slate-900 flex-1 h-full w-full">
            <CameraView
                style={{
                    position: 'relative',
                    height: "100%",
                    width: "100%"
                }}
                facing="back"
                barcodeScannerSettings={{
                    barcodeTypes: ['qr']
                }}
                onBarcodeScanned={scanned ? undefined : onScan}
            >
                <View className="absolute inset-0 flex flex-row">
                    <View className="flex-1 flex flex-col">
                        <View className="flex-1 bg-black/75" />
                        <View className="h-60 bg-black/75" />
                        <View className="flex-1 bg-black/75" />
                    </View>
                    <View className="w-60 flex flex-col">
                        <View className="flex-1 bg-black/75" />
                        <View className="h-60 bg-transparent border-2 border-white" />
                        <View className="flex-1 bg-black/75" />
                    </View>
                    <View className="flex-1 flex flex-col">
                        <View className="flex-1 bg-black/75" />
                        <View className="h-60 bg-black/75" />
                        <View className="flex-1 bg-black/75" />
                    </View>
                </View>
                <View className="absolute left-1/2 top-[30%] -translate-x-1/2">
                    <Text className="text-white text-xl font-semibold text-center">Scan Caregiver QR Code</Text>
                    <Text className="text-gray-400 text-center">Code is found in the caregiver's settings</Text>
                </View>
            </CameraView>
        </View>
    )
}