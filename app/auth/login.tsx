import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // এখানে লগইন লজিক বা API কল হবে
    alert('লগইন সফল হয়েছে!');
    router.replace('/(tabs)'); // লগইন শেষে হোমে নিয়ে যাবে
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>সদাই ঘরে স্বাগতম</Text>
        <Text style={styles.subtitle}>আপনার অ্যাকাউন্টে লগইন করুন</Text>

        <TextInput
          style={styles.input}
          placeholder="ইমেইল বা ফোন নম্বর"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="পাসওয়ার্ড"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>লগইন</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text>অ্যাকাউন্ট নেই? </Text>
          <Link href="./register" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>রেজিস্ট্রেশন করুন</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  content: { padding: 25 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2E7D32', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 },
  loginBtn: { backgroundColor: '#2E7D32', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  loginBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  linkText: { color: '#2E7D32', fontWeight: 'bold' },
});