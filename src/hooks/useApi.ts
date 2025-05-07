import { useState, useEffect } from 'react';

interface UseApiState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

export function useApi<T>(apiCall: (...args: any[]) => Promise<T>, ...args: any[]): UseApiState<T> {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        isLoading: true,
        error: null,
    });

    const argsString = JSON.stringify(args);

    useEffect(() => {
        const fetchData = async () => {
            setState({ data: null, isLoading: true, error: null });
            try {
                const result = await apiCall(...JSON.parse(argsString));
                setState({ data: result, isLoading: false, error: null });
            } catch (error) {
                setState({ data: null, isLoading: false, error: (error as Error).message });
            }
        };
        fetchData();
    }, []);

    return state;
}
