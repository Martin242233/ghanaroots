import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter, useLocalSearchParams, router } from 'expo-router'; // Import necessary hooks and modules from expo-router
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons
import { Stack } from 'expo-router'; // Import Stack for navigation
import axios from 'axios'; // Import axios for API calls



const eventdetail = () => {
  // Get eventId from local search params
  const { eventId } = useLocalSearchParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


 

  const UNSPLASH_ACCESS_KEY = 'H6LKLB3cfSxkdSporkNe-DhHleAXnvJqB_F8-astRec';

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

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (!eventId) {
          setError('Event ID is missing');
          setLoading(false);
          return;
        }

        const response = await axios.get('https://api.predicthq.com/v1/saved-locations/xBcod9tmnJwPZJjVYObWfw/insights/events?country=Gh&lim', {
          headers: {
            Authorization: "Bearer N8z9jcI1h8f17Ijj_sdOkUCaQm_Azs1CuzSEAS2V",
            Accept: "application/json",
          },
          params: {
            country: 'Gh',
            limit: 50,
          }
        });

        const eventData = response.data.results.find(event => event.id === eventId);

        if (!eventData) {
          setError('Event not found');
          setLoading(false);
          return;
        }

        const imageUrl = await fetchImagesFromUnsplash(eventData.title);

        const address = eventData.entities && eventData.entities.length > 0 
          ? eventData.entities[0].formatted_address 
          : 'Address not available';

        const eventDetails = {
          id: eventData.id,
          title: eventData.title,
          start: eventData.start,
          thumbnail: imageUrl,
          description: eventData.description,
          link: eventData.link,
          tags: eventData.tags,
          category: eventData.category,
          local_rank: eventData.local_rank || Math.random() * 100,
          address,
        };

        setEvent(eventDetails);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError(error.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);


  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!event) {
    return <Text>No event details available</Text>;
  }

  return (
    <>
      <Stack.Screen options={{
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
            <Text style={styles.headerLeftText}>
              <Ionicons size={20} name="arrow-back" />
              Eventdetail
            </Text>
          </TouchableOpacity>
        ),
        
      }} />

      <ScrollView style={styles.container}>
        <SafeAreaView>
          <Text style={styles.Text}>{event.title}</Text>
          <Text style={styles.Text2}>{event.description}</Text>
          

          <View style={styles.description}>
            <Ionicons size={40} name="calendar" color="#11900E" />
            <View style={styles.date}>
              <Text style={styles.text3}>date & time</Text>
              <Text style={styles.text4}>{event.start}</Text>
            </View>
          </View>

          <View style={styles.description}>
            <Ionicons size={40} name="location-outline" color="#11900E" />
            <View style={styles.date}>
              <Text style={styles.text3}>location</Text>
              <Text style={styles.text4}>{event.address}</Text>
            </View>
          </View>

          <View style={styles.description}>
            <Ionicons size={40} name="ticket" color="#11900E" />
            <View style={styles.date}>
              <Text style={styles.text3}>Ticket price</Text>
              <Text style={styles.text4}>150 GH</Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: '100%',
  },
  Text: {
    marginLeft: 10,
    paddingTop: 30,
    fontSize: 22,
    fontWeight: 'bold',
    paddingRight: 5,
  },
  Text2: {
    marginLeft: 10,
    marginTop: 6,
    fontSize: 15,
  },
  description: {
    marginLeft: 10,
    marginTop: 50,
    fontSize: 12,
    flexDirection: 'row',
    gap: 10,
  },
  text3: {
    fontSize: 12,
  },
  text4: {
    fontSize: 15,
    fontWeight: 'bold',
    width: '90%',
  },
  Image: {
    marginLeft: 10,
    marginTop: 15,
    width: 390,
    height: 210,
    borderRadius: 15,
  },
  headerLeft: {
    marginTop: 15,
    height: 55,
    marginRight: 20,
  },
  headerLeftText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: -10,
  },
  headerIcon: {},
});

export default eventdetail;
