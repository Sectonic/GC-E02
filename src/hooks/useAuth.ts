import { useState, useEffect } from 'react';
import { auth } from '@/src/firebase/config';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import * as WebBrowser from "expo-web-browser";
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return subscriber;
    }, []);

    const caretakerLogin = async () => {
        setError(null);
        try {
            const REDIRECT_URI = `http://firebase-emulator.com:5001/dementia-assistance-network/us-central1/google`;
            const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
            authUrl.searchParams.append("response_type", "code");
            authUrl.searchParams.append("client_id", process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || "");
            authUrl.searchParams.append("redirect_uri", REDIRECT_URI);
            authUrl.searchParams.append("scope", "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile");
            authUrl.searchParams.append("access_type", "offline");
            authUrl.searchParams.append("state", "1234_purpleGoogle");
            authUrl.searchParams.append("prompt", "consent");

            const result = await WebBrowser.openAuthSessionAsync(
                authUrl.toString(),
                REDIRECT_URI
            );

            if (result.type === 'success') {
                const params = Linking.parse(result.url)?.queryParams;
                if (params) {
                    console.log(params);
                }
            }
            
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const logout = async () => {
        setError(null);
        try {
            await signOut(auth);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return {
        user,
        loading,
        error,
        logout,
        caretakerLogin
    };
};

export default useAuth;