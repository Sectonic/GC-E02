import { PatientInfo } from "../types/patientInfo";
import { Track } from "../types/track";

export default class PatientHTTPClient {
    public static async getPatientSettings(uid: string): Promise<{ patient: PatientInfo, tracks: Track[] }> {
        if (!uid) {
            throw new Error('Caregiver UID is required.');
        }
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/user/${uid}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to retrieve caregiver information.');
        }
        return data;
    }

    public static async createPatient(name: string, caregiverUid: string): Promise<string> {
        if (!name || !caregiverUid) {
            throw new Error('Name and caregiver UID are required.');
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, caregiver_uid: caregiverUid }),
        }
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/auth/patient/create`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create patient.');
        }
        return data.custom_token;
    }

    public static async loginPatient(patientUid: string, caregiverUid: string): Promise<string> {
        if (!patientUid || !caregiverUid) {
            throw new Error('Patient UID and caregiver UID are required.');
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ patient_uid: patientUid, caregiver_uid: caregiverUid }),
        }
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/auth/patient/login`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to login patient.');
        }
        return data.custom_token;
    }
}