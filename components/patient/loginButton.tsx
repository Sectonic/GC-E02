import useAuth from "@/src/hooks/useAuth";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { PatientInfo } from "@/src/types/patientInfo";

interface PatientLoginButtonProps {
    patient: PatientInfo;
    caregiverUid: string;
}

const PatientLoginButton = ({ patient, caregiverUid }: PatientLoginButtonProps) => {
    const { isLoading, patientLogin } = useAuth();
    return (
        <TouchableOpacity
            className="bg-slate-800 p-4 rounded-full mb-4 shadow-md flex flex-row justify-center items-center gap-2"
            onPress={() => patientLogin(patient.localId, caregiverUid)}
        >
            { isLoading && <ActivityIndicator size="small" color="white" /> }
            <Text className="text-white text-lg font-medium text-center">
                {patient.displayName}
            </Text>
        </TouchableOpacity>
    )
}

export default PatientLoginButton;