import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const categoryTypes = [
  {
    id: 'his',
    title: 'History',
    image: require('../../../assets/images/giphy.gif'),
    category: 'history',
    labels: ['ancient', 'events', 'heritage'],
  },
  {
    id: 'foo',
    title: 'Foods',
    image: require('../../../assets/images/Foods.gif'),
    category: 'foods',
    labels: ['cuisine', 'recipes', 'dishes'],
  },
  {
    id: 'Touh',
    title: 'Tourism',
    image: require('../../../assets/images/africa-safari.gif'),
    category: 'tourism',
    labels: ['travel', 'sights', 'adventures'],
  },
  {
    id: 'Touy',
    title: 'Arts',
    image: require('../../../assets/images/Art.gif'),
    category: 'arts',
    labels: ['travel', 'sights', 'adventures'],
  },
  {
    id: 'Nana',
    title: 'Various',
    image: require('../../../assets/images/Various.gif'),
    category: 'arts',
    labels: ['travel', 'sights', 'adventures'],
  },
];

const CategoryScreen = () => {
  const { category } = useLocalSearchParams();
  const router = useRouter();

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.itemContent}>
        <View style={styles.postHeader}>
          <View style={styles.userIcon}>
            <Icon name="person-outline" size={27} />
          </View>
          <View style={styles.userInfo}>
            <TouchableOpacity>
              <Text style={styles.username}>username</Text>
            </TouchableOpacity>
            <Text style={styles.timeAgo}>3 days ago</Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text>
          The Ghana National Mosque is a significant religious and cultural landmark located in Accra, Ghana. This grand mosque stands as one of the largest in West Africa and serves as a central place of worship for the country's Muslim community.
          </Text>
        </View>
        <Image
          source={require('../../../assets/images/GHANAMOSQUE.webp')}
          style={styles.postImage}
        />
        <View style={styles.footer}>
          <View style={styles.footerIcons}>
            <TouchableOpacity>
              <View style={styles.iconWithText}>
                <Icon name="heart-outline" size={27} />
                <Text style={styles.iconText}>Likes</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.iconWithText}>
                <Icon name="chatbubble-outline" size={27} />
                <Text style={styles.iconText}>Comments</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.iconWithText}>
                <Icon name="share-social-outline" size={27} />
                <Text style={styles.iconText}>Share</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff', marginTop: Platform.OS === 'android' ? '10%' : 'none'}}>
      <View>
        <TouchableOpacity onPress={() => router.back()}  style={{flexDirection: 'row'}}>
          <Icon name="arrow-back-outline" size={20} style={{marginTop: 20,}} />
        <Text style={styles.headerTitle}>{category}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categoryTypes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 15,
    marginLeft: 7,
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: Platform.OS === 'ios' ? 20 : 10,
  },
  userIcon: {
    width: 35,
    height: 35,
    borderRadius: 70,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  searchButton: {
    padding: 10,
    borderRadius: 40,
    marginLeft: 5,
  },
  searchIcon: {
    color: '#000',
  },
  categoriesTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 15,
    marginTop: 15,
  },
  cardsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  categoryCard: {
    marginHorizontal: 10,
    width: 250,
    height: 400,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontWeight: '800',
    color: 'white',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  list: {
    paddingBottom: 20,
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemContent: {
    padding: 15,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeAgo: {
    fontSize: 12,
    color: '#9c9c9c',
  },
  body: {
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
  },
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#000',
  },
});

export default CategoryScreen;
