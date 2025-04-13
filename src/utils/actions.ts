import { db, auth } from '../firebase/config';
import { collection, deleteDoc, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';

export const addDataToCollection = async (
    collectionPath: string, 
    dataPoints: any[], 
    timeBetween: number = 1000,
): Promise<void> => {
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
        console.error("User not authenticated");
        return;
    }

    if (auth.currentUser?.providerData[0].providerId === 'google.com') {
        console.error("User is a caretaker");
        return;
    }
    
    const userId = currentUser.uid;
    const collectionRef = collection(db, collectionPath, userId, 'records');
    
    try {
        for (let dataPoint of dataPoints) {
            await addDoc(collectionRef, dataPoint);
            await new Promise(resolve => setTimeout(resolve, timeBetween));
        }
        console.log(`successfully created records for ${collectionPath}`);
    } catch (error) {
        console.error(`Error creating records for ${collectionPath}`);
    }
}

export const removeCollections = async (...collectionPaths: string[]): Promise<void> => {
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
        console.error("User not authenticated");
        return;
    }

    if (auth.currentUser?.providerData[0].providerId !== 'google.com') {
        console.error("User is a carereceiver");
        return;
    }

    try {

        const pairingRef = doc(db, 'pairings', currentUser.uid);
        const pairingDoc = await getDoc(pairingRef);
        
        if (!pairingDoc.exists()) {
            console.error("No pairing found for this caretaker");
            return;
        }
        
        const receiverUid = pairingDoc.data().receiver_uid;
        
        if (!receiverUid) {
            console.error("No receiver UID found in pairing");
            return;
        }
        
        for (const collectionPath of collectionPaths) {
            const recordsRef = collection(db, collectionPath, receiverUid, 'records');
            const recordsSnap = await getDocs(recordsRef);
            
            recordsSnap.forEach(async (document) => {
                await deleteDoc(doc(recordsRef, document.id));
            });
        }

        console.log("Successfully removed collections:", collectionPaths);
    } catch (error) {
        console.error(`Error removing collections ${collectionPaths}:`, error);
    }
}