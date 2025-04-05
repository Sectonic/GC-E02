import AuthorizedRoute from "@/components/authorizedRoute";
import { auth } from "@/src/firebase/config";
import { SafeAreaView } from "react-native-safe-area-context";
import CaretakerSettings from "@/components/caretaker/settings";
import CarereceiverSettings from "@/components/carereceiver/settings";
import useAuth from "@/src/hooks/useAuth";

export default function Settings() {
    const { isCaretaker } = useAuth();
    return (
        <AuthorizedRoute>
            <SafeAreaView className="flex-1 bg-slate-900">
                {auth.currentUser && 
                    isCaretaker() ? <CaretakerSettings /> : <CarereceiverSettings />
                }
            </SafeAreaView>
        </AuthorizedRoute>
    )
}