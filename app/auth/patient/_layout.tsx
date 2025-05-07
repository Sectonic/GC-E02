import { Stack } from "expo-router";
import { CaregiverProvider } from "@/components/CaregiverContext";

export default function PatientLayout() {
    return (
        <CaregiverProvider>
            <Stack screenOptions={{
                headerTransparent: true,
                headerTintColor: "#ffffff",
            }}>
                <Stack.Screen 
                    name="[caregiverUid]/index" 
                    options={{ 
                        title: "Select Patient", 
                        headerBackTitle: "Back", 
                        headerBackVisible: true,
                    }} 
                />
                <Stack.Screen 
                    name="[caregiverUid]/create" 
                    options={{ 
                        title: "Create Patient", 
                        headerBackTitle: "Back", 
                        headerBackVisible: true,
                    }} 
                />
            </Stack>
        </CaregiverProvider>
    );
} 