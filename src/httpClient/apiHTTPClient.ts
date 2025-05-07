import { PatientInfo } from "../types/patientInfo";

export default class APIHTTPClient {
    public static async getIfCaregiver(uid: string): Promise<boolean> {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/user/${uid}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to retrieve caregiver information.');
        }
        return data.contains;
    }

    public static async getPatientsOfCaregiver(uid: string): Promise<PatientInfo[]> {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/user/${uid}/patients`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to retrieve patients.');
        }
        return data.patients;
    }

    public static async createPatient(name: string, caregiverUid: string): Promise<string> {
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