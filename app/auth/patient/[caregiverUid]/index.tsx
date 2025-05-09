import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PatientLoginButton from "@/components/patient/loginButton";
import { useCaregiver } from "@/components/caregiverContext";

export default function Patients() {
    const router = useRouter();
    const { patients, caregiverUid } = useCaregiver();

    return (
        <SafeAreaView className="bg-slate-900 flex-1 p-6 pt-8">            
            <ScrollView showsVerticalScrollIndicator={false} className="flex-grow mt-10">
                <TouchableOpacity
                    className="bg-indigo-600 p-4 rounded-full mb-4 flex-row items-center justify-center shadow-md"
                    onPress={() => router.push(`/auth/patient/${caregiverUid}/create`)}
                >
                    <Ionicons name="add-circle-outline" size={22} color="white" />
                    <Text className="text-white text-lg font-medium ml-2">Create New Patient</Text>
                </TouchableOpacity>
                {patients.map((patient, idx) => <PatientLoginButton key={idx} patient={patient} caregiverUid={caregiverUid} />)}
            </ScrollView>
        </SafeAreaView>
    );
}