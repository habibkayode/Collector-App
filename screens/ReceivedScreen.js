import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const RecievedScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/background/bg1.jpg')}
      style={{ height: '100%', width: '100%' }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
          marginBottom: 20,
          marginTop: 120,
        }}
      >
        <Image source={require('../assets/menu2.png')} />
      </View>
      <View style={{}}>
        <Text style={{ fontWeight: 'bold', fontSize: 40, textAlign: 'center' }}>
          {' '}
        </Text>
        <View
          style={{
            width: 203,
            height: 203,
            borderColor: '#0A956A',
            borderWidth: 2,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 20,
            borderRadius: 110,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            style={{ marginTop: 30 }}
            source={require('../assets/check-big.png')}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            paddingHorizontal: 30,
            textAlign: 'center',
            fontSize: 16,
            lineHeight: 18,
          }}
        >
          You have arrived and details have been sent to the agent.
        </Text>
        <TouchableOpacity
          style={{
            height: 71,
            backgroundColor: '#0A956A',
            marginHorizontal: 30,
            borderRadius: 10,
            justifyContent: 'center',
            marginTop: 20,
            paddingHorizontal: 10,
          }}
          onPress={() => {
            navigation.navigate('ConfirmTonnageByAgent');
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}
          >
            Click here to confirm tonnage received by Agent
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default RecievedScreen;
