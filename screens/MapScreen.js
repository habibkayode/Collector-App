import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Button,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Geolocation from "react-native-geolocation-service";
import MapView, { Callout, Marker } from "react-native-maps";
import CollectionLogCard from "../Component/CollectionLogCard";
import MapViewDirections from "react-native-maps-directions";
import getDirections from "react-native-google-maps-directions";
import { useRoute } from "@react-navigation/core";
import Bgcover from "../Component/Bg/BackgroundCover";
import { connect } from "react-redux";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = "AIzaSyA3p7z6bSVFZ9qZWSB9BW8kmT6K50QTHb4";

const mapStateToProps = (state) => {
  return {
    userLocation: state.location.coordinate,
  };
};

const MapScreen = ({ navigation, userLocation }) => {
  let pickupData = useRoute().params;

  let [startingLocation, setStartingLocation] = useState({});

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
          console.log(
            "My current location",
            JSON.stringify(position),
            pickupData.location
          );
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

  // let handleGetDirections = () => {
  //   const data = {
  //     source: {
  //       latitude: startingLocation.latitude,
  //       longitude: startingLocation.longitude,
  //     },
  //     destination: {
  //       latitude: pickupData.location.lat,
  //       longitude: pickupData.location.lng,
  //     },
  //     params: [
  //       {
  //         key: "travelmode",
  //         value: "walking", // may be "walking", "bicycling" or "transit" as well
  //       },
  //       {
  //         key: "dir_action",
  //         value: "navigate", // this instantly initializes navigation using the given travel mode
  //       },
  //     ],
  //   };

  //   getDirections(data);
  // };

  useEffect(() => {
    getCurrentLocation();
  }, []);
  const redirectFunc = () => {
    navigation.navigate("ProcessPickup", pickupData);
  };
  return (
    <Bgcover name="Collection Log">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          marginBottom: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          {startingLocation.latitude && (
            <MapView
              //      showsUserLocation
              showsTraffic
              loadingEnabled
              loadingIndicatorColor="#F18921"
              toolbarEnabled
              style={{ minHeight: 400, marginHorizontal: 10 }}
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
                <MaterialCommunityIcons name="cart" color="blue" size={30} />
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
                </Callout>
              </Marker>
              <Marker
                title="Pickup location Location"
                coordinate={{
                  latitude: parseFloat(pickupData.location.lat),
                  longitude: parseFloat(pickupData.location.lng),
                }}
                image={require("../assets/marker2.png")}
              />
              {/* <Marker
                title="Current Location"
                coordinate={{
                  latitude: startingLocation.latitude,
                  longitude: startingLocation.longitude,
                }}
                image={require("../assets/marker2.png")}
              /> */}
              <MapViewDirections
                strokeWidth={10}
                strokeColor="#F18921"
                origin={{
                  latitude: startingLocation.latitude,
                  longitude: startingLocation.longitude,
                }}
                destination={{
                  latitude: pickupData.location.lat,
                  longitude: pickupData.location.lng,
                }}
                apikey={GOOGLE_MAPS_APIKEY}
                mode="WALKING"
              />
            </MapView>
          )}
          {/* <Text>
        {startingLocation.latitude}--{startingLocation.longitude}
      </Text> */}
          {/* {startingLocation && (
            <Button onPress={handleGetDirections} title="Get Directions" />
          )} */}
          <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
            <CollectionLogCard
              data={pickupData}
              buttonName={"Process Pickup"}
              redirectFunc={redirectFunc}
              single={true}
            />
          </View>
        </View>
      </ScrollView>
    </Bgcover>
  );
};

export default connect(mapStateToProps)(MapScreen);
