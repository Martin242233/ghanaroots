import React, { useState, useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter, useLocalSearchParams} from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getCurrentUser, signUserOut, fetchUserData } from '../../lib/firebaseConfig';
import { useGlobalContext } from "../../context/GlobalProvider";

const categoryTypes = [
  {
    id: 'his',
    title: 'History',
    image: require('../../assets/images/Akan-Elder.jpg'),
    category: 'history',
    labels: ['ancient', 'events', 'heritage'],
  },
  {
    id: 'foo',
    title: 'Foods',
    image: require('../../assets/images/ampesi-and-kontomire-food-1.jpg'),
    category: 'foods',
    labels: ['cuisine', 'recipes', 'dishes'],
  },

  {
    id: 'Touh',
    title: 'Tourism',
    image: require('../../assets/images/independance-place.jpg'),
    category: 'tourism',
    labels: ['travel', 'sights', 'adventures'],
  },

  {
    id: 'Touy',
    title: 'Arts',
    image: require('../../assets/images/Asante-gold-weights.png'),
    category: 'arts',
    labels: ['travel', 'sights', 'adventures'],
  },

  
  {
    id: 'Nana',
    title: 'Various',
    image: require('../../assets/images/Various.gif'),
    category: 'arts',
    labels: ['travel', 'sights', 'adventures'],
  },
];

