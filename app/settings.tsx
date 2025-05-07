import AuthorizedRoute from "@/components/authorizedRoute";
import { auth } from "@/src/firebase/config";
import { SafeAreaView } from "react-native-safe-area-context";
import CaregiverSettings from "@/components/caregiver/settings";
import PatientSettings from "@/components/patient/settings";
import useAuth from "@/src/hooks/useAuth";

export default function Settings() {
    const { isCaregiver } = useAuth();
    return (
        <AuthorizedRoute>
            <SafeAreaView className="flex-1 bg-slate-900">
                {auth.currentUser &&
                    isCaregiver() ? <CaregiverSettings /> : <PatientSettings />
                }
            </SafeAreaView>
        </AuthorizedRoute>
    )
}