import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import {useLocalSearchParams } from 'expo-router';






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


const ProfileScreen = () => {
  
const { user_name, user_id } = useLocalSearchParams();

  const posts = [
    { id: '1', userName: 'User 1', content: 'This is the first post.' },
    { id: '2', userName: 'User 2', content: 'This is the second post.' },
    { id: '3', userName: 'User 3', content: 'This is the third post.' },
    { id: '4', userName: 'User 3', content: 'This is the third post.' },
    { id: '5', userName: 'User 3', content: 'This is the third post.' },
    { id: '6', userName: 'User 3', content: 'This is the third post.' },
    { id: '7', userName: 'User 3', content: 'This is the third post.' },
    { id: '8', userName: 'User 3', content: 'This is the third post.' },
    { id: '9', userName: 'User 3', content: 'This is the third post.' },
    { id: '10', userName: 'User 3', content: 'This is the third post.' },
  ];

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </View>
        <Image
          source={require('../../../assets/images/tourismPng.png')}
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

  const headerItem = () =>(
    <View style={styles.container}>
      <View style={styles.header}>

        <View style={{

          
          marginLeft: 147,
          borderRadius: 50,
         }}> 
<View style={{
  marginLeft: 5,
  borderWidth: 0.4,
  borderRadius: 100,
  height: 95,
  width: 95,
  }}>
<Icon name="person-outline" size={80} style={{
  marginLeft: 6,
  marginTop: 2.5,
  }} />
</View>
<Text style={styles.userName}>{user_name}</Text>
<View style={{width: '100%',
    

}}>

</View>

        </View>
        
      </View>
      <Text style={styles.bio}>
          Hi There! This is me, Ahmed Adel, the designer of this UI. I hope you like it.
</Text>
<View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.messageButton} onPress={()=>{router.push({pathname: 'chat_individual/[chat_screen]', params: {user_name: user_name, user_id: user_id}})}}>
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
    </View>
      <View style={styles.tabs}>
          <Text style={styles.tabText}>Posts</Text>
        </View>
    </View>
  )

  return (
    <SafeAreaView style={{backgroundColor: 'white', minHeight: '100%', marginTop: Platform.OS === 'android'? '10%' : 'none'}}>
      
      <View style={styles.header}>
      <Icon name="arrow-back-outline" size={30}  onPress={() => router.back()}  style={{flexDirection: 'row'}} />

        <Text style={styles.profileText}>Profile</Text>

      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        ListHeaderComponent={headerItem}
        keyExtractor={item => item.id}
        style={styles.feed}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 143,
  },


  messageButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  bio: { 
    color: '#666',
    fontSize: 14,
    textAlign: 'start',
    marginLeft: 40,
    marginRight: 40,
  },

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImageLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabText: {
    color: '#000',
    fontSize: 16,
    paddingBottom: 10,
  },
  menuButton: {
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 10,
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 169,
  },
  publishButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  publishText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 16,
    textAlign: 'center'
  },
  feed: {
    flex: 1,
  },
  postContainer: {
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%'
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 16,
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

export default ProfileScreen;
