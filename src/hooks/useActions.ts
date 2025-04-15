import { healthDataSeries, walkingPathData } from '../utils/carereceiverData';
import { useState } from 'react';
import { addDataToCollection, removeCollections } from '../utils/actions';
import { useRouter } from 'expo-router';

export default function useActions() {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    

    const agitationAction = async () => {
        setIsProcessing(true);
        setTimeout(() => {
            router.push('/music');
        }, 17500);
        await addDataToCollection(
            'agitation_data',
            healthDataSeries
        )
        setIsProcessing(false);
    };

    const wonderingAction = async () => {
        setIsProcessing(true);
        setTimeout(() => {
            router.push('/music');
        }, 17000);
        await addDataToCollection(
            'wandering_data',
            walkingPathData,
            500
        )
        setIsProcessing(false);
    };

    const resetAction = async () => {
        setIsProcessing(true);
        await removeCollections(
            'agitation_data',
            'wandering_data'
        )
        setIsProcessing(false);
    }

    return { 
        isProcessing, 
        agitationAction, 
        wonderingAction, 
        resetAction
    };
}