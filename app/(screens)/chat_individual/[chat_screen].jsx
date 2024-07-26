import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  FlatList,
  Dimensions,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { Icon } from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
const chatScreen = () => {
  const { user_name } = useLocalSearchParams();
  const navigation = useNavigation();
  
  // Initiate chat user 
  const [chatUser] = useState({
    name: user_name,
    profile_image: 'https://randomuser.me/api/portraits/men/0.jpg',
    last_seen: 'online',
  });

  const [currentUser] = useState({
    name: 'John Doe',
  });

  const [messages, setMessages] = useState([
    { sender: 'John Doe', message: 'Hey there!', time: '6:01 PM' },
    {
      sender: 'Robert Henry',
      message: 'Hello, how are you doing?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: 'I am good, how about you?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: `😊😇`,
      time: '6:02 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Can't wait to meet you.`,
      time: '6:03 PM',
    },
    {
      sender: 'John Doe',
      message: `That's great, when are you coming?`,
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: `This weekend.`,
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Around 4 to 6 PM.`,
      time: '6:04 PM',
    },
    {
      sender: 'John Doe',
      message: `Great, don't forget to bring me some mangoes.`,
      time: '6:05 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Sure!`,
      time: '6:05 PM',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');

  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function sendMessage() {
    if (inputMessage === '') {
      return setInputMessage('');
    }
    let t = getTime(new Date());
    setMessages([
      ...messages,
      {
        sender: currentUser.name,
        message: inputMessage,
        time: t,
      },
    ]);
    setInputMessage('');
  }

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
          <Image
            style={styles.userProfileImage}
            source={{ uri: chatUser.profile_image }}
          />
          <View
            style={{
              paddingLeft: 10,
              justifyContent: 'center',
              backgroundColor: 'white'
            }}
          >
            <Text style={{ color: '#000', fontWeight: '700', fontSize: 18 }}>
              {chatUser.name}
            </Text>
            <Text style={{ color: '#000', fontWeight: '300' }}>
              {chatUser.last_seen}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>


        </View>
      ),
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <FlatList
          style={{ backgroundColor: '#f2f2ff', marginBottom: Platform.OS === 'ios'? 12 : 'none'}}
          inverted={true}
          data={JSON.parse(JSON.stringify(messages)).reverse()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback style={{marginBottom: Platform.OS === 'ios'? 50 : 'none'}}>
              <View style={{ marginTop: 6, marginBottom: 6}}>
                <View
                  style={{
                    maxWidth: Dimensions.get('screen').width * 0.8,
                    backgroundColor: '#3a6ee8',
                    alignSelf:
                      item.sender === currentUser.name
                        ? 'flex-end'
                        : 'flex-start',
                    marginHorizontal: 10,
                    padding: 10,
                    borderRadius: 8,
                    borderBottomLeftRadius:
                      item.sender === currentUser.name ? 8 : 0,
                    borderBottomRightRadius:
                      item.sender === currentUser.name ? 0 : 8,
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                    }}
                  >
                    {item.message}
                  </Text>
                  <Text
                    style={{
                      color: '#dfe4ea',
                      fontSize: 14,
                      alignSelf: 'flex-end',
                    }}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
          
        <KeyboardAvoidingView behavior={Platform.OS === 'ios'? "padding": undefined} keyboardVerticalOffset={80}>
          <View style={{ paddingVertical: 5, marginBottom: 20 }}>
          <View style={styles.messageInputView}>
            <TextInput
              defaultValue={inputMessage}
              style={styles.messageInput}
              placeholder='Message'
              onChangeText={(text) => setInputMessage(text)}
              onSubmitEditing={() => {
                sendMessage();
              }}
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => {
                sendMessage();
              }}
            >
              <Icon name='send' type='material' />
            </TouchableOpacity>
          </View>
          </View>
        </KeyboardAvoidingView>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
  userProfileImage: { height: '100%', aspectRatio: 1, borderRadius: 100 },
  container: {
    flex: 1,
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 14,
    borderRadius: 4,
    backgroundColor: 'white'
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
});
export default chatScreen