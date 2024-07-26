import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image, Platform, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';


const UploadItemScreen = () => {
  const { item_desc, item_id, item_title, item_price } = useLocalSearchParams();
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState("");
  const [description, setDescription] = useState(item_desc || '');
  const [title, setTitle] = useState(item_title || '');
  const [quantity, setQuantity] = useState(item_id || '');
  const [price, setPrice] = useState(item_price || '');

  const [category , setCategory] = useState(null);
  const categoryValue = [ 
    
    {label: "history", value: "history", key: "history"}, 
    {label: "foods", value: "foods", key: "foods"},
    {label: "tourism", value: "tourism", key: "tourism"},
    {label: "arts", value: "arts", key: "arts"},
    {label: "various", value: "various", key: "various"},

]

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  //Cancel upload item
  const handleSellItem = () => {
    console.log('Cancelling');
    setSelectedImage('')
    setDescription('');
    setTitle('');
    setQuantity('');
    setPrice('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff', marginTop: Platform.OS === 'android' ? '10%' : 'none' }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Upload Your Posts here!</Text>
          
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Description</Text>
              <TextInput
                style={styles.input1}
                placeholder="Enter item description"
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category</Text>
            <RNPickerSelect
                style={pickerSelectStyles}
                placeholder={{ label: "Category", value: null }}
                placeholderTextColor="#000"
                onValueChange={(category) => setCategory(category)}
                items={categoryValue}
                key={categoryValue.key}
            />
          </View>

          <View style={styles.verifyContainer}>
            <Text style={styles.verifyTitle}>Confirmation of upload</Text>
            <Text style={styles.verifyText}>Your item will be published. Go to "Home" on the Profile screen, click on "My items" to manage your store</Text>
          </View>

          <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
            <Text style={styles.imagePickerButtonText}>Pick an image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={() => { 
            console.log(selectedImage);
            router.push({ pathname: 'recapPost/[recappost]', params: { item_desc: description, item_id: quantity, item_title: title, item_price: price, item_image_url: selectedImage } }) }}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleSellItem}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
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
    marginLeft: 27,
    marginTop: 60,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePickerButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 7,
  },
  detailRow: {
    marginBottom: 10,
  },
  
  detailRow1: {
    marginBottom: 10,
  },
  detailLabel: {
    color: '#777',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#F9F9F9',
  },
  input1: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#F9F9F9',
    height: 60,
  },
  amountContainer: {
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
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
  confirmButton: {
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
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      backgroundColor: '#F9F9F9',
    },
    inputAndroid: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
      backgroundColor: '#F9F9F9',
    },
  });
export default UploadItemScreen;
