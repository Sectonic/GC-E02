import { auth } from '@/src/firebase/config';
import { signOut } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import performLogin from '../utils/auth';

const useAuth = () => {
    const router = useRouter();

    const isCaretaker = () => auth.currentUser?.providerData[0].providerId === 'google.com';

    const carereceiverLogin = async (user_uid: string) => await performLogin({
        providerName: 'oidc.whoop',
        authUrlBase: 'https://api.prod.whoop.com/oauth/oauth2/auth',
        redirectUri: `${process.env.EXPO_PUBLIC_API_BASE}/auth/whoop`,
        clientId: process.env.EXPO_PUBLIC_WHOOP_CLIENT_ID || '',
        scope: 'offline read:recovery read:cycles read:sleep read:workout read:profile read:body_measurement',
        additionalParams: { state: user_uid },
        redirectHome: () => router.replace('/')
    });

    const caretakerLogin = async () => await performLogin({
        providerName: 'google.com',
        authUrlBase: 'https://accounts.google.com/o/oauth2/v2/auth',
        redirectUri: `${process.env.EXPO_PUBLIC_API_BASE}/auth/google`,
        clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        additionalParams: { access_type: 'offline', state: 'mobile', prompt: 'consent' },
        redirectHome: () => router.replace('/')
    });

    const logout = async () => {
        try {
            await signOut(auth);
            auth.updateCurrentUser(null);
            router.replace('/auth/unauthorized');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Authentication error',
                text2: (error as Error).message
            })
        }
    };

    return {
        logout,
        caretakerLogin,
        carereceiverLogin,
        isCaretaker
    };
};

export default useAuth;