import { auth } from '@/src/firebase/config';
import { signInWithCustomToken, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import performOAuth from '../utils/oauth';
import * as Linking from 'expo-linking';
import { useState } from 'react';
import APIHTTPClient from '../httpClient/apiHTTPClient';
import withToastError from '../utils/withToastError';

const useAuth = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState<boolean>(false);

    const isCaregiver = () => auth.currentUser?.email !== null;

    const patientCreate = withToastError(async (name: string, caregiverUid: string) => {
        setLoading(true);
        try {
            const customToken = await APIHTTPClient.createPatient(name, caregiverUid);
            const userResult = await signInWithCustomToken(auth, customToken);
            await auth.updateCurrentUser(userResult.user);
            router.push('/');
        } finally {
            setLoading(false);
        }
    }, 'Patient Creation');

    const patientLogin = withToastError(async (userUid: string, caregiverUid: string) => {
        setLoading(true);
        try {
            const customToken = await APIHTTPClient.loginPatient(userUid, caregiverUid);
            const userResult = await signInWithCustomToken(auth, customToken);
            await auth.updateCurrentUser(userResult.user);
            router.push('/');
        } finally {
            setLoading(false);
        }
    }, 'Patient Login');

    const caregiverLogin = withToastError(async () => {
        setLoading(true);
        try {
            await performOAuth({
                providerName: 'google.com',
                authUrlBase: 'https://accounts.google.com/o/oauth2/v2/auth',
                redirectUri: `${process.env.EXPO_PUBLIC_API_BASE}/auth/google`,
                clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
                scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
                additionalParams: { access_type: 'offline', state: Linking.createURL(''), prompt: 'consent' },
                redirectHome: () => router.replace('/')
            });
        } finally {
            setLoading(false);
        }
    }, 'Caregiver Login');

    const logout = withToastError(async () => {
        setLoading(true);
        try {
            await signOut(auth);
            router.replace('/auth/unauthorized');
        } finally {
            setLoading(false);
        }
    }, 'Logout');

    return {
        logout,
        caregiverLogin,
        patientLogin,
        patientCreate,
        isCaregiver,
        isLoading
    };
};

export default useAuth;