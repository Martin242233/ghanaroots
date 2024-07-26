import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { router } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons';


const BuyScreen = () => {
  const suggestedItems = [
    { id: '1', image: 'https://via.placeholder.com/150', label: 'XS SGD 15' },
    { id: '2', image: 'https://via.placeholder.com/150', label: 'S SGD 18' },
    { id: '3', image: 'https://via.placeholder.com/150', label: 'S SGD 18' },
    { id: '4', image: 'https://via.placeholder.com/150', label: 'S SGD 18' },
    { id: '5', image: 'https://via.placeholder.com/150', label: 'S SGD 18' },
    // Add more items here
  ];

  const sellersToWatch = [
    { id: '1', image: 'https://via.placeholder.com/300x200', label: 'Top Sellers' },
    { id: '2', image: 'https://via.placeholder.com/300x200', label: 'Shop for Men' },
    { id: '3', image: 'https://via.placeholder.com/300x200', label: 'Shop for Men' },
    { id: '4', image: 'https://via.placeholder.com/300x200', label: 'Shop for Men' },
    { id: '5', image: 'https://via.placeholder.com/300x200', label: 'Shop for Men' },
    // Add more items here
  ];

  const bookItems = [   
    { id: '1', image: require('../../assets/images/tourismPng.png'), desc: 'Item 1', userName: 'Tristan Blocus ', price: '50' },
    { id: '2', image: require('../../assets/images/tourismPng.png'), desc: 'Item 1', userName: 'Alice Johnson ', price: '50' },
    { id: '3', image: require('../../assets/images/tourismPng.png'), desc: 'Item 3', userName: 'Bob Smith', price: '50' },
    { id: '4', image: require('../../assets/images/languages.png'), desc: 'Item 4', userName: 'Charlie Brown', price: '50' },
    { id: '5', image: require('../../assets/images/tourismPng.png'), desc: 'Item 5', userName: 'Ethan Hunt', price: '50' },
    { id: '6', image: require('../../assets/images/languages.png'), desc: 'Item 6', userName: 'Diana Prince' },
    { id: '7', image: require('../../assets/images/tourismPng.png'), desc: 'Item 7', userName: 'Fiona Glenanne', price: '50' },
    { id: '2', image: require('../../assets/images/languages.png'), desc: 'Item 2', userName: 'George Weasley', price: '50' },
    { id: '8', image: require('../../assets/images/languages.png'), desc: 'Item 8', userName: 'Hannah Abbott', price: '50' },
  ];

  const renderSuggestedItem = ({ item }) => (
    <View style={styles.suggestedItem}>
      <Image style={styles.suggestedImage} source={{ uri: item.image }} />
      <Text style={styles.suggestedLabel}>{item.label}</Text>
    </View>
  );

  const renderSellerItem = ({ item }) => (
    <View style={styles.sellerItem}>
          <View style={{
            width: 175,
            height: 175,
            borderRadius: 100,
            borderWidth: 0.5,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 10,
           marginRight: 8,
          }}>
          <Icon name="person-outline" size={150} />
          </View>
          <Text style={styles.sellerLabel}>{item.label}</Text>
    </View>
  );

  const renderBookItems = ({ item }) => (
    <TouchableOpacity
      style={{ marginBottom: '5%'}}
      onPress={
        ()=>{
          router.push({
            pathname: 'single_item_detail/[item_details]',
            params: {
              user_name: item.userName,
              item_id: '',
              item_desc: item.desc,
              item_price: item.price
            }
          })
        }
      }
    >

    <View style={styles.singleGridItems}>
      {/* Check source, use uri only if the source is coming from the web */}
      <Image style={styles.suggestedImage} source={ item.image } /> 
      <Text style={styles.suggestedLabel}>{item.desc}</Text>
      <Text style={styles.suggestedLabel}>{item.price} GHS</Text>
    </View>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.logo}>Buy</Text>
      </View>
      <View style={{justifyContent: 'space-between', flexDirection: 'row',}}>
      <Text style={styles.sectionTitle}>Suggested for you</Text>
      <TouchableOpacity style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={suggestedItems}
        renderItem={renderSuggestedItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>SELLERS TO WATCH</Text>
      <FlatList
        horizontal
        data={sellersToWatch}
        renderItem={renderSellerItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />

      <View  style={{justifyContent: 'space-between', flexDirection: 'row',}}>
        
      <Text style={styles.sectionTitle}>FRESH FROM TODAY</Text>
      <TouchableOpacity style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>

      </View>


      
     </View>
  );

  return (
    <SafeAreaView style={{backgroundColor: 'white', minHeight: '100%', marginTop: Platform.OS === 'android'? '10%' : 'none'}}>
      <FlatList
        style={styles.container}
        data={bookItems}
        renderItem={renderBookItems}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  columnWrapper: {
    flexWrap: 'wrap'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f00',
  },
  cartButton: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 7,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  seeAllButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  seeAllText: {
    color: '#f00',
    fontSize: 16,
  },
  suggestedItem: {
    marginRight: 10,
  },
  singleGridItems: {
    marginTop: 20,
    marginRight: 2,
    width: '30%',
    paddingLeft: 10,
    marginBottom: 40,
  },
  suggestedImage: {
    width: 118,
    height: 125,
    borderRadius: 5,
  },
  suggestedLabel: {
    marginLeft: 10,
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
    width: 100
  },
  sellerItem: {
    marginRight: 10,
  },
  sellerImage: {
    width: 200,
    height: 200,
    borderRadius: 500,
  },
  sellerLabel: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});

export default BuyScreen;
