import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import useAuth from '@/src/hooks/useAuth';
import LoadingScreen from './loadingScreen';
import ErrorScreen from './errorScreen';

interface AuthorizedRouteProps {
    children: React.ReactNode;
}

export default function AuthorizedRoute({ children }: AuthorizedRouteProps) {
    const router = useRouter();
    const { user, loading, error } = useAuth();

    useEffect(() => {
        if (!loading && !error && !user) {
            console.log('User is not authenticated, redirecting to unauthorized page...');
            router.replace('/auth/unauthorized');
        }
    }, [user, loading, error, router]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <ErrorScreen error={error} />;
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}