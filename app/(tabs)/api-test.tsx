import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    ActivityIndicator,
    FlatList,
    TouchableOpacity
} from 'react-native';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const json: Product[] = await response.json();
            setProducts(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <Link href={{ pathname: '/product/[id]', params: { id: item.id.toString() } }} asChild>
                        <TouchableOpacity style={styles.productCard}>
                            <Image source={{ uri: item.image }} style={styles.productImage} />

                            <View style={styles.info}>
                                <View style={styles.ratingContainer}>
                                    <View style={styles.rateBadge}>
                                        <FontAwesome name="star" size={12} color="#fff" />
                                        <Text style={styles.rateText}>{item.rating.rate}</Text>
                                    </View>
                                    <Text style={styles.countText}>({item.rating.count})</Text>
                                </View>
                                <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                                <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
                                <Text style={styles.price}>${item.price}</Text>
                                <TouchableOpacity style={styles.detailsButton}>
                                    <Text style={styles.detailsButtonText}>View Details</Text>
                                    <FontAwesome name="arrow-right" size={12} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 10,
    },
    productCard: {
        flex: 1,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
        elevation: 2,
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        backgroundColor: '#fff',
        marginTop: 10,
    },
    info: {
        padding: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        gap: 5,
    },
    rateBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e9b020',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        gap: 3,
    },
    rateText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    countText: {
        fontSize: 12,
        color: '#888',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    price: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
    },
    detailsButton: {
        flexDirection: 'row',       // টেক্সট এবং আইকন পাশাপাশি রাখার জন্য
        alignItems: 'center',       // লম্বালম্বিভাবে মাঝখানে রাখবে
        justifyContent: 'center',    // আড়াআড়িভাবে মাঝখানে রাখবে
        backgroundColor: '#007AFF', // প্রফেশনাল ব্লু কালার
        paddingVertical: 10,        // উপরে-নিচে জায়গা
        paddingHorizontal: 15,      // ডানে-বামে জায়গা
        borderRadius: 8,            // কোণাগুলো রাউন্ড করার জন্য
        marginTop: 10,              // উপরের এলিমেন্ট থেকে দূরত্ব
        gap: 8,                     // টেক্সট এবং আইকনের মাঝে দূরত্ব
        elevation: 3,               // অ্যান্ড্রয়েডে হালকা শ্যাডো
        shadowColor: '#000',        // আইওএস শ্যাডো
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    detailsButtonText: {
        color: '#fff',              // টেক্সটের রঙ সাদা
        fontSize: 14,
        fontWeight: '600',          // একটু বোল্ড বা মোটা দেখাবে
        textAlign: 'center',
    },
});