import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [json_data, setJson_data] = useState('');
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    async function fetchData() {
      fetch('https://dev-dummy-api.jelantah.org/api/foods/get')
        .then((response) => response.json())
        .then((responseJson) => {
          setJson_data(responseJson.data.data);
          setShowIndicator(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchData();
  }, []);

  const ItemRender = ({ title, imageUrl }) => (
    <View style={styleSheet.listItem}>
      <Image style={{width: 50, height: 50}} source={{uri:imageUrl}}/>
      <Text style={styleSheet.itemText}> {title} </Text>
    </View>
  );

  const header = () => {
    return (
      <View
        style={{
          height: 50,
          width: '100%',
          backgroundColor: '#00B8D4',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 24, color: 'white' }}> List of Foods</Text>
      </View>
    );
  };

  const divider = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'black',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styleSheet.MainContainer}>
      <ActivityIndicator
        size="large"
        color="red"
        animating={showIndicator}
        style={styleSheet.activityIndicator}
      />

      <FlatList
        data={json_data}
        renderItem={({ item }) => <ItemRender title={item.food_name} imageUrl={item.url_image_absolute} />}
        ItemSeparatorComponent={divider}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={header}
      />
    </SafeAreaView>
  );
}

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },

  listItem: {
    paddingLeft: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },

  itemText: {
    fontSize: 24,
    color: 'black',
  },

  activityIndicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
