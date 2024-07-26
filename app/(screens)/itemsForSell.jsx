import React, { useEffect } from 'react';
import { View, Alert, StatusBar, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
    const navigation = useNavigation();

  const cartItems = [
    { id: '1', name: 'Red Bell Pepper', quantity: 2, price: 3.87, image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Broccoli Crown', quantity: 1, price: 1.82, image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Tomato', quantity: 1, price: 0.73, image: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Carrot', quantity: 2, price: 1.33, image: 'https://via.placeholder.com/150' },
    { id: '5', name: 'Banana', quantity: 2, price: 0.75, image: 'https://via.placeholder.com/150' },
    { id: '6', name: 'Banana', quantity: 2, price: 0.75, image: 'https://via.placeholder.com/150' },
    { id: '7', name: 'Banana', quantity: 2, price: 0.75, image: 'https://via.placeholder.com/150' },
    { id: '8', name: 'Banana', quantity: 2, price: 0.75, image: 'https://via.placeholder.com/150' },
    { id: '9', name: 'Banana', quantity: 2, price: 0.75, image: 'https://via.placeholder.com/150' },
    { id: '10', name: 'Banana', quantity: 2, price: 0.75, image: 'https://via.placeholder.com/150' },
    { id: '11', name: 'Banana', quantity: 2, price: 0.75, image: 'https://via.placeholder.com/150' },
    { id: '12', name: 'Banana', quantity: 2, price: 0.75, image: 'https://via.placeholder.com/150' },
    { id: '13', name: 'Banana', quantity: 2, price: 0.75, image: 'https://via.placeholder.com/150' },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon
              name='angle-left'
              type='font-awesome'
              size={30}
              color='black'
            />
          </TouchableOpacity>
          <View
            style={{
              paddingLeft: 10,
              justifyContent: 'center',
              backgroundColor: 'white'
            }}
          >
            <Text style={{ color: '#000', fontWeight: '700', fontSize: 18 }}>
              Back
            </Text>
          </View>
        </View>
      ),
    });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity style={styles.actionButton} onPress={()=>removeItem(item.id)}>
          <Text style={styles.actionButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  //Remove items from my items list
  const removeItem = (item_id) =>{
        Alert.alert('Remove item', 'Do you want to remove this item?', [
            {
              text: 'OK',
              onPress: () => console.log(`Removing ${item_id}`),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <StatusBar barStyle={'dark-content'}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingRight: 10,
  },
  storeInfo: {
    flex: 1,
    alignItems: 'center',
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deliveryInfo: {
    color: 'green',
    marginTop: 5,
  },
  freeDelivery: {
    color: 'purple',
    marginTop: 5,
  },
  totalAmount: {
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    color: '#777',
    marginTop: 5,
  },
  itemPrice: {
    color: '#777',
    marginTop: 5,
  },
  itemActions: {
    alignItems: 'flex-end',
  },
  actionButton: {
    marginVertical: 5,
  },
  actionButtonText: {
    color: 'blue',
  },
  checkoutButton: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerLeft: {
    paddingVertical: 0,
    paddingRight: 5,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white'
  },
});

export default CartScreen;
