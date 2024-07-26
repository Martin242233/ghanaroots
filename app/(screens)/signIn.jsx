import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router'
import { signInUser, getCurrentUser } from '../../lib/firebaseConfig';
import { useGlobalContext } from '../../context/GlobalProvider'
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
  const { setIsAuth, setIsUser, isUser, loading, setLoading } = useGlobalContext();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsAuth(false);
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if(user){
        setIsUser(null);
        setIsAuth(false);
        console.log('Sign in file',user);
        await AsyncStorage.removeItem('user');
        console.log(isUser)
      }
    }
    checkUser();
  
  }, []);

  // useEffect(() => {
  //   setIsAuth(false);
  //   const checkUser = async () => {
  //     if (user){
  //       console.log('User is already signed in 20');
  //       console.log(user)
  //       // router.replace('/')
  //     }else{
  //       console.log('User is not signed in line 23');
  //       console.log(user)
  //     }
  //   }
  //   checkUser();
  
  // }, []);

  const handleLogin = async () => {
    //Handle login logic here
    // try {
    //   if (isAuth){
    //     console.log('Access denied line 41 signin.jsx');
    //   }else{
    //     if(username === '' || password === '') {
    //       console.log('Username or password is empty')
    //       Alert.alert('Username or password is empty')
    //     }else{
    //       console.log('Username or password is not empty')
    //       try {
    //         await signInUser(username, password)
    //         setIsAuth(true)
    //         getCurrentUser().then((user) => {
    //           if(user){
    //             setUser(user)
    //             setIsAuth(true)
    //             console.log('Access granted line 43 signin.jsx');
    //             console.log(user)
    //             router.replace('/')
    //           }
    //         })
    //       } catch (error) {
    //         console.log('Error signing in')
    //         console.log(error)
            
    //       }
          
    //     }
    //   }


    // } catch (error) {
    //   throw new Error(error)
    // }

    try {
      setLoading(true);
      const isError = await AsyncStorage.getItem('wrongCredentials');
       if(!isUser){
        if(username==='' && password ===''){
          Alert.alert('Please fill in the fields');
          setLoading(false);
        }else{
          await signInUser(username, password);
          const user = await AsyncStorage.getItem('user');
          console.log(JSON.parse(user));        
          if(isError === 'true'){
            console.log(`Wrong credentials, can't sign in`);
            Alert.alert('Invalid email or password');
          }else{
            setIsAuth(true);
            setIsUser(JSON.parse(user));
            // setLoading(false);
            router.replace('/');
          }
        } 
       }else{
          console.log('Sign in user okay');
          await AsyncStorage.setItem('wrongCredentials', 'false')
          setIsAuth(false)
          setIsUser(null);        
       }
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleSignUp = () => {
    // Navigate to the Sign Up screen
    router.replace('/signUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.logo} />
      </View>
      <Text style={styles.welcomeText}>Welcome back !</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={'#000000'}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={'#000000'}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>
          You don’t have an account yet ? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: Platform.OS === 'ios'? '92%': '100%',
    padding: Platform.OS === 'ios'? 15 :15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    marginBottom: 10,
    marginLeft: Platform.OS === 'ios'? 15 :0
  },
  loginButton: {
    width: Platform.OS === 'ios'? '96%': '100%',
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#777',
  },
  signUpLink: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
