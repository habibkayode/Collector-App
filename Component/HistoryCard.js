import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SmallImage from "./SmallImage";
import { acceptPickUp, rejectPickUp } from "../Api/api";
import { timeDifference } from "../helper/timeHelper";
import { getDistanceAndTime } from "../Api/locationApi";
import { store } from "../Redux/store";
import { numberWithCommas } from "../helper/helper";
import moment from "moment";

const HistoryCard = ({ data }) => {
  console.log(moment(data.created_at.split(" ")[0]).fromNow());
  let navigation = useNavigation();
  // let propsDate = JSON.parse(data.schedule);
  //   let propsDate = data.schedule;

  //   let pickDate = new Date(
  //     propsDate.schedule_date.year,
  //     propsDate.schedule_date.month - 1,
  //     propsDate.schedule_date.day,
  //     propsDate.schedule_time
  //   );

  //   let newCreate = data.created_at.split(" ");
  //   let datePart = newCreate[0].split("-");
  //   datePart[1] = datePart[1] - 1;
  //   let timePart = newCreate[1].split(":");

  //   let createAt = new Date(...datePart, ...timePart);
  //   const navigation = useNavigation();

  return (
    <View
      style={{
        //   width: "100%",
        backgroundColor: "#252525",
        padding: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 10,
        marginHorizontal: 20,
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
          {numberWithCommas(data.total_cost)}
        </Text>
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: 10,
          }}
        >
          {moment(data.created_at.split(" ")[0]).fromNow()}
        </Text>
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

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
          {data.id}
        </Text>
        <Text
          style={{
            color: "#F18921",
            alignSelf: "center",
            fontSize: 12,
            //  backgroundColor: "#292b2c",
            paddingHorizontal: 10,
            fontWeight: "bold",
            borderRadius: 8,
            paddingVertical: 5,
            borderColor: "#F18921",
            borderWidth: 1,
          }}
        >
          Pending
        </Text>
      </View>

      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          //  justifyContent: "flex-end",
          //    alignItems: "center",
        }}
      >
        <ScrollView
          //  showsHorizontalScrollIndicator={true}
          horizontal={true}
          contentContainerStyle={{}}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            {data.homogeneous_materials.map((item) => {
              return <SmallImage data={item} />;
            })}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            color: "white",
            textAlignVertical: "center",
          }}
        >
          Total Tonnage
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            color: "white",
            marginLeft: 10,

            textAlignVertical: "center",
          }}
        >
          {Number(data.total_tonnage).toFixed(2)} Kg
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#0A956A",
            borderRadius: 10,
            justifyContent: "center",
            paddingHorizontal: 20,
            // alignSelf: "flex-end",
            paddingVertical: 10,
            marginLeft: "auto",
          }}
          onPress={() => {
            navigation.navigate("CollectionHistoryDetail", data);
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HistoryCard;
