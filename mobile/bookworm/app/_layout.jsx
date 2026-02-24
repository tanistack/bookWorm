import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";

export default function RootLayout() {
  return (

    <SafeScreen>
      <SafeAreaProvider>

    
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#f2f2f2",
        },
        headerShown: false
      }}
    >
      {/* Screens inside app/ are automatically registered */}
      <Stack.Screen
        name="index"
        options={{ title: "Home" }}
      />

      <Stack.Screen
        name="(auth)"
        options={{ title: "Signin" }}
      />

      <Stack.Screen
        name="(auth)/signup"
        options={{ title: "Signup" }}
      />


    </Stack>


      </SafeAreaProvider>
    </SafeScreen>




    
  );
}