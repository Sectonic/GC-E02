import AuthorizedRoute from "@/components/authorizedRoute";
import { useApi } from "@/src/hooks/useApi";
import PatientHTTPClient from "@/src/httpClient/patientHTTPClient";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "@/src/firebase/config";
import { Redirect, useRouter } from "expo-router";
import LoadingScreen from "@/components/loadingScreen";
import Toast from "react-native-toast-message";
import CaregiverHTTPClient from "@/src/httpClient/caregiverHTTPClient";

export default function PatientList() {
    const router = useRouter();
    const { data: patients, isLoading, error } = useApi(CaregiverHTTPClient.getPatientsOfCaregiver, auth.currentUser?.uid);

    if (error) {
        Toast.show({
            type: "error",
            text1: "Application Error",
            text2: error
        })
        return <Redirect href="/auth/unauthorized" />
    }
    if (isLoading || !patients) {
        return <LoadingScreen />
    }

    return (
        <AuthorizedRoute caregiverOnly={true}>
            <SafeAreaView className="flex-1 bg-slate-900 p-6">
                <ScrollView showsVerticalScrollIndicator={false} className="flex-grow mt-10">
                    {patients.map((patient, idx) => (
                        <TouchableOpacity
                            key={idx}
                            className="bg-slate-800 p-4 rounded-full mb-4 flex flex-row justify-center items-center gap-2"
                            onPress={() => router.push(`/settings/patient/${patient.localId}`)}
                        >
                            <Text className="text-white text-lg font-medium text-center">
                                {patient.displayName}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </AuthorizedRoute>
    )
}