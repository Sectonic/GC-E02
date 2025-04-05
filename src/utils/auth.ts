import { auth } from '@/src/firebase/config';
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import * as WebBrowser from "expo-web-browser";
import * as Linking from 'expo-linking';
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';

interface LoginConfig {
    providerName: "google.com" | "oidc.whoop";
    authUrlBase: string;
    redirectUri: string;
    clientId: string;
    scope: string;
    additionalParams?: Record<string, string>;
    redirectHome: () => void;
}

const showErrorToast = (title: string, message: string) => {
    Toast.show({
        type: 'error',
        text1: title,
        text2: message
    });
};

if (Platform.OS === 'web') {
    WebBrowser.maybeCompleteAuthSession();
}

const performLogin = async (config: LoginConfig) => {

    try {
        const authUrl = new URL(config.authUrlBase);
        authUrl.searchParams.append("response_type", "code");
        authUrl.searchParams.append("client_id", config.clientId);
        authUrl.searchParams.append("redirect_uri", config.redirectUri);
        authUrl.searchParams.append("scope", config.scope);

        if (config.additionalParams) {
            Object.entries(config.additionalParams).forEach(([key, value]) => {
                authUrl.searchParams.append(key, value);
            });
        }

        const authResult = await WebBrowser.openAuthSessionAsync(
            authUrl.toString(),
            config.redirectUri
        );

        if (authResult.type === "success") {
            const params = Linking.parse(authResult.url)?.queryParams;
            if (params && params.error && typeof params.error === 'string') {
                showErrorToast('Authentication error', decodeURIComponent(params.error));
                return;
            }
            if (config.providerName === "google.com") {
                if (params && params.id_token && typeof params.id_token === 'string') {
                    const credential = GoogleAuthProvider.credential(params.id_token);
                    const userResult = await signInWithCredential(auth, credential);
                    auth.updateCurrentUser(userResult.user);
                    config.redirectHome();
                } else {
                    showErrorToast('Authentication error', 'Auth session did not return the correct google credentials');
                }
            } else if (config.providerName === "oidc.whoop") {
                const { uid, caregiver_uid, email, generated_password, error } = params || {};
                if (
                    typeof uid === 'string' &&
                    typeof caregiver_uid === 'string' &&
                    typeof email === 'string' &&
                    typeof generated_password === 'string'
                ) {
                    const userResult = await signInWithEmailAndPassword(auth, email, generated_password);
                    auth.updateCurrentUser(userResult.user);
                    config.redirectHome();
                } else {
                    showErrorToast('Authentication error', 'Auth session did not return the required Whoop parameters');
                }
            } else {
                showErrorToast('Authentication error', 'Unsupported provider');
            }
        } else if (authResult.type !== "cancel") {
            showErrorToast('Authentication error', 'Auth session was unsuccessful');
        }
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (!errorMessage.includes("Another web browser is already open")) {
            console.log(error);
            showErrorToast('Authentication error', errorMessage);
        }
    }
};

export default performLogin;