import React from 'react';
import { Image, View, Text } from 'react-native';

const SmallImage = ({ data }) => {
  return (
    <View style={{ width: 50 }}>
      <View
        style={{
          width: 30,
          height: 27.27,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 5,
          borderRadius: 6,
          backgroundColor: 'white',
          borderWidth: 1,
        }}
      >
        <Image
          style={{ resizeMode: 'cover', width: '80%', height: '90%' }}
          source={{
            uri: `https://api.scrapays.com/storage/material_list_images/${data.image}`,
          }}
        />
        {/* <Image
          style={{ width: 25, height: 25 }}
          source={{
            uri:
              "https://api.scrapays.com/storage/material_list_images/material-boxes (1)_1606817758.png",
          }}
        /> */}
      </View>
      <Text
        style={{
          color: 'white',
          fontSize: 10,
          left: 5,
          maxWidth: '100%',
        }}
      >
        {data.name}
      </Text>
    </View>
  );
};

export default SmallImage;
