import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { auth } from '@/src/firebase/config';
import LoadingScreen from './loadingScreen';

interface AuthorizedRouteProps {
    children: React.ReactNode;
}

export default function AuthorizedRoute({ children }: AuthorizedRouteProps) {
    const router = useRouter();

    useEffect(() => {
        if (!auth.currentUser) {
            console.log('User is not authenticated, redirecting to unauthorized page...');
            setTimeout(() => {
                router.replace('/auth/unauthorized');
            }, 1);
        }
    }, [auth.currentUser, router]);

    if (!auth.currentUser) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}