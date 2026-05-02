import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; 

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home Screen',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="api-test"
        options={{
          title: 'Product Data',
          tabBarIcon: ({ color }) => <FontAwesome name="list" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <FontAwesome name="shopping-cart" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
