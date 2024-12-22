import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/images/working.jpg');

const Index = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={image}
      style={{ flex: 1, width: '100%', height: '100%' }}
    >
      <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: 50 }}>
        {/* View for Button at the top */}
        <View style={{ alignItems: 'flex-end', paddingRight: 20 }}>
          {/* Button with "Next" Text */}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('sch')}
            style={{
              backgroundColor: 'gray', // Gray background color
              borderRadius: 30, // Rounded button
              width: 100, // Set button width
              paddingVertical: 8, // Vertical padding
              elevation: 4, // Shadow effect
            }}
            labelStyle={{
              fontSize: 15, // Larger text size
              color: 'black', // Text color
            }}
          >
            Next
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Index;