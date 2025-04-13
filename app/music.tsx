import AuthorizedRoute from "@/components/authorizedRoute";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, TouchableOpacity, View } from "react-native"; 
import { useRouter } from "expo-router";

export default function Music() {
    const router = useRouter();

    return (
        <AuthorizedRoute> 
            <SafeAreaView className="relative flex-1 flex justify-between py-10 bg-indigo-600">
                <View className="w-[300px] mx-auto">
                    <View className="w-full h-[300px] shadow-lg">
                        <Image
                            source={{ uri: 'https://i.scdn.co/image/ab67616d00001e027c68face1dc58127f3a7b1cc' }} 
                            className="h-full w-full rounded-xl"
                        />
                    </View>
                    <Text className="text-3xl text-indigo-100 font-semibold mt-10">Always</Text>
                    <Text className="text-xl text-indigo-400 font-medium">By Daniel Caesar</Text>
                    <View className="flex flex-row">
                        <View 
                            className="basis-2/5 h-2 mt-5 bg-indigo-200 rounded-l-full"
                        />
                        <View 
                            className="basis-3/5 h-2 mt-5 bg-indigo-400 rounded-r-full"
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => router.back()} className="mt-20 mx-auto bg-indigo-950 px-20 py-3 rounded-full">
                        <Text className="text-lg text-white font-medium">Stop Playing</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </AuthorizedRoute>
    )
}