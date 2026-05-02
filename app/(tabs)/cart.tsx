import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView, Modal, TextInput, ScrollView } from 'react-native';
import { useCart } from '../context/card_content'; // পাথটি আপনার ফোল্ডার অনুযায়ী চেক করে নিন
import { Stack } from 'expo-router';

export default function CartScreen() {
    // updateQuantity এবং clearCart ফাংশনগুলো Context এ থাকতে হবে
    const { cart, removeFromCart, totalPrice, updateQuantity } = useCart();
    
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState({ name: '', address: '', phone: '' });

    const handleOrderSubmit = () => {
        if (!userData.name || !userData.address || !userData.phone) {
            alert("অনুগ্রহ করে সব তথ্য দিন");
            return;
        }
        alert(`ধন্যবাদ ${userData.name}! আপনার অর্ডারটি গ্রহণ করা হয়েছে।`);
        setModalVisible(false);
        // এখানে আপনার ব্যাকএন্ড এপিআই কল করতে পারেন
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                
                {/* ১. Quantity Control বাটনসমূহ */}
                <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                        onPress={() => updateQuantity(item.id, 'decrease')} 
                        style={styles.qtyBtn}>
                        <Text style={styles.qtyText}>-</Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.qtyNumber}>{item.quantity}</Text>
                    
                    <TouchableOpacity 
                        onPress={() => updateQuantity(item.id, 'increase')} 
                        style={styles.qtyBtn}>
                        <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                <Text style={styles.removeText}>মুছুন</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: 'আপনার ঝুড়ি' }} />

            {cart.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>আপনার ঝুড়ি খালি!</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ padding: 15 }}
                    />

                    <View style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>মোট বিল:</Text>
                            <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
                        </View>
                        {/* অর্ডার কনফার্ম বাটনে ক্লিক করলে মডেল ওপেন হবে */}
                        <TouchableOpacity 
                            style={styles.checkoutBtn} 
                            onPress={() => setModalVisible(true)}>
                            <Text style={styles.checkoutText}>অর্ডার কনফার্ম করুন</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {/* ২. Checkout Form Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent={false}>
                <SafeAreaView style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={{ padding: 20 }}>
                        <Text style={styles.modalTitle}>অর্ডার সম্পন্ন করুন</Text>
                        
                        <Text style={styles.label}>আপনার নাম</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="উদা: আব্দুল করিম"
                            onChangeText={(text) => setUserData({...userData, name: text})}
                        />

                        <Text style={styles.label}>ফোন নম্বর</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="উদা: 017XXXXXXXX"
                            keyboardType="phone-pad"
                            onChangeText={(text) => setUserData({...userData, phone: text})}
                        />

                        <Text style={styles.label}>ঠিকানা</Text>
                        <TextInput 
                            style={[styles.input, { height: 100 }]} 
                            placeholder="আপনার পূর্ণ ঠিকানা দিন"
                            multiline
                            onChangeText={(text) => setUserData({...userData, address: text})}
                        />

                        <TouchableOpacity style={styles.confirmBtn} onPress={handleOrderSubmit}>
                            <Text style={styles.confirmBtnText}>অর্ডার নিশ্চিত করুন</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.closeBtn} 
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeBtnText}>ফিরে যান</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9' },
    cartItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 10, alignItems: 'center', elevation: 2 },
    itemImage: { width: 70, height: 70, borderRadius: 5, resizeMode: 'contain' },
    itemDetails: { flex: 1, marginLeft: 15 },
    itemTitle: { fontSize: 16, fontWeight: 'bold' },
    itemPrice: { color: '#2E7D32', fontSize: 15, fontWeight: '600' },
    quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    qtyBtn: { backgroundColor: '#eee', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
    qtyText: { fontSize: 18, fontWeight: 'bold' },
    qtyNumber: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' },
    removeBtn: { padding: 8 },
    removeText: { color: '#ff4444', fontWeight: 'bold' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 18, color: '#888' },
    footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    totalLabel: { fontSize: 18, fontWeight: 'bold' },
    totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#2E7D32' },
    checkoutBtn: { backgroundColor: '#2E7D32', padding: 15, borderRadius: 10, alignItems: 'center' },
    checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    // Modal Styles
    modalContainer: { flex: 1, backgroundColor: '#fff' },
    modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#2E7D32', textAlign: 'center' },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 5, color: '#333' },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
    confirmBtn: { backgroundColor: '#2E7D32', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    confirmBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    closeBtn: { marginTop: 15, alignItems: 'center' },
    closeBtnText: { color: '#ff4444', fontSize: 16 }
});