const Index = () => {
  const { 
    isAuth, 
    setIsAuth, 
    setIsUser, 
    isUser, 
    setUser, 
    user,
  } = useGlobalContext();
  const router = useRouter();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { item_desc, item_id, item_image_url } = useLocalSearchParams();
  const navigation = useNavigation();
  const { newItem } = useLocalSearchParams(); // Retrieve new item data


  const [category , setCategory] = useState(null);
  const categoryValue = [ 
    {label: "history", value: "history", key: "history"}, 
    {label: "foods", value: "foods", key: "foods"},
    {label: "tourism", value: "tourism", key: "tourism"},
    {label: "arts", value: "arts", key: "arts"},
    {label: "various", value: "various", key: "various"},

]




    // Define an array of event IDs to remove
    const eventsToRemove = ['TabEDDJaDSJwxat8oc', 'MdkUbaRKygPTp47q2T', 'wKHUsK8piAWHdMUhhr'];

   // Unsplash API access key
   const UNSPLASH_ACCESS_KEY = 'H6LKLB3cfSxkdSporkNe-DhHleAXnvJqB_F8-astRec';

   // Function to fetch images from Unsplash based on a search query
   const fetchImagesFromUnsplash = async (query) => {
       try {
           const response = await axios.get('https://api.unsplash.com/search/photos', {
               params: {
                   query,
                   client_id: UNSPLASH_ACCESS_KEY,
                   per_page: 1,
               },
           });
           return response.data.results.length > 0 ? response.data.results[0].urls.small : 'https://via.placeholder.com/184x139';
       } catch (error) {
           console.error('Error fetching images from Unsplash:', error);
           return 'https://via.placeholder.com/184x139';
       }
   };



  const fetchEvents = async () => {
    try {
        const response = await axios.get(
            "https://api.predicthq.com/v1/saved-locations/xBcod9tmnJwPZJjVYObWfw/insights/events?country=Gh&lim",
            {
                headers: {
                    "Authorization": "Bearer N8z9jcI1h8f17Ijj_sdOkUCaQm_Azs1CuzSEAS2V",
                    "Accept": "application/json"
                },
                params: {
                    country: 'Gh',
                    limit: 50,
                }
            }
        );

        console.log('API response:', response);

        // Process the events data
        const eventsData = await Promise.all(response.data.results.map(async event => {
            const imageUrl = await fetchImagesFromUnsplash(event.title);
            const address = event.entities && event.entities.length > 0 
                ? event.entities[0].formatted_address 
                : 'Address not available';
            return {
                id: event.id,
                title: event.title.length > 20 ? event.title.substring(0,20)  : event.title,
                start: new Date(event.start).toDateString(),
                thumbnail: imageUrl,
                description: event.description,
                link: event.link,
                tags: event.tags,
                category: event.category,
                local_rank: event.local_rank || Math.random() * 100,
                address,
            };
        }));


        console.log('Events:', eventsData); // Log events data
        setEvents(eventsData);
        setFilteredEvents(eventsData); // Initially, show all events
    } catch (error) {
        console.error('Error fetching events:', error);
        Alert.alert('Error', 'Failed to fetch events');
    } finally {
        setLoading(false);
    }
};

 // Fetch events on component mount
 useEffect(() => {
  if(!isAuth){
    setTimeout(() => {
      setIsAuth(false);
      signUserOut();
      // signOutAppWrite();
      setIsUser(null);
      router.replace('signIn');
      setLoading(false);
    }, 0);
}else{
  
  const load = async () => {
    try {
      if(isUser){
        setLoading(true);
        const user = await fetchUserData(isUser.uid);
        console.log(user);
        setUser(user);
        setLoading(false);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  load();
  
}
  fetchEvents();
}, []);
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  } else {
    return text;
  }
};



  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.logo}>GhanaRoots</Text>
        <View style={styles.userIcon}>
          <Icon name="person-outline" size={27} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9c9c9c"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search-outline" size={20} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.categoriesTitle}>UpComing Events in Ghana</Text>

      <ScrollView
        horizontal
        contentContainerStyle={styles.cardsContainer}
        showsHorizontalScrollIndicator={false}
      >
        {filteredEvents.map((event) => (
          <>
          <View style={{flexDirection: 'column'}}>
          <TouchableOpacity
            key={event.id}
            onPress={() =>
              router.push({
                pathname: 'eventdetail/[eventdetail]',
                params: {  eventId: event.id },
              })
            }
            style={styles.categoryCard}
          >
          <ImageBackground source={event.thumbnail ? {uri: event.thumbnail } : Image} style={styles.categoryImage} />
          </TouchableOpacity>
          <Text style={styles.categoryText1} numberOfLines={1} ellipsizeMode="tail" >{truncateText(event.title)}</Text>
          </View>

          </>
        ))}
        
      </ScrollView>

      <Text style={styles.categoriesTitle}>Categories</Text>

      <ScrollView
        horizontal
        contentContainerStyle={styles.cardsContainer}
        showsHorizontalScrollIndicator={false}
      >
        {categoryTypes.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.push({
                pathname: 'category/[categoryScreen]',
                params: { category: item.category, labels: item.labels },
              })
            }
            style={styles.categoryCard}
          >
            <ImageBackground
              style={styles.categoryImage}
              resizeMode="cover"
              source={item.image}
            >
              <Text style={styles.categoryText}>{item.title}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );


   // Ensure new item gets added to items state
   useEffect(() => {
    if (newItem) {
      const parsedNewItem = JSON.parse(newItem);
      setItems((prevItems) => [parsedNewItem, ...prevItems]);
    }
  }, [newItem]);

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.itemContent}>
        <View style={styles.postHeader}>
          <View style={styles.userIcon}>
            <Icon name="person-outline" size={27} />
          </View>
          <View style={styles.userInfo}>
            <TouchableOpacity  onPress={() =>
              router.push({
                pathname: 'profile/[profile]',
                params: {
                  user_name: 'Testing user',
                  user_id: 'Testing user id'
                },
              })
            }>
              <Text style={styles.username}>username</Text>
            </TouchableOpacity>
            <Text style={styles.timeAgo}>3 days ago</Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text>
          {item.description}
          </Text>
        </View>
        <Image
          source={require('../../assets/images/tourismPng.png')}
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
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={categoryTypes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    height: 200,
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
  categoryText1: {
    fontWeight: '800',
    color: 'black',
    fontSize: 13,
    marginLeft: 40,
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

export default Index;
