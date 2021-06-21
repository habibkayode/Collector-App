import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SmallImage from "./SmallImage";
import { acceptPickUp, rejectPickUp } from "../Api/api";
import { timeDifference } from "../helper/timeHelper";
import { getDistanceAndTime } from "../Api/locationApi";
import { store } from "../Redux/store";

const PickUpCard = ({ data }) => {
  let [timeToLocation, setTimeToLocation] = useState();
  let [distanceApart, setDistanceApart] = useState();

  // let propsDate = JSON.parse(data.schedule);
  let propsDate = data.schedule;

  let pickDate = new Date(
    propsDate.schedule_date.year,
    propsDate.schedule_date.month - 1,
    propsDate.schedule_date.day,
    propsDate.schedule_time
  );

  // let newCreate = data.created_at.split(" ");
  // let datePart = newCreate[0].split("-");
  // datePart[1] = datePart[1] - 1;
  // let timePart = newCreate[1].split(":");

  // let createAt = new Date(...datePart, ...timePart);
  let createAt = new Date(data.created_at);
  const navigation = useNavigation();

  useEffect(() => {
    if (data.location) {
      let curLocation = store.getState().location.coordinate;

      getDistanceAndTime(curLocation, {
        lat: data.location.lat,
        lng: data.location.lng,
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: "white",
            maxWidth: "80%",
            overflow: "scroll",
          }}
        >
          {data.producer_name}
        </Text>
        {/* <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: 10,
          }}
        >
          {timeDifference(new Date(), createAt)} ago
        </Text> */}
        {/* <Text
          style={{
            color: "#0A956A",
            alignSelf: "center",
            fontSize: 12,
            backgroundColor: "#292b2c",
            paddingHorizontal: 10,
            fontWeight: "bold",
            borderRadius: 8,
            paddingVertical: 5,
            borderColor: "#0A956A",
            borderWidth: 1,
          }}
        >
          scheduled
        </Text> */}
      </View>
      <Text
        style={{
          marginTop: 5,
          fontWeight: "bold",
          fontSize: 15,
          color: "white",
        }}
      >
        {data.address}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
          {data.producer.phone}
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
          marginTop: 10,
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
            {data.homogeneous_materials.map((item) => (
              <SmallImage data={item} />
            ))}
          </View>
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            marginLeft: 30,
            width: "40%",
            justifyContent: "flex-end",
          }}
        >
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity
              style={{
                width: 29,
                height: 29,
                borderRadius: 15,
                backgroundColor: "#ED2C2C",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                rejectPickUp(data.id).then((data) => {
                  if (data.success) {
                    console.log(data, "rejected");
                    navigation.navigate("RejectPickup");
                  }
                });
              }}
            >
              <Image source={require("../assets/close.png")} />
            </TouchableOpacity>
            <Text style={{ color: "white", right: 5 }}>Reject</Text>
          </View>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => {
                console.log(data.id, "in card");
                acceptPickUp(data.id).then((data) => {
                  if (data.success) navigation.navigate("AcceptPickup");
                });
              }}
              style={{
                width: 29,
                height: 29,
                borderRadius: 15,
                backgroundColor: "#00B17B",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={require("../assets/check.png")} />
            </TouchableOpacity>
            <Text style={{ color: "white", right: 5 }}>Accept</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PickUpCard;
