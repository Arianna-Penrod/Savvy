import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type LoginFormProps = {
  email: string;
  password: string;
  error: string;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmit: () => void;
};

export default function LoginForm({
  email,
  password,
  error,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}: LoginFormProps) {
  return (
    // Adjusts the layout when keyboard appears
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Decorative background circles */}
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      {/* Main login card */}
      <View style={styles.card}>
        <View style={styles.logoBubble}>
          <Text style={styles.logoText}>S</Text>
        </View>

        {/* App branding */}
        <Text style={styles.appName}>Savvy</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in to find nearby stores, compare prices, and manage your shopping list.
        </Text>

        {/* Email input */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="test@test.com"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={onChangeEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Password input */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="123456"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry
            onSubmitEditing={onSubmit}
          />
        </View>

        {/* Error message */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Submit button */}
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* Demo credentials hint */}
        <Text style={styles.hint}>Demo login: test@test.com / 123456</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f8fbff",
    justifyContent: "center",
    alignItems: "center",
    padding: 22,
  },
  circleOne: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "#dbeafe",
  },
  circleTwo: {
    position: "absolute",
    bottom: -90,
    left: -90,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#bfdbfe",
  },
  card: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 26,
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 5,
  },
  logoBubble: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  logoText: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
  },
  appName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#3b82f6",
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#64748b",
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: 7,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#0f172a",
  },
  error: {
    color: "#b91c1c",
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 16,
    paddingVertical: 15,
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
  },
  hint: {
    marginTop: 16,
    textAlign: "center",
    color: "#64748b",
    fontSize: 13,
  },
});
