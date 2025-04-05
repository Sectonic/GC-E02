import { doc, getDoc } from "firebase/firestore"
import { db } from "./config"
import Toast from "react-native-toast-message";

export const getReceiverUid = async (takerUid: string): Promise<string | undefined> => {
    if (!takerUid) {
        Toast.show({
            type: 'error',
            text1: 'App Error',
            text2: 'Taker UID is required'
        })
        console.error('Taker UID is required');
    }
    
    try {
        const receiverDoc = await getDoc(doc(db, 'pairings', takerUid));
        
        if (!receiverDoc.exists()) {
            Toast.show({
                type: 'error',
                text1: 'App Error',
                text2: `No pairing found for taker UID: ${takerUid}`
            });
            console.error(`No pairing found for taker UID: ${takerUid}`);
            return;
        }
        
        const receiverUid = receiverDoc.data()?.receiver_uid;
        return receiverUid || undefined;
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'App Error',
            text2: `Error fetching receiver for taker UID ${takerUid}:`
        })
        console.error(`Error fetching receiver for taker UID ${takerUid}:`, error);
    }

    return;
}