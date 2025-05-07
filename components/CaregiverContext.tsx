import { createContext, useContext, ReactNode } from 'react';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import LoadingScreen from "@/components/loadingScreen";
import Toast from "react-native-toast-message";
import { useApi } from "@/src/hooks/useApi";
import APIHTTPClient from "@/src/httpClient/apiHTTPClient";
import { PatientInfo } from "@/src/types/patientInfo";

interface CaregiverContextType {
    patients: PatientInfo[];
    caregiverUid: string;
}

const CaregiverContext = createContext<CaregiverContextType | null>(null);

export function CaregiverProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { caregiverUid } = useLocalSearchParams<{ caregiverUid: string }>();
    const { isLoading, data: patients, error } = useApi(APIHTTPClient.getPatientsOfCaregiver, caregiverUid);

    useEffect(() => {
        if (isLoading || caregiverUid === undefined) return;
        if (error) {
            Toast.show({
                type: "error",
                text1: "Application Error",
                text2: error
            });
            router.replace("/auth/qr");
            return;
        }
    }, [isLoading, caregiverUid, error, router]);

    if (isLoading || !caregiverUid || error) {
        return <LoadingScreen />;
    }

    return (
        <CaregiverContext.Provider value={{ patients: patients as PatientInfo[], caregiverUid }}>
            {children}
        </CaregiverContext.Provider>
    );
}

export function useCaregiver() {
    const context = useContext(CaregiverContext);
    if (!context) {
        throw new Error('useCaregiver must be used within a CaregiverProvider');
    }
    return context;
} 