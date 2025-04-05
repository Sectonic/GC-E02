import { healthDataSeries, walkingPathData } from '../utils/carereceiverData';
import { useState } from 'react';
import { addDataToCollection, removeCollections } from '../utils/actions';

export default function useActions() {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const agitationAction = async () => {
        setIsProcessing(true);
        await addDataToCollection(
            'agitation_data',
            healthDataSeries
        )
        setIsProcessing(false);
    };

    const wonderingAction = async () => {
        setIsProcessing(true);
        await addDataToCollection(
            'wondering_data',
            walkingPathData
        )
        setIsProcessing(false);
    };

    const resetAction = async () => {
        setIsProcessing(true);
        await removeCollections(
            'agitation_data',
            'wondering_data'
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