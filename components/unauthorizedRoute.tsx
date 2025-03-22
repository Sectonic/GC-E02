import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import useAuth from '@/src/hooks/useAuth';
import LoadingScreen from './loadingScreen';
import ErrorScreen from './errorScreen';

interface UnauthorizedRouteProps {
    children: React.ReactNode;
}

export default function UnauthorizedRoute({ children }: UnauthorizedRouteProps) {
    const router = useRouter();
    const { user, loading, error } = useAuth();

    useEffect(() => {
        if (!loading && !error && user) {
            console.log('User is authenticated, redirecting to home page...');
            router.replace('/');
        }
    }, [user, loading, error, router]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <ErrorScreen error={error} />;
    }

    if (user) {
        return null;
    }

    return <>{children}</>;
}