import { PatientInfo } from "../types/patientInfo";

export default class CaregiverHTTPClient {
    public static async getPatientsOfCaregiver(uid: string): Promise<PatientInfo[]> {
        if (!uid) {
            throw new Error('Caregiver UID is required.');
        }
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/user/${uid}/patients`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to retrieve patients.');
        }
        return data.patients;
    }
}