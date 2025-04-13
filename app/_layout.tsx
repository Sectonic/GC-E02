import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import Toast, { ErrorToast } from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '@/global.css';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({ Poppins_400Regular });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <SafeAreaView className='bg-slate-900' />;
  }

  return (
    <>
      <Stack 
        screenOptions={{
          headerBackTitle: "Back",
          headerBackVisible: true,
          headerTransparent: true,
          headerTintColor: "#ffffff",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="music" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
      </Stack>
      <Toast 
        topOffset={65} 
        config={{
          error: (props) => <ErrorToast 
          {...props}
          style={{ backgroundColor: '#020617', borderLeftColor: '#e11d48' }}
          text1Style={{ color: '#fff', fontSize: 17 }}
          text2Style={{ color: '#fff', fontSize: 13 }}
          />
        }} 
      />
    </>
  );
}
