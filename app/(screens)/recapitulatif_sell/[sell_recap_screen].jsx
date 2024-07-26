import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const CheckoutScreen = () => {
  const { item_desc, item_id, item_title, item_price, item_image_url, item_image } = useLocalSearchParams();
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  useEffect(() => {
    console.log('test',item_image_url)
    setImage(item_image_url)
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff', marginTop: Platform.OS === 'android' ? 0 : 'none' }}>
      <ScrollView>

      <View style={styles.container}>
        <View style={styles.backButton}>
          <Text style={styles.title}>Confirm sell</Text>
        </View>
        {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Description</Text>
            <Text style={styles.detailValue}>{item_desc}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Title</Text>
            <Text style={styles.detailValue}>{item_title}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quantity</Text>
            <Text style={styles.detailValue}>{item_id}</Text>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.totalLabel}>Total amount</Text>
          <Text style={styles.totalValue}>${item_price}</Text>
        </View>
        <View style={styles.verifyContainer}>
          <Text style={styles.verifyTitle}>Confirmation of upload</Text>
          <Text style={styles.verifyText}>Your item will be published. Go to "Menu" on the Profile screen, click on "My items" to manage your store</Text>
        </View>
        <TouchableOpacity style={styles.payLaterButton} onPress={() => { /* Handle pay later action */ }}>
          <Text style={styles.payLaterButtonText}>Pay later</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => { /* Handle cancel action */ }}>
          <Text style={styles.payLaterButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    color: '#777',
  },
  detailValue: {
    fontWeight: 'bold',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  verifyContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
  },
  verifyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  verifyText: {
    color: '#777',
  },
  payLaterButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  payLaterButtonText: {
    color: '#fff',
    fontSize: 16,
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

export default CheckoutScreen;
