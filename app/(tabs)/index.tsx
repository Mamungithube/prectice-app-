import React from 'react';
import { 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  View, 
  Image, 
  FlatList, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';

// ১. টাইপস্ক্রিপ্ট ইন্টারফেস (ডাটার নকশা)
interface CardItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

// ২. ডাটা (এই ডাটাটি CardItem টাইপ মেনে চলবে)
const DATA: CardItem[] = [
  {
    id: 1,
    title: "Mamun's First Card",
    description: "React Native এ map এর চেয়ে FlatList ব্যবহার করা বেশি পারফরম্যান্ট।",
    image: 'https://picsum.photos/400/200'
  },
  {
    id: 2,
    title: "The Lonely Elephant",
    description: "সুন্দর একটি হাতি এবং সূর্যাস্তের ছবি। এটি আমাদের দ্বিতীয় কার্ড।",
    image: 'https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg'
  },
  {
    id: 3,
    title: "Nature View",
    description: "প্রকৃতির সৌন্দর্য আমাদের মনকে শান্ত করে। এটি ৩ নম্বর কার্ড।",
    image: 'https://picsum.photos/400/201'
  },
  {
    id: 4,
    title: "City Life",
    description: "শহরের ব্যস্ত জীবন এবং যান্ত্রিকতা নিয়ে এই কার্ডটি তৈরি।",
    image: 'https://picsum.photos/400/202'
  },
];

export default function HomeScreen() {
  
  // renderItem ফাংশন যা প্রতিটি কার্ড তৈরি করবে
  const renderCard = ({ item }: { item: CardItem }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.idBadge}>ID: {item.id}</Text>
        <Text numberOfLines={1} style={styles.titleText}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.bodyText}>{item.description}</Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} 
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
  },
  listContent: {
    padding: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardBody: {
    padding: 12,
  },
  idBadge: {
    fontSize: 10,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  bodyText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});