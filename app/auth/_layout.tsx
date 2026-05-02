import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ title: 'লগইন' }} />
      <Stack.Screen name="register" options={{ title: 'রেজিস্ট্রেশন' }} />
    </Stack>
  );
}