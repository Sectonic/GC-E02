import { useEffect, useState } from "react"
import { getPatientUids } from "../firebase/firestore";
import { auth } from "../firebase/config";

export const useReceiver = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [receiverUid, setReceiverUid] = useState<string>();

    useEffect(() => {
        if (!auth.currentUser) return;
        const getData = async () => {
            const receiver_uid = await getPatientUids(auth.currentUser?.uid as string);
            setReceiverUid(receiver_uid[0]);
            setIsLoading(false);
        }
        getData();
    }, [auth.currentUser]);

    return { isLoading, receiverUid };
}