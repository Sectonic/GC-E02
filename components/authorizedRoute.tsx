import { Redirect } from 'expo-router';
import { auth } from '@/src/firebase/config';
import React from 'react';
import useAuth from '@/src/hooks/useAuth';

interface AuthorizedRouteProps {
    caregiverOnly?: boolean;
    children: React.ReactNode;
}

export default function AuthorizedRoute({ children, caregiverOnly }: AuthorizedRouteProps) {
    const { isCaregiver } = useAuth();
    if (!auth.currentUser) {
        return <Redirect href="/auth/unauthorized" />;
    }
    if (caregiverOnly && !isCaregiver()) {
        return <Redirect href="/auth/unauthorized" />;
    }
    return <>{children}</>;
}