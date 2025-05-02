import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import useAuth from "@/src/hooks/useAuth";

export default function Authenticate() {
    const { caretakerLogin } = useAuth();
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-slate-900">
            <View className="flex-1 p-6">
                <View className="pt-6 pb-10">
                    <Text className="text-3xl font-bold text-white text-center mb-2">Choose Your Role</Text>
                    <Text className="text-base text-gray-400 text-center">Select how you want to use the app</Text>
                </View>
                
                <TouchableOpacity 
                    className="bg-indigo-600 p-6 rounded-xl"
                    onPress={() => caretakerLogin()}
                >
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="person" size={24} color="white" />
                        <Text className="text-xl font-medium text-white ml-3">For Caretakers</Text>
                    </View>
                    <Text className="text-gray-300">I provide care for someone with dementia</Text>
                </TouchableOpacity>
                
                <View className="flex-row items-center my-6">
                    <View className="flex-1 h-[1px] bg-gray-700" />
                    <Text className="mx-4 text-gray-500">OR</Text>
                    <View className="flex-1 h-[1px] bg-gray-700" />
                </View>
                
                <TouchableOpacity 
                    className="bg-violet-600 p-6 rounded-xl"
                    onPress={() => router.push('/auth/qr')}
                >
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="medkit" size={24} color="white" />
                        <Text className="text-xl font-medium text-white ml-3">For Patients</Text>
                    </View>
                    <Text className="text-gray-300">I'm receiving care for my condition</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}