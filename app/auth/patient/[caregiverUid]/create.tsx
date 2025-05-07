import { SafeAreaView } from "react-native-safe-area-context";
import PatientCreateForm from "@/components/patient/createForm";
import { useCaregiver } from "@/components/CaregiverContext";

export default function CreatePatient() {
    const { patients, caregiverUid } = useCaregiver();

    return (
        <SafeAreaView className="bg-slate-900 flex-1 p-6 pt-16">            
            <PatientCreateForm caregiverUid={caregiverUid} patients={patients} />
        </SafeAreaView>
    );
}