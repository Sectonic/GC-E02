import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { auth } from '@/src/firebase/config';
import LoadingScreen from './loadingScreen';
import React from 'react';

interface UnauthorizedRouteProps {
    children: React.ReactNode;
}

export default function UnauthorizedRoute({ children }: UnauthorizedRouteProps) {
    const router = useRouter();

    useEffect(() => {
        if (auth.currentUser) {
            console.log(auth.currentUser);
            console.log('User is authenticated, redirecting to home page...');
            setTimeout(() => {
                router.replace('/');
            }, 1)
        }
    }, [auth.currentUser, router])

    if (auth.currentUser) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}