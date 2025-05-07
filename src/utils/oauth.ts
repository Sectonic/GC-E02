import { auth } from '@/src/firebase/config';
import { GoogleAuthProvider, signInWithCredential, UserCredential } from 'firebase/auth';
import * as WebBrowser from "expo-web-browser";
import * as Linking from 'expo-linking';

interface OAuthConfig {
    providerName: "google.com" | "spotify.com";
    authUrlBase: string;
    redirectUri: string;
    clientId: string;
    scope: string;
    additionalParams?: Record<string, string>;
    redirectHome: () => void;
}

const RESPONSE_TYPE = "code";

const buildOAuthUrl = (config: OAuthConfig): string => {
    const oauthUrl = new URL(config.authUrlBase);

    oauthUrl.searchParams.append("response_type", RESPONSE_TYPE);
    oauthUrl.searchParams.append("client_id", config.clientId);
    oauthUrl.searchParams.append("redirect_uri", config.redirectUri);
    oauthUrl.searchParams.append("scope", config.scope);
    if (config.additionalParams) {
        Object.entries(config.additionalParams).forEach(([key, value]) => {
            oauthUrl.searchParams.append(key, value);
        });
    }
    
    return oauthUrl.toString();
};

const handleOAuthSuccess = async (
    oauthResultUrl: string,
    config: OAuthConfig
): Promise<void> => {
    const params = Linking.parse(oauthResultUrl)?.queryParams;

    if (!params) {
        throw new Error('Could not parse response URL parameters.');
    }

    if (params.error && typeof params.error === 'string') {
        throw new Error(`${decodeURIComponent(params.error)}`);
    }

    let userResult: UserCredential | null = null;
    if (config.providerName === "google.com") {
        userResult = await handleGoogleOAuth(params);
    } else if (config.providerName === "spotify.com") {
        // not doing anything right now for spotify
    } else {
        throw new Error('Unsupported provider');
    }

    if (userResult) {
        await auth.updateCurrentUser(userResult.user);
        config.redirectHome();
    }
};

const handleGoogleOAuth = async (params: Linking.ParsedURL['queryParams']): Promise<UserCredential | null> => {
    if (params && params.id_token && typeof params.id_token === 'string') {
        const credential = GoogleAuthProvider.credential(params.id_token);
        return await signInWithCredential(auth, credential);
    } else {
        throw new Error('Auth session did not return the correct Google credentials');
    }
};

const performOAuth = async (config: OAuthConfig): Promise<void> => {
    const oauthUrl = buildOAuthUrl(config);
    const oauthResult = await WebBrowser.openAuthSessionAsync(
        oauthUrl,
        config.redirectUri
    );

    if (oauthResult.type === "success") {
        await handleOAuthSuccess(oauthResult.url, config);
    } else if (oauthResult.type !== "cancel" && oauthResult.type !== "dismiss") {
        throw new Error(`Auth session failed with type: ${oauthResult.type}`);
    }
};

export default performOAuth;
