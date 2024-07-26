import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

const itemDetailScreen = ({ navigation }) => {
  const { user_name, item_desc, item_price } = useLocalSearchParams();
  const book = {
    image: 'https://via.placeholder.com/150', // Replace with the actual image URL
    title: item_desc,
    author: 'Brianna Wiest',
    price: item_price || '50',
    originalPrice: 109.00,
    released: 2021,
    part: 16,
    pages: 340,
    synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus vitae egestas malesuada quam ultricies. Diam euismod enim, etiam lacinia Lorem ipsum dolor sit amet.',
  };

  return (
    <ScrollView style={styles.container}>      
      <Image source={{ uri: book.image }} style={styles.bookImage} />
      <Text style={styles.discountText}>-45%</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>★</Text>
        <Text style={styles.ratingText}>12</Text>
      </View>
      <Text style={styles.bookTitle}>{book.title}</Text>
      <Text style={styles.bookAuthor}>Author : {user_name}</Text>
      <View style={styles.bookInfoContainer}>
        <View style={styles.bookInfoItem}>
          <Text style={styles.bookInfoLabel}>Released</Text>
          <Text style={styles.bookInfoValue}>{book.released}</Text>
        </View>
        <View style={styles.bookInfoItem}>
          <Text style={styles.bookInfoLabel}>Part</Text>
          <Text style={styles.bookInfoValue}>{book.part}</Text>
        </View>
        <View style={styles.bookInfoItem}>
          <Text style={styles.bookInfoLabel}>Pages</Text>
          <Text style={styles.bookInfoValue}>{book.pages}</Text>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Text style={styles.tabItem}>Synopsis</Text>
        <Text style={styles.tabItem}>Details</Text>
        <Text style={styles.tabItem}>Author</Text>
        <Text style={styles.tabItem}>Review</Text>
      </View>
      <Text style={styles.synopsisText}>{book.synopsis}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.originalPrice}>GHS{book.originalPrice}</Text>
        <Text style={styles.discountedPrice}>GHS{book.price}</Text>
      </View>
      <TouchableOpacity style={styles.addToBagButton} onPress={()=>{
        router.push({
          pathname: 'chat_individual/[chat_screen]', 
          params: {
            user_name: user_name
          }
        })
      }}
      >
        <Text style={styles.addToBagButtonText}>Chat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  bookmarkButtonText: {
    fontSize: 24,
    color: '#000',
  },
  bookImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
  discountText: {
    position: 'absolute',
    top: 180,
    right: 20,
    fontSize: 18,
    color: '#000',
  },
  ratingContainer: {
    position: 'absolute',
    top: 250,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 5,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  bookInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  bookInfoItem: {
    alignItems: 'center',
  },
  bookInfoLabel: {
    fontSize: 14,
    color: '#666',
  },
  bookInfoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabItem: {
    paddingVertical: 10,
    fontSize: 16,
    color: '#666',
  },
  synopsisText: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  originalPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountedPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f00',
  },
  addToBagButton: {
    marginTop: 20,
    marginBottom: 60,
    paddingVertical: 15,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
  },
  addToBagButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default itemDetailScreen;
