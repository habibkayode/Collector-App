import React, { useCallback, useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SmallImage from "./SmallImage";
import { timeDifference } from "../helper/timeHelper";
import { store } from "../Redux/store";
import { getDistanceAndTime } from "../Api/locationApi";

const CollectionLogCard = (props) => {
  let [timeToLocation, setTimeToLocation] = useState();
  let [distanceApart, setDistanceApart] = useState();

  let [currentLocation, setCurrentLocation] = useState({});
  let data = props.data;

  const navigation = useNavigation();
  let createAt;
  if (!props.agent) {
    let newCreate = props.data.created_at.split(" ");
    let datePart = newCreate[0].split("-");
    datePart[1] = datePart[1] - 1;
    let timePart = newCreate[1].split(":");
    createAt = new Date(...datePart, ...timePart);
  }

  useEffect(() => {
    if (data.location) {
      let curLocation = store.getState().location.coordinate;
      getDistanceAndTime(curLocation, {
        lat: data.location.lat,
        lng: data.location.lng,
      }).then((data) => {
        console.log(
          data.rows[0].elements[0].distance,
          data.rows[0].elements[0].duration,
          data.rows[0].elements[0],
          data.rows[0],
          data.rows
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
      if (props.single) {
        storeSub = store.subscribe(() => {
          setCurrentLocation(store.getState().location.coordinate);
        });
      }
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe();
      if (props.single) {
        storeSub();
      }
    };
  }, [props.navigation]);

  useEffect(() => {
    getDistanceAndTime(currentLocation, {
      lat: data.location.lat,
      lng: data.location.lng,
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
          justifyContent: props.agent ? "flex-start" : "space-between",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
          {props.data.producer_name}
        </Text>
        {!props.agent && (
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize: 10,
            }}
          >
            {timeDifference(new Date(), createAt)}
          </Text>
        )}
        {props.agent && (
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize: 10,
              marginLeft: 5,
            }}
          >
            (Agent 1)
          </Text>
        )}
      </View>
      <Text
        style={{
          //marginTop: 5,
          fontSize: 12,
          color: "white",
          fontWeight: "bold",
        }}
      >
        {props.data.address}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
          {props.data.producer.phone}
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

      {props.agent && (
        <Text style={{ fontSize: 10, color: "white", marginTop: 20 }}>
          Material Collected by agent
        </Text>
      )}

      <View
        style={{
          marginTop: props.agent ? 5 : 20,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={true}
          horizontal={true}
          contentContainerStyle={{}}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            {/* {JSON.parse(props.data.materials).map((ele) => (
              <SmallImage data={ele} />
            ))} */}
            {props.data.homogeneous_materials.map((ele) => (
              <SmallImage data={ele} />
            ))}
          </View>
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            marginLeft: 30,
            //  width: "40%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.redirectFunc();
              //navigation.navigate("MapScreen");
            }}
            style={{
              //height: 25,
              alignSelf: "flex-end",
              borderRadius: 10,
              backgroundColor: "#0A956A",
              justifyContent: "center",
              padding: 8,
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
              {props.buttonName}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CollectionLogCard;
