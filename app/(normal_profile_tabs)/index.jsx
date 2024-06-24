import {Platform, Image, ImageBackground, ScrollView,  StyleSheet, Text, View, SafeAreaView, TextInput,FlatList, TouchableOpacity,Directions} from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from "expo-router";

const image = {uri: '../../assets/images/tourismPng.png'};

const index = () => {
  const categoryTypes = [
    {
      id: 'his',
      title: 'History',
      image: require('../../assets/images/history.png'),
      category: 'history',
      labels: ['ancient', 'events', 'heritage']
    },
    {
      id: 'foo',
      title: 'Foods',
      image: require('../../assets/images/dishes.png'),
      category: 'foods',
      labels: ['cuisine', 'recipes', 'dishes']
    },
    {
      id: 'Tou',
      title: 'Tourism',
      image: require('../../assets/images/tourismPng.png'),
      category: 'tourism',
      labels: ['travel', 'sights', 'adventures']
    },
    {
      id: 'Lan',
      title: 'Languages',
      image: require('../../assets/images/languages.png'),
      category: 'languages',
      labels: ['linguistics', 'dialects', 'communication']
    }
  ];

  const [selectedId, setSelectedId] = useState();

  const Item = ({item, onPress}) => (
    
    
    
    <TouchableOpacity onPress={onPress}>
      <View style={{ backgroundColor:'red',marginBottom: 5, flexWrap: 'wrap'}}>
        {/* Header */}
        <View>
          <Text style='blue'>Username</Text>
          <View style={styles.container2}>
            <Image
              style={styles.tinyLogo}
              source={require('..//../assets/images/imgpro1.png')}
            />
          </View>
        </View>
        {/* Header */}

        {/* Body */}
        <View style={{backgroundColor: 'yellow', width:'100%', height:'75%'}}>
          
        </View>
        {/* Body */}
        
  
        {/* Footer */}
        {/* Footer */}

  
  
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({item}) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => console.log(item.id)}
      />
    );
  };

  return (
    <SafeAreaView className="h-full  bg-white">
        <Text style={{fontSize: 30, marginTop: 30, textAlign: 'center'}}>Welcome</Text>
        <Text style={{fontSize: 20, textAlign:'center',marginTop:40}}>To GhanaRoots</Text>

        <View style={{backgroundColor:'lightgray', flexDirection:'row', justifyContent:'flex-start', alignItems:'center',borderRadius:13,height:50, width:'90%',marginLeft:18}}>          
          <TextInput placeholder='Search'placeholderTextColor='#9c9c9c' style={styles.text}/>
          <Icon name="search-outline" size={17}/>
        </View>

        {/* <FlatList
          className="h-full mt-8 ml-4"
          data={categoryTypes}
          renderItem={({item})=>
            <TouchableOpacity
              className="bg-white border-2"
              style={{
                borderRadius: 13,
                width: '70%',
                height: '50%', 
                marginLeft: 0,
              }}
            >
              <View>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          }
          keyExtractor={item => item.id}
          horizontal={true}
        /> */}
     <ScrollView horizontal contentContainerStyle={styles.cards2} showsHorizontalScrollIndicator={false}>
  {categoryTypes.map((item, index) => (
    <TouchableOpacity
      key={index}
      onPress={() =>
        router.push({
          pathname: 'src/screens/Categorieslist/categorieslist',
          params: { category: item.category, labels: item.labels }
        })
      }
      style={styles.cards1}
    >
      <ImageBackground style={styles.Prayer} resizeMode="cover" source={item.image}>
        <Text style={styles.categoryText}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  ))}
</ScrollView>
<View style={{height: '100%'}}>

      <FlatList
        style={{height:'100%',}}
        data={categoryTypes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
</View>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container2: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  text:{  
    paddingLeft:10,
    backgroundColor: 'lightgray',
    height: 38,
    borderRadius: 13,
    width:'75%',
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
},
des: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
content: {
    marginLeft: 47,
    width: '70%',
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginTop: 30,
    flexDirection: 'row',
},
input: {
    height: 40,
    color: '#333',
},
description: {
    marginLeft: 10,
    marginTop: 40,
    color: '#000000',
    fontSize: 26,
    fontWeight: '500',
},
description1: {
    marginTop: 5,
    color: '#000000',
    fontSize: 26,
    alignItems: "flex-start",
    fontWeight: '500',
    justifyContent: 'space-between',
    flexDirection: 'row',
},
arrow: {
    marginTop: 45,
    color: '#00000',
    width: 22,
    height: 20,
},
arrowicon: {
    marginRight: 50,
    flexDirection: 'row',
    width: 45,
    marginTop: 45,
},


cards: {
    gap: 12,
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
    marginLeft: 8,
},


cards1: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(17, 144, 14)',
    borderRadius: 15,
    width: 118,
    height: 77,
    overflow: 'hidden',
    marginTop: 20,
    opacity: 0.7,
},
categoryText: {
    fontWeight: '800',
},
cards2: {
    gap: 10,
    marginLeft: 8,
},
card: {
    alignItems: 'center',
    backgroundColor: 'rgba(17, 144, 14, 0.08)',
    borderRadius: 15,
    width: 118,
    height: 77,
    overflow: 'hidden',
},
Prayer: {
    width: 118,
    height: 77,
    justifyContent: 'center',
    alignItems: 'center',
},
notificationButton: {
    marginRight: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
},
Ville: {
    color: '#11900E', 
},
touch: {
    color: '#11900E',
},
searchIcon: {
    marginTop: 7,
},
...Platform.select({
    ios: {
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    android: {
        marginTop: 10,
        elevation: 5,
    },
}),


})
export default index
