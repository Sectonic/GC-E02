import { auth } from '@/src/firebase/config';
import { GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import * as WebBrowser from "expo-web-browser";
import * as Linking from 'expo-linking';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

const useAuth = () => {
    const router = useRouter();

    const caretakerLogin = async () => {
        try {
            const REDIRECT_URI = `https://dan-api.vercel.app/auth/google`;
            const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
            authUrl.searchParams.append("response_type", "code");
            authUrl.searchParams.append("client_id", process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || "");
            authUrl.searchParams.append("redirect_uri", REDIRECT_URI);
            authUrl.searchParams.append("scope", "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile");
            authUrl.searchParams.append("access_type", "offline");
            authUrl.searchParams.append("state", "1234_purpleGoogle");
            authUrl.searchParams.append("prompt", "consent");

            const authResult = await WebBrowser.openAuthSessionAsync(
                authUrl.toString(),
                REDIRECT_URI
            );

            if (authResult.type === "success") {
                const params = Linking.parse(authResult.url)?.queryParams;
                if (params && params.id_token && typeof params.id_token === 'string') {
                    const credential = GoogleAuthProvider.credential(params.id_token);
                    const userResult = await signInWithCredential(auth, credential);
                    auth.updateCurrentUser(userResult.user);
                    router.replace('/');
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Authentication error',
                        text2: 'Auth session did not return the correct credentials'
                    })
                }
            } else if (authResult.type !== "cancel") {
                Toast.show({
                    type: 'error',
                    text1: 'Authentication error',
                    text2: 'Auth session was unsuccessful'
                })
            }

            
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Authentication error',
                text2: (error as Error).message
            })
        }
    };

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
        caretakerLogin
    };
};

export default useAuth;