import { createContext, useContext, ReactNode } from 'react';
import { Redirect, useLocalSearchParams } from "expo-router";
import LoadingScreen from "@/components/loadingScreen";
import Toast from "react-native-toast-message";
import { useApi } from "@/src/hooks/useApi";
import PatientHTTPClient from "@/src/httpClient/patientHTTPClient";
import { PatientInfo } from "@/src/types/patientInfo";
import CaregiverHTTPClient from '@/src/httpClient/caregiverHTTPClient';

interface CaregiverContextType {
    patients: PatientInfo[];
    caregiverUid: string;
}

const CaregiverContext = createContext<CaregiverContextType | null>(null);

export function CaregiverProvider({ children }: { children: ReactNode }) {
    const { caregiverUid } = useLocalSearchParams<{ caregiverUid: string }>();
    const { isLoading, data: patients, error } = useApi(CaregiverHTTPClient.getPatientsOfCaregiver, caregiverUid);

    if (error) {
        Toast.show({
            type: "error",
            text1: "Application Error",
            text2: error
        })
        return <Redirect href="/auth/unauthorized" />
    }
    if (isLoading) {
        return <LoadingScreen />
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