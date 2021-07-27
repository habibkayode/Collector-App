import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DashBoardCard = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(props.screenName);
      }}
      style={{
        width: '46%',
        height: 125,
        backgroundColor: '#252525',
        borderRadius: 10,
        //  justifyContent: "center",
        paddingTop: 20,
        alignItems: 'center',
        paddingHorizontal: 10,
        elevation: 10,
      }}
    >
      <Image source={props.icon} />
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 10,
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default DashBoardCard;
