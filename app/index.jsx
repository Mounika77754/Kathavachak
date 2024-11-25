import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import sch from './sch';
const image = require('../assets/images/back.jpg');

const index = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={image}
      style={{ flex: 1, width: '100%', height: '100%' }}
    >
      <View className="container items-center justify-center h-3/5 m-5">
        {/* View for Text and Button */}
        <View className="flex-row items-center justify-between w-full">
          {/* KATHA VACHAK Text */}
          <View>
            <Text className="text-4xl text-cyan-900 m-2">KATHA</Text>
            <Text className="text-4xl text-cyan-900 m-4">VACHAK</Text>
          </View>

          {/* Button */}
          <Button
            mode="text" // This makes the button transparent with no outline
            onPress={() => navigation.navigate('sch')} // Navigate to another page
            style={{
              backgroundColor: 'transparent',
              paddingVertical: 15,  // Increase vertical padding for button height
              paddingHorizontal: 20,  // Increase horizontal padding for button width
              marginRight: 80,  // Right margin
            }}
            labelStyle={{
              color: 'black',  // Button text color
              fontSize: 24,  // Increase font size of the button text
            }}
          >
            ➔
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default index;