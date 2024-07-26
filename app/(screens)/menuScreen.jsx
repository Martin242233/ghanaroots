import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, Platform} from 'react-native';
import { Icon } from 'react-native-elements';
import { router, Redirect  } from 'expo-router';
import {useNavigation} from '@react-navigation/native';
import { signUserOut } from '../../lib/firebaseConfig';
import { useGlobalContext } from '../../context/GlobalProvider'

const UserProfileScreen = () => {
  const { setIsAuth } = useGlobalContext()
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
          title: '',
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <TouchableOpacity
                style={{ paddingRight: 10 }}
                onPress={() => {
                  router.replace('profile');
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

      const handleLogout = ()=>{
        signUserOut();
        setIsAuth(false);
        router.replace('signIn')
      }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff', marginTop: Platform.OS === 'android' ? '0' : 'none'}}>
      <View style={styles.card}>
        <Text style={styles.userName}>Roman Slonov</Text>
        <Text style={styles.email}>destabiliseus@gmail.com</Text>
        <TouchableOpacity style={styles.menuItem} 
         onPress={() =>
              router.push('editprofile/[editprofile]')
            }>
          <Text style={styles.menuText}>Edit profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={()=>router.push('itemsForSell')}>
          <Text style={styles.menuText}>My items</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={()=>{
          handleLogout()
        }}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <StatusBar barStyle={'dark-content'}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  userName: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    color: '#000000',
    fontSize: 16,
    marginBottom: 20,
  },
  storageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  storageCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000000',
    marginRight: 10,
  },
  storageText: {
    color: '#000000',
    fontSize: 14,
  },
  proPlanText: {
    color: '#1E90FF',
    fontSize: 14,
    marginLeft: 10,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  menuText: {
    color: '#000000',
    fontSize: 16,
  },
  themeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  logoutButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
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

export default UserProfileScreen;
