import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 🚀</Text>

      <Text style={styles.subtitle}>
        Your Expo app is working!
      </Text>

      <Link href="/(auth)/signup">Sign Up</Link>
      <Link href="/(auth)">LogIn</Link>

      <Pressable
        style={styles.button}
        onPress={() => alert("Button pressed")}
      >
        <Text style={styles.buttonText}>Tap Me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});