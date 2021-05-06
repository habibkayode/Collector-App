import React, { useCallback, useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { store } from "../Redux/store";
import { getDistanceAndTime } from "../Api/locationApi";

const AgentCard = (props) => {
  //console.log(props, "props in agent card");
  let data = props.data;
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

    const unsubscribe = navigation.addListener("focus", () => {
      storeSub = store.subscribe(() => {
        setCurrentLocation(store.getState().location.coordinate);
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe();
      storeSub();
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
        width: "100%",
        backgroundColor: "#252525",
        padding: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
          {props.data.first_name} {props.data.last_name}
        </Text>

        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: 10,
            marginLeft: 5,
          }}
        >
          (Agent {props.index + 1})
        </Text>
      </View>
      <Text
        style={{
          marginTop: 5,
          fontSize: 16,
          color: "white",
          fontWeight: "bold",
        }}
      >
        {props.data.userable.hosting_address}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
          {props.data.phone}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Distane Apart
        </Text>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Estimated Time
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white" }}>{distanceApart}</Text>
        <Text style={{ color: "white" }}>{timeToLocation}</Text>
      </View>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginLeft: 30,
            //  width: "40%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              //  props.redirectFunc();
              navigation.navigate("ConfirmationPage", data);
            }}
            style={{
              //height: 25,
              alignSelf: "flex-end",
              borderRadius: 10,
              backgroundColor: "#0A956A",
              justifyContent: "center",
              padding: 12,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                alignSelf: "flex-start",
              }}
            >
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AgentCard;
