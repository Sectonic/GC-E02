import React from 'react';
import AuthorizedRoute from "@/components/authorizedRoute";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native"; 
import { useRouter } from "expo-router";
import { useEffect, useState } from "react"
import { Audio, AVPlaybackStatus } from 'expo-av';;
const audioSource = require('../assets/music.mp3');

export default function Music() {
    const router = useRouter();
    const [audio, setAudio] = useState<Audio.Sound>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(1);
    const [progress, setProgress] = useState<number>(0);

    const onPlayBackStatusUpdate = async (status: AVPlaybackStatus) => {
        setIsLoading(status.isLoaded);
        if (status.isLoaded) {
            setDuration(status.durationMillis || 1);
            setProgress(status.positionMillis);
        }
    }

    const playAudio = async () => {
        const { sound } = await Audio.Sound.createAsync(
            audioSource,
            { shouldPlay: true, volume: 1 },
            onPlayBackStatusUpdate
        );
        setAudio(sound);
        await sound.playAsync();
    }

    const stopAudio = async () => {
        await audio?.stopAsync();
        setAudio(undefined);
    }

    useEffect(() => {
        playAudio();
    }, []);

    useEffect(() => {
        return audio ? () => {
            stopAudio();
        } : undefined;
    }, [audio])

    return (
        <AuthorizedRoute> 
            <SafeAreaView className="relative flex-1 flex justify-between py-10 bg-indigo-600">
                { isLoading ? (
                    <>
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
                                    className="h-2 mt-5 bg-indigo-200 rounded-l-full"
                                    style={{ flexBasis: `${(progress / duration) * 100}%` }}
                                />
                                <View 
                                    className="h-2 mt-5 bg-indigo-400 rounded-r-full"
                                    style={{ flexBasis: `${100 - ((progress / duration) * 100)}%` }}
                                />
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity 
                                onPress={() => router.back()} 
                                className="mt-20 mx-auto bg-indigo-950 px-20 py-3 rounded-full"
                            >
                                <Text className="text-lg text-white font-medium">Stop Playing</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <View className="flex-1 flex justify-center items-center">
                        <ActivityIndicator size="large" color="white" />
                    </View>
                ) }
            </SafeAreaView>
        </AuthorizedRoute>
    )
}