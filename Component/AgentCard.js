import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { store } from '../Redux/store';
import { getDistanceAndTime } from '../Api/locationApi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
let screenWidth = Dimensions.get('screen').width;

const AgentCard = (props) => {
  //console.log(props, "props in agent card");
  let data = props.data;
  console.log((Number(screenWidth) / 80) * 100, screenWidth, ';;');
  let [timeToLocation, setTimeToLocation] = useState();
  let [currentLocation, setCurrentLocation] = useState({});
  let [distanceApart, setDistanceApart] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    if (data.userable.coordinates) {
      let curLocation = store.getState().location.coordinate;
      getDistanceAndTime(curLocation, {
        lat: data.userable.coordinates.lat,
        lng: data.userable.coordinates.lng,
      }).then((data) => {
        console.log(
          data.rows[0].elements[0].distance,
          data.rows[0].elements[0].duration
        );

        setTimeToLocation(data.rows[0].elements[0].duration.text);
        setDistanceApart(data.rows[0].elements[0].distance.text);

        // data.rows.forEach((element) => {
        //   console.log(
        //     element.elements[0].distance,
        //     element.elements[0].duration,
        //     "ell"
        //   );
        // });
      });
    }
  }, []);

  React.useEffect(() => {
    let storeSub;

    const unsubscribe = navigation.addListener('focus', () => {
      storeSub = store.subscribe(() => {
        setCurrentLocation(store.getState().location.coordinate);
        console.log(store.getState().location.coordinate, 'lociuuyy6678990');
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe();
      //  storeSub();
    };
  }, [props.navigation]);

  useEffect(() => {
    getDistanceAndTime(currentLocation, {
      lat: data.userable.coordinates.lat,
      lng: data.userable.coordinates.lng,
    }).then((data) => {
      console.log(
        data.rows[0].elements[0].distance,
        data.rows[0].elements[0].duration
      );

      setTimeToLocation(data.rows[0].elements[0].duration.text);
    });
  }, [currentLocation]);

  return (
    <View
      style={{
        backgroundColor: '#F4F2F2',
        padding: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 10,
        width: screenWidth * 0.8,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 18, color: '#252525', fontWeight: 'bold' }}>
          {props.data.first_name} {props.data.last_name} {props.index}
        </Text>
        <TouchableOpacity
          onPress={() => {
            //  props.redirectFunc();
            navigation.navigate('ConfirmationPage', data);
          }}
          style={{
            //height: 25,
            alignSelf: 'flex-end',
            borderRadius: 5,
            backgroundColor: '#0A956A',
            justifyContent: 'center',
            padding: 6,
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              fontSize: 15,
            }}
          >
            Select
          </Text>
        </TouchableOpacity>

        {/* <Text
          style={{
            color: "#252525",
            alignSelf: "center",
            fontSize: 10,
            marginLeft: 5,
          }}
        >
          (Agent {props.index + 1})
        </Text> */}
      </View>
      <Text
        style={{
          marginTop: 5,
          fontSize: 15,
          color: '#252525',
        }}
      >
        {props.data.userable.hosting_address}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
          alignItems: 'center',
        }}
      >
        <Text selectable={true} style={{ color: '#252525', fontSize: 18 }}>
          {props.data.phone}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => {
            Linking.openURL(`tel:${props.data.phone}`);
          }}
        >
          <MaterialCommunityIcons name="phone" size={15} color="#72DFC5" />
          <Text
            style={{
              color: 'grey',
              fontSize: 12,
              marginLeft: 5,
            }}
          >
            Call
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginLeft: 15, flexDirection: 'row' }}
          onPress={() => {
            Linking.openURL(
              `whatsapp://send?text=Hello   &phone=+234${props.data.phone}`
            );
          }}
        >
          <MaterialCommunityIcons name="whatsapp" size={15} color="#72DFC5" />
          <Text
            style={{
              color: 'grey',
              fontSize: 12,
              marginLeft: 5,
            }}
          >
            Chat
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <Text style={{ color: '#252525', fontSize: 15, fontWeight: 'bold' }}>
          Distance Apart
        </Text>
        <Text style={{ color: '#252525', fontSize: 15, fontWeight: 'bold' }}>
          Estimated Time
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Text style={{ color: '#252525' }}>{distanceApart}</Text>
        <Text style={{ color: '#252525' }}>{timeToLocation}</Text>
      </View>

      <View
        style={{
          marginTop: 5,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 30,
            //  width: "40%",
          }}
        ></View>
      </View>
    </View>
  );
};

export default AgentCard;
