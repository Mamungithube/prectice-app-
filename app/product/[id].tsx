import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useCart } from '../context/card_content'; 

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number; };
}

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(json => setProduct(json))
            .catch(err => console.error(err));
    }, [id]);

    if (!product) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: 'Product Details' }} />
            <ScrollView>
                <Image source={{ uri: product.image }} style={styles.image} />

                <View style={styles.content}>
                    {/* ১. ক্যাটাগরি উপরে থাকবে */}
                    <Text style={styles.categoryText}>{product.category}</Text>

                    {/* ২. রেটিং সেকশন এখন ক্যাটাগরির ঠিক নিচে (টাইটেলের উপরে) */}
                    <View style={styles.rating}>
                        <View style={styles.rateBadge}>
                            <Text style={styles.rateText}>⭐ {product.rating.rate}</Text>
                        </View>
                        <Text style={styles.countText}>({product.rating.count})</Text>
                    </View>

                    {/* ৩. মেইন টাইটেল */}
                    <Text style={styles.title}>{product.title}</Text>

                    {/* ৪. প্রাইস */}
                    <Text style={styles.price}>${product.price}</Text>

                    {/* ৫. Add to Cart বাটন */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            addToCart(product);
                            alert("সদাই ঘরে যোগ করা হয়েছে!");
                        }}
                    >
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>

                    {/* ৬. ডেসক্রিপশন */}
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    image: { width: '100%', height: 350, resizeMode: 'contain', marginTop: 10 },
    content: { padding: 20 },

    // ক্যাটাগরির জন্য আলাদা স্টাইল (যাতে টাইটেলের সাথে গুলিয়ে না যায়)
    categoryText: { fontSize: 16, color: '#666', fontWeight: '600', textTransform: 'capitalize' },

    title: { fontSize: 22, fontWeight: 'bold', marginTop: 5, color: '#333' },
    price: { fontSize: 24, color: '#0079fa', marginVertical: 10, fontWeight: 'bold' },

    button: { backgroundColor: '#2E7D32', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 15 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

    description: { fontSize: 16, color: '#444', lineHeight: 24 },

    // রেটিং সেকশন এখন বাম পাশে থাকবে (paddingStart সরিয়ে দেওয়া হয়েছে)
    rating: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },

    rateBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFB800', // গোল্ডেন কালার দিলে সুন্দর দেখাবে
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5
    },
    rateText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
    countText: { marginLeft: 8, fontSize: 13, color: '#888' },
});