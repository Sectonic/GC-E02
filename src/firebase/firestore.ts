import { db } from "./config"
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore"

export const getPatientUids = async (giverUid: string): Promise<string[]> => {
    if (!giverUid) {
        throw new Error('Giver UID is required');
    }

    const pairingDoc = await getDoc(doc(db, 'pairings', giverUid));

    if (!pairingDoc.exists()) {
        throw new Error(`No pairing found for giver UID: ${giverUid}`);
    }

    const patientUids = pairingDoc.data()?.patient_uids;
    if (!patientUids || patientUids.length === 0) {
            throw new Error(`Patient UIDs not found or empty in pairing document for giver UID: ${giverUid}`);
    }
    return patientUids;
}

export const getGiverUid = async (patientUid: string): Promise<string> => {
    if (!patientUid) {
        throw new Error('Patient UID is required');
    }

    const pairingsRef = collection(db, 'pairings');
    const q = query(pairingsRef, where('patient_uids', 'array-contains', patientUid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        throw new Error(`No pairing found containing patient UID: ${patientUid}`);
    }

    if (querySnapshot.size > 1) {
        throw new Error(`Multiple pairings found containing patient UID: ${patientUid}.`);
    }

    const giverUid = querySnapshot.docs[0].id;
    return giverUid;
}
