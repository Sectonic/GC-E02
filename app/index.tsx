import useAuth from '@/src/hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import AuthorizedRoute from '@/components/authorizedRoute';

export default function HomeScreen() {
  const { user } = useAuth();

  return ( 
    <AuthorizedRoute>
      <SafeAreaView className="flex-1 h-full justify-center items-center">
        <Text className="text-white text-xl">Home Screen</Text>
      </SafeAreaView>
    </AuthorizedRoute>   
  );
}