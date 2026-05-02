import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <FontAwesome name="user-circle" size={80} color="#ddd" />
        </View>
        <Text style={styles.userName}>আব্দুল করিম</Text>
        <Text style={styles.userEmail}>karim@example.com</Text>
      </View>

      <View style={styles.menuSection}>
        <ProfileMenuItem icon="shopping-bag" title="আমার অর্ডারসমূহ" />
        <ProfileMenuItem icon="map-marker" title="ডেলিভারি ঠিকানা" />
        <ProfileMenuItem icon="heart" title="উইশলিস্ট" />
        <ProfileMenuItem icon="gear" title="সেটিংস" />
        
        <TouchableOpacity style={styles.logoutBtn}>
          <FontAwesome name="sign-out" size={20} color="#ff4444" />
          <Text style={styles.logoutText}>লগ আউট</Text>
        </TouchableOpacity>

        <Link href="/auth/login" asChild>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>লগইন করতে এখানে ক্লিক করুন</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

function ProfileMenuItem({ icon, title }: { icon: any; title: string }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuLeft}>
        <FontAwesome name={icon} size={20} color="#2E7D32" style={{ width: 30 }} />
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <FontAwesome name="chevron-right" size={14} color="#ccc" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { backgroundColor: '#fff', padding: 30, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
  imageContainer: { marginBottom: 15 },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  userEmail: { fontSize: 14, color: '#888', marginTop: 5 },
  menuSection: { marginTop: 20, backgroundColor: '#fff', paddingHorizontal: 15 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuTitle: { fontSize: 16, color: '#444', marginLeft: 10 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20, marginTop: 10 },
  logoutText: { color: '#ff4444', fontSize: 16, fontWeight: 'bold', marginLeft: 15 },
  loginButton: { marginTop: 16, backgroundColor: '#2E7D32', paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  loginText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});