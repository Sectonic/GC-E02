import useAuth from "@/src/hooks/useAuth";
import { PatientInfo } from "@/src/types/patientInfo";
import withToastError from "@/src/utils/withToastError";
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

interface PatientCreateFormProps {
    caregiverUid: string;
    patients: PatientInfo[]
}

const PatientCreateForm = ({ caregiverUid, patients }: PatientCreateFormProps) => {
    const { patientCreate, isLoading } = useAuth();
    const [name, setName] = useState<string>("");

    const handleForm = withToastError(async () => {
        if (!name.trim()) {
            throw new Error("Full name is required.");
        }
        if (patients.map(patient => patient.displayName).includes(name)) {
            throw new Error("Another patient already has this name.");
        }
        await patientCreate(name, caregiverUid);
    }, 'Patient Creation');
 
    return (
        <View>
            <Text className="text-white text-lg">Full Name</Text>
            <TextInput
                className="mt-1 bg-slate-800 rounded-md p-4 text-xl text-white transition border border-transparent focus:border-indigo-600"
                placeholder="Ex: John Doe"
                onChangeText={setName}
                value={name}
            />
            <TouchableOpacity
                className="mt-8 bg-indigo-600 rounded-full p-4 flex flex-row justify-center items-center gap-2"
                onPress={handleForm}
            >
                { isLoading && <ActivityIndicator size="small" color="#0f172a" /> }
                <Text className="text-white text-xl text-center">Create</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PatientCreateForm;