import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Button,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Geolocation from "react-native-geolocation-service";
import MapView, { Marker, Callout } from "react-native-maps";
//import MapViewDirections from "react-native-maps-directions";
import getDirections from "react-native-google-maps-directions";
import Bgcover from "../Component/Bg/BackgroundCover";
import { gettAllAgent } from "../Api/api";
import { connect } from "react-redux";
import { useRoute } from "@react-navigation/core";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import MapViewDirections from "react-native-maps-directions";
import { getDistanceAndTime } from "../Api/locationApi";

const GOOGLE_MAPS_APIKEY = "AIzaSyA3p7z6bSVFZ9qZWSB9BW8kmT6K50QTHb4";

const mapStateToProps = (state) => {
  return {
    userLocation: state.location.coordinate,
  };
};

const AgentMapScreen = ({ navigation, agents, userLocation }) => {
  let [startingLocation, setStartingLocation] = useState({});
  let [distanceApart, setDistanceApart] = useState();
  let agentData = useRoute().params;
  console.log(agentData.location, "agent location");

  useEffect(() => {
    getDistanceAndTime(userLocation, {
      lat: agentData.userable.coordinates.lat,
      lng: agentData.userable.coordinates.lng,
    }).then((data) => {
      console.log(
        data.rows[0].elements[0].distance,
        data.rows[0].elements[0].duration
      );
      setDistanceApart(data.rows[0].elements[0].distance);
    });
  }, [userLocation]);

  let getCurrentLocation = async () => {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Scrapays Location Permission",
        message: "Scrapays App needs access to your location ",
      }
    );
    if (granted) {
      Geolocation.getCurrentPosition(
        (position) => {
          setStartingLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };

  // useEffect(() => {
  //   const _watchId = Geolocation.watchPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setStartingLocation({ latitude, longitude });
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       distanceFilter: 0,
  //       interval: 5000,
  //       fastestInterval: 2000,
  //     }
  //   );

  //   return () => {
  //     if (_watchId) {
  //       Geolocation.clearWatch(_watchId);
  //     }
  //   };
  // }, []);
  console.log(agentData, agentData.location.lng, "ppoooo");

  let handleGetDirections = () => {
    const data = {
      source: {
        latitude: Number(userLocation.lat),
        longitude: Number(userLocation.lng),
      },
      destination: {
        latitude: Number(agentData.userable.coordinates.lat),
        longitude: Number(agentData.userable.coordinates.lng),
      },
      params: [
        {
          key: "travelmode",
          value: "walking", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);
  const redirectFunc = () => {
    navigation.navigate("ProcessPickup", pickupData);
  };

  return (
    <Bgcover name="Agent Direction">
      <View style={{ flex: 1 }}>
        {startingLocation.latitude && (
          <MapView
            showsUserLocation
            showsTraffic
            loadingEnabled
            loadingIndicatorColor="#F18921"
            toolbarEnabled
            region={{}}
            style={{
              // height: "100%",
              marginHorizontal: 10,
              borderRadius: 60,
              //              borderWidth: 1
              flex: 1,
            }}
            region={{
              ...{
                latitude: userLocation.lat,
                longitude: userLocation.lng,
              },
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(userLocation.lat),
                longitude: parseFloat(userLocation.lng),
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../assets/srapays-logo.png")}
              ></Image>

              {/* <MaterialCommunityIcons name="cart" color="blue" size={30} />
              <Callout>
                <Text
                  style={{
                    width: 100,
                    height: 30,
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  My Location
                </Text>
              </Callout> */}
            </Marker>
            <MapViewDirections
              strokeWidth={10}
              strokeColor="#F18921"
              origin={{
                latitude: Number(startingLocation.latitude),
                longitude: Number(startingLocation.longitude),
              }}
              destination={{
                latitude: Number(agentData.userable.coordinates.lat),
                longitude: Number(agentData.userable.coordinates.lng),
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              mode="WALKING"
            />
          </MapView>
        )}

        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <Button
            title="Get Directions"
            color="#F18921"
            onPress={handleGetDirections}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (distanceApart.value < 5000) {
            navigation.navigate("Received");
          } else {
            Alert.alert("Info", "Please get to Agent location first");
          }
        }}
        style={{
          paddingHorizontal: 30,
          paddingVertical: 10,
          alignSelf: "flex-end",
          backgroundColor: "#0A956A",
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
          Proceed
        </Text>
      </TouchableOpacity>
    </Bgcover>
  );
};

export default connect(mapStateToProps)(AgentMapScreen);
