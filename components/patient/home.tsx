import useActions from "@/src/hooks/useActions";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

export default function PatientHome() {
    const {
        isProcessing,
        agitationAction,
        wonderingAction
    } = useActions();

    return (
        <View className="mt-12 p-4">
            {isProcessing && (
                <View className="mb-6 flex-row items-center justify-center p-3 bg-indigo-950 rounded-lg">
                    <ActivityIndicator size="small" color="#4f46e5" />
                    <Text className="ml-2 text-white">Processing action...</Text>
                </View>
            )}
            <View className="flex-row items-center">
                <View className="flex-1 h-[1px] bg-gray-400" />
                <Text className="mx-4 text-white">Patient Actions</Text>
                <View className="flex-1 h-[1px] bg-gray-400" />
            </View>
            <View className="mt-6 w-full flex flex-row flex-wrap gap-4">
                <TouchableOpacity 
                    disabled={isProcessing}
                    className={`basis-[47.5%] py-4 rounded-lg ${isProcessing ? 'bg-rose-500/65' : 'bg-rose-500'}`} 
                    onPress={() => agitationAction()}>
                    <Text className="text-white text-center text-xl">Agitated</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    disabled={isProcessing}
                    className={`basis-[47.5%] py-4 rounded-lg ${isProcessing ? 'bg-pink-500/65' : 'bg-pink-500'}`} 
                    onPress={() => wonderingAction()}>
                    <Text className="text-white text-center text-xl">Wondered</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    disabled={isProcessing}
                    className={`basis-[47.5%] py-4 rounded-lg ${isProcessing ? 'bg-emerald-500/65' : 'bg-emerald-500'}`} 
                    onPress={() => {}}>
                    <Text className="text-white text-center text-xl">Injured</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    disabled={isProcessing}
                    className={`basis-[47.5%] py-4 rounded-lg ${isProcessing ? 'bg-teal-500/65' : 'bg-teal-500'}`} 
                    onPress={() => {}}>
                    <Text className="text-white text-center text-xl">Unwell</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
