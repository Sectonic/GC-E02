import { Stack } from "expo-router";

export default function AuthenticateLayout() {
    return (
        <Stack screenOptions={{
            headerTransparent: true,
            headerTintColor: "#ffffff",
        }}>
            <Stack.Screen name="unauthorized" options={{ headerShown: false }} />
            <Stack.Screen name="patient" options={{ headerShown: false }} />
            <Stack.Screen 
                name="index" 
                options={{ 
                    title: "Get Started", 
                    headerBackTitle: "Back", 
                    headerBackVisible: true,
                }}
            />
            <Stack.Screen 
                name="qr" 
                options={{ 
                    title: "", 
                    headerBackTitle: "Back", 
                    headerBackVisible: true,
                }} 
            />
            <Stack.Screen 
                name="patient/[caregiverUid]/index" 
                options={{ 
                    title: "Select Patient", 
                    headerBackTitle: "Back", 
                    headerBackVisible: true,
                }} 
            />
            <Stack.Screen 
                name="patient/[caregiverUid]/create" 
                options={{ 
                    title: "Create Patient", 
                    headerBackTitle: "Back", 
                    headerBackVisible: true,
                }} 
            />
        </Stack>
    )
}