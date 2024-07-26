import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  initializeAuth,
  getReactNativePersistence 
} from 'firebase/auth';
import { getFirestore, collection, setDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABbbSX-BqpOyERU9XKLo6_9TJZ7SLSTD8",
  authDomain: "ghanarootsapp.firebaseapp.com",
  projectId: "ghanarootsapp",
  storageBucket: "ghanarootsapp.appspot.com",
  messagingSenderId: "205226600096",
  appId: "1:205226600096:web:5aaf3333818a57c5778bc5",
  measurementId: "G-VB4RZQCH12"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const FIREBASE_APP_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Cloud Firestore
const FIREBASE_DB_FIRESTORE = getFirestore(FIREBASE_APP);

// Initialize Firebase Storage
const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

// Sign in user
const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(FIREBASE_APP_AUTH, email, password);
    const user = userCredential.user;
    const userJson = JSON.stringify(user);
    await AsyncStorage.setItem('user', userJson);
    await AsyncStorage.setItem('wrongCredentials', 'false');
    return userJson;
  } catch (error) {
    console.log(error);
    await AsyncStorage.setItem('wrongCredentials', 'true');
  }
};

// Sign out user
const signUserOut = async () => {
  try {
    await signOut(FIREBASE_APP_AUTH);
  } catch (error) {
    console.log(error);
  }
};

// Get current user
const getCurrentUser = async () => {
  try {
    onAuthStateChanged(FIREBASE_APP_AUTH, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(`here is your uid ${uid}`);
        return uid;
      } else {
        console.log('No user is signed in');
      }
    });
  } catch (error) {
    return error;
  }
};

// Function to fetch user data from Firestore
const fetchUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(FIREBASE_DB_FIRESTORE, 'users', uid));
    if (userDoc.exists()) {
      console.log('Document data:', userDoc.data());
      const userData = JSON.stringify(userDoc.data());
      await AsyncStorage.setItem('user', userData);
      console.log(userData);
      return userDoc.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    throw new Error(error);
  }
};

export {
  FIREBASE_APP,
  FIREBASE_APP_AUTH,
  FIREBASE_DB_FIRESTORE,
  FIREBASE_STORAGE,
  signInUser,
  signUserOut,
  fetchUserData,
  getCurrentUser
};
