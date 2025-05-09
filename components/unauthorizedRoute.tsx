import { Redirect } from 'expo-router';
import { auth } from '@/src/firebase/config';
import React from 'react';

interface UnauthorizedRouteProps {
    children: React.ReactNode;
}

export default function UnauthorizedRoute({ children }: UnauthorizedRouteProps) {
    if (auth.currentUser) {
        return <Redirect href="/" />;
    }
    return <>{children}</>;
}