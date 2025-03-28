export default class APIService {
    public static async findUser(uid: string): Promise<boolean> {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE}/user/${uid}`);
        const data = await response.json();
        return data.contains;
    }
}