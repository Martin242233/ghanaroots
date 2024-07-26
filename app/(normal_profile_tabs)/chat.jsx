import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Platform  } from 'react-native'
import React from 'react';
import {router } from 'expo-router'
import ChatComponent from '../../components/ChatComponent';

const chat = () => {

  //List of chats
  const chats = [
    {
      userName: 'Deo Obomby',
      lastMessage: 'First Item again',
      time: '01:35',
      profile_pic_url: require('../../assets/images/tourismPng.png'),
    },
    {
      userName: 'Alice Johnson',
      lastMessage: 'Hey there!',
      time: '02:10',
      profile_pic_url: require('../../assets/images/tourismPng.png'),
    },
    {
      userName: 'Bob Smith',
      lastMessage: 'Are we still on for tomorrow?',
      time: '03:45',
      profile_pic_url: require('../../assets/images/tourismPng.png'),
    },
    {
      userName: 'Charlie Brown',
      lastMessage: 'Got it, thanks!',
      time: '04:20',
      profile_pic_url: require('../../assets/images/tourismPng.png'),
    },
    {
      userName: 'Diana Prince',
      lastMessage: 'See you soon!',
      time: '05:55',
      profile_pic_url: require('../../assets/images/tourismPng.png'),
    },
    {
      userName: 'Ethan Hunt',
      lastMessage: 'Mission accomplished!',
      time: '06:30',
      profile_pic_url: require('../../assets/images/tourismPng.png'),
    },
    {
      userName: 'Fiona Glenanne',
      lastMessage: 'Call me when you can.',
      time: '07:15',
      profile_pic_url: require('../../assets/images/tourismPng.png'),
    },
    {
      userName: 'George Weasley',
      lastMessage: 'Got a joke for you!',
      time: '08:05',
      profile_pic_url: require('../../assets/images/tourismPng.png'),
    },
    {
      userName: 'Hannah Abbott',
      lastMessage: 'Meeting at 9?',
      time: '09:45',
      profile_pic_url: require('../../assets/images/tourismPng.png'),
    },
    {
      userName: 'Ian Malcolm',
      lastMessage: 'Life finds a way.',
      time: '10:20',
      profile_pic_url: require('../../assets/images/tourismPng.png'),
    },
    {
      userName: 'Jane Doe',
      lastMessage: 'Nice to meet you!',
      time: '11:30',
      profile_pic_url: require('../../assets/images/tourismPng.png'),
    }
  ];
  
  return (
    <SafeAreaView style={{backgroundColor: 'white', minHeight: '100%', marginTop: Platform.OS === 'android'? '10%' : 'none'}}>
      <View className="justify-start ml-4">
        <Text className="text-xl">Chat</Text>
      </View>
      
      <FlatList
        style={{ paddingVertical: 12, marginBottom: 85}}
        data={chats}
        renderItem={({item}) => (
          <TouchableOpacity 
            onPress={()=>
              router.push({
                pathname: 'chat_individual/[chat_screen]',
                params: {
                  user_name: item.userName,
                  profile_url_img: '',
                  user_id: ''
                }
              })
            }
          >
            <ChatComponent 
              userName={item.userName}
              lastMessage={item.lastMessage}
              time={item.time}
              profile_pic_url={item.profile_pic_url}
            /> 
          </TouchableOpacity> 
        )}
        keyExtractor={item => item.userName}
      />
    </SafeAreaView>
  )
}

export default chat