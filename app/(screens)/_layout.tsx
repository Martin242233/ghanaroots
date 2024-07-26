import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name="editprofile/[editprofile]" options={{ headerShown: false }} />
        <Stack.Screen name="eventdetail/[eventdetail]" options={{ headerShown: true,  headerStyle: {backgroundColor: 'white'}}} />
        <Stack.Screen name="category/[categoryScreen]" options={{ headerShown: false }} />
        <Stack.Screen name="profile/[profile]" options={{ headerShown: false }} />
        <Stack.Screen name="publication/[publication_screen]" options={{ headerShown: false }} />
        <Stack.Screen name="chat_individual/[chat_screen]" options={{ headerShown: true , headerStyle: {backgroundColor: 'white'}}}/>
        <Stack.Screen name="single_item_detail/[item_details]" options={{ headerShown: true, title: 'Details', headerBackTitleVisible: true, headerBackTitle: 'Back', headerBackTitleStyle: {fontSize: 26}}}/>
        <Stack.Screen name="recapitulatif_sell/[sell_recap_screen]" options={{ headerShown: true , headerStyle: {backgroundColor: 'white'}}}/>
        <Stack.Screen name="recapPost/[recappost]" options={{ headerShown: true , headerStyle: {backgroundColor: 'white'}}}/>
        <Stack.Screen name="menuScreen" options={{ headerShown: true , headerStyle: {backgroundColor: 'white'}}}/>
        <Stack.Screen name="itemsForSell" options={{ headerShown: true, title:"My items", headerStyle: {backgroundColor: 'white'}, headerTitle: 'test'}}/>
        <Stack.Screen name="signIn" options={{ headerShown: false,}}/>
        <Stack.Screen name="signUp" options={{ headerShown: false,}}/>
    </Stack>
  )
}

export default Layout