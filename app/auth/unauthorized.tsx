import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeBg from '@/assets/home-bg.svg';
import { useRouter } from 'expo-router';
import UnauthorizedRoute from '@/components/unauthorizedRoute';

export default function UnAuthorizedScreen() {
  const router = useRouter();

  return ( 
    <UnauthorizedRoute>
      <View className="flex-1 bg-slate-900">
        <View className="absolute inset-0 opacity-85">
          <HomeBg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
        </View>
        <SafeAreaView className="flex-1">
          <View className="flex-1 p-6">
              <View className="flex-1 pt-8 mb-5">
                <Text className='text-4xl text-center font-medium text-white'>D.A.N.</Text>
                <Text className='text-base text-center font-medium text-white'>Dementia Assistance Network</Text>
              </View>
              <View className='flex-1 justify-end mb-20'>
                <View className='mb-8'>
                  <Text className="text-2xl text-center text-white mb-5">Welcome,</Text>
                  <Text className="text-5xl font-semibold text-white text-center mx-5 mb-10">
                  Stress less battling dementia.
                  </Text>
                </View>
                <TouchableOpacity 
                  className="bg-indigo-600 py-6 rounded-full transition-all hover:scale-105 hover:bg-indigo-700"
                  onPress={() => router.push('/auth')}
                >
                    <Text className="text-white text-2xl text-center">Get Started</Text>
                </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
      </View>
    </UnauthorizedRoute>   
  );
}