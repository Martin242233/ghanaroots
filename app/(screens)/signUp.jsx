import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Image, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from '../../context/GlobalProvider';
import { 
  FIREBASE_APP_AUTH, 
  FIREBASE_DB_FIRESTORE, 
  FIREBASE_STORAGE 
} from '../../lib/firebaseConfig'; // Ensure this path is correct
import { 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { 
  setDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

const SignUpScreen = () => {
  const { setIsAuth, setIsUser, isUser, loading, setLoading } = useGlobalContext();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState("");

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

  const handleSignUp = async () => {
    try {
      // Validate the input fields
      if (username === '' || email === '' || password === '' || !selectedImage) {
        Alert.alert('Please fill in all fields and select a profile image');
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_APP_AUTH, email, password);
      const user = userCredential.user;

      // Convert selectedImage URI to Blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      // Upload the profile image to Firebase Storage
      const imageRef = ref(FIREBASE_STORAGE, `profileImages/${user.uid}`);
      try {
        const imgSnapshot = await uploadBytes(imageRef, blob);
        const imageUrl = await getDownloadURL(imgSnapshot.ref);

        // Save the user profile information to Firestore
        await setDoc(doc(FIREBASE_DB_FIRESTORE, 'users', user.uid), {
          username,
          email: user.email,
          profileImageUrl: imageUrl,
          createdAt: serverTimestamp()
        });

        // Save user profile information to AsyncStorage
        await AsyncStorage.setItem('userProfile', JSON.stringify({
          username,
          email: user.email,
          profileImageUrl: imageUrl
        }));

        console.log('User profile saved and signed up successfully');
        Alert.alert('Sign-Up Successful!', 'You have been signed up successfully.');
        setIsAuth(true);
        // Navigate to the home page
        router.replace('/'); // Ensure this route matches your home screen route
      } catch (storageError) {
        console.error('Firebase storage error:', storageError);
        Alert.alert('Firebase Storage Error', storageError.message);
      }
    } catch (error) {
      console.error('Failed to sign up user:', error);
      Alert.alert('Sign-Up Error', error.message);
    }
  };

  const handleSignIn = () => {
    // Navigate to the Sign In screen
    router.navigate('/signIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.logo} />
        ) : (
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.logo} />
        )}
      </View>
      <Text style={styles.welcomeText}>Welcome here!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#000000"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#000000"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#000000"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity style={styles.imgButton} onPress={pickImage}>
        <Text style={styles.imgButtonText}>Upload Profile Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignIn}>
        <Text style={styles.signInText}>
          You have an account? <Text style={styles.signInLink}>Sign In</Text>
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
    borderRadius: 100,
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
    width: Platform.OS === 'ios' ? '92%' : '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    marginBottom: 10,
    marginLeft: Platform.OS === 'ios' ? 15 : 0,
  },
  signUpButton: {
    width: Platform.OS === 'ios' ? '96%' : '100%',
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  imgButton: {
    width: Platform.OS === 'ios' ? '96%' : '100%',
    padding: 15,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imgButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInText: {
    color: '#777',
  },
  signInLink: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
