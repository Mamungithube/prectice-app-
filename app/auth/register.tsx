import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    if (!name || !email || !phone || !password) {
      alert('অনুগ্রহ করে সব তথ্য পূরণ করুন');
      return;
    }
    // এখানে আপনার Backend API (Django) কল হবে
    alert('রেজিস্ট্রেশন সফল হয়েছে!');
    router.replace('./login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>নতুন অ্যাকাউন্ট</Text>
            <Text style={styles.subtitle}>সদাই ঘর-এ যোগ দিতে নিচের তথ্যগুলো দিন</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>আপনার নাম</Text>
            <TextInput
              style={styles.input}
              placeholder="উদা: আব্দুল করিম"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>ইমেইল</Text>
            <TextInput
              style={styles.input}
              placeholder="example@mail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>ফোন নম্বর</Text>
            <TextInput
              style={styles.input}
              placeholder="017XXXXXXXX"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>পাসওয়ার্ড</Text>
            <TextInput
              style={styles.input}
              placeholder="কমপক্ষে ৬ ডিজিট"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
              <Text style={styles.registerBtnText}>অ্যাকাউন্ট তৈরি করুন</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>ইতিমধ্যেই অ্যাকাউন্ট আছে? </Text>
              <Link href="./login" asChild>
                <TouchableOpacity>
                  <Text style={styles.linkText}>লগইন করুন</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 25, paddingTop: 60 },
  header: { marginBottom: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2E7D32' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 5 },
  form: { marginTop: 10 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: { 
    borderWidth: 1, 
    borderColor: '#eee', 
    backgroundColor: '#f9f9f9',
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 20, 
    fontSize: 16 
  },
  registerBtn: { 
    backgroundColor: '#2E7D32', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10,
    elevation: 3,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  registerBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25, marginBottom: 40 },
  footerText: { color: '#666', fontSize: 15 },
  linkText: { color: '#2E7D32', fontWeight: 'bold', fontSize: 15 },
});