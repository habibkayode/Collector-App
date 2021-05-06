import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
} from "react-native";
import * as Animatable from "react-native-animatable";
import MapView, { Marker, Callout } from "react-native-maps";
import CollectionLogCard from "../Component/CollectionLogCard";
import MapViewDirections from "react-native-maps-directions";
import { gettAllAgent } from "../Api/api";
import { connect } from "react-redux";
import Bgcover from "../Component/Bg/BackgroundCover";
import Geolocation from "react-native-geolocation-service";
import AgentCard from "../Component/AgentCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const origin = { latitude: 37.3318456, longitude: -122.0296002 };

const GOOGLE_MAPS_APIKEY = "AIzaSyBxdQWCyWmxbf3O65eaOzb2XXoCT4lpgIs";

const mapStateToProps = (state) => {
  console.log(state.normal.acceptedPickupRequests);
  return {
    agents: state.normal.agents,

    userLocation: state.location.coordinate,
  };
};

const SearchAgentScreen = ({ navigation, agents, userLocation }) => {
  let [startingLocation, setStartingLocation] = useState();
  let [loading, setLoading] = useState(true);
  let [selectedIndex, setSelectIndex] = useState(0);

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
          console.log("My current location", JSON.stringify(position));
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };

  useEffect(() => {
    gettAllAgent().then(() => setLoading(false));
    getCurrentLocation();
  }, []);

  const redirectFunc = () => {
    navigation.navigate("ConfirmationPage");
  };
  return (
    <Bgcover name=" Search for Agent">
      {!loading && startingLocation && (
        <>
          <View style={{ paddingHorizontal: 10, marginBottom: 20, flex: 1 }}>
            <MapView
              showsUserLocation
              showsTraffic
              loadingEnabled
              loadingIndicatorColor="#F18921"
              toolbarEnabled
              style={{ height: "100%", width: "100%" }}
              region={{
                latitude: startingLocation.latitude,
                longitude: startingLocation.longitude,
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
              {agents.map((i, index) => {
                console.log(i.userable.coordinates, "agents cordinate");
                return (
                  <Marker
                    onPress={() => setSelectIndex(index)}
                    key={index}
                    title={`Agent ${index + 1}`}
                    coordinate={{
                      latitude: parseFloat(i.userable.coordinates.lat),
                      longitude: parseFloat(i.userable.coordinates.lng),
                    }}
                    image={require("../assets/marker2.png")}
                  />
                );
              })}
            </MapView>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <AgentCard data={agents[selectedIndex]} index={selectedIndex} />
          </View>
        </>
      )}
    </Bgcover>
  );
};

export default connect(mapStateToProps)(SearchAgentScreen);
