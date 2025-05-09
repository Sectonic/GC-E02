import { View, Text, SafeAreaView } from "react-native";
import AuthorizedRoute from "@/components/authorizedRoute";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useApi } from "@/src/hooks/useApi";
import PatientHTTPClient from "@/src/httpClient/patientHTTPClient";
import LoadingScreen from "@/components/loadingScreen";
import Toast from "react-native-toast-message";

export default function PatientDetails() {
    const { patientUid } = useLocalSearchParams<{ patientUid: string }>();
    const { data: patientSettings, isLoading, error } = useApi(PatientHTTPClient.getPatientSettings, patientUid);

    if (error) {
        Toast.show({
            type: "error",
            text1: "Application Error",
            text2: error
        })
        return <Redirect href="/auth/unauthorized" />
    }
    if (isLoading || !patientSettings) {
        return <LoadingScreen />
    }

    return (
        <AuthorizedRoute caregiverOnly={true}>
            <Stack.Screen 
                options={{
                    title: patientSettings.patient.displayName,
                    headerBackTitle: "Back",
                    headerBackVisible: true,
                }}
            />
            <SafeAreaView className="flex-1 bg-slate-900 p-6">
                <Text>Track List</Text>
            </SafeAreaView>
        </AuthorizedRoute>
    )
}