import { Tabs } from 'expo-router';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="home-outline" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="chatbox-ellipses-outline" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="buy"
        options={{
          title: 'Buy',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="basket-outline" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          title: 'sell',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="pricetags-outline" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Icon name="person-outline" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
