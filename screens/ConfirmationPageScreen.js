import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import { getAllPendingCollection, notifyAgent } from "../Api/api";

import { getDistanceAndTime } from "../Api/locationApi";
import Accordion from "../Component/Accordion";
import Bgcover from "../Component/Bg/BackgroundCover";

const mapStateToProps = (state) => {
  return {
    pendingCollection: state.normal.pendingCollection,
    materialsObj: state.normal.materialsObj,
    userLocation: state.location.coordinate,
  };
};

const ConfirmationPageScreen = ({
  navigation,
  pendingCollection,
  materialsObj,
  userLocation,
}) => {
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [allPendingColleciton, setAllPendingCollection] = useState([]);

  let [timeToLocation, setTimeToLocation] = useState();
  let [distanceApart, setDistanceApart] = useState();
  // const [totalTonnage,setTotalTonnage] = useState(0)
  let agentData = useRoute().params;

  useEffect(() => {
    // let curLocation = store.getState().location.coordinate;

    getDistanceAndTime(userLocation, {
      lat: agentData.userable.coordinates.lat,
      lng: agentData.userable.coordinates.lng,
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
  }, []);

  let getData = async (page = 1, refreshing = false) => {
    try {
      let response = await getAllPendingCollection(page, refreshing);
      setAllPendingCollection(response.data);
    } catch (error) {}
  };

  const notifyAgentWrapper = async () => {
    try {
      let response = await notifyAgent(agentData.id);

      navigation.navigate("AgentMap", agentData);
    } catch (error) {
      Alert.alert("Error", error.response?.data.error);
      navigation.navigate("AgentMap", agentData);
    }
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPages((prev) => prev + 1);
    getData(pages)
      .then(() => {})
      .finally(() => setLoadingMore(false));
    console.log("i am here handle load more");
  };

  const handleRefresh = () => {
    setPages(1);
    setRefreshing(true);
    getAllPendingCollection(1, true).then(() => setRefreshing(false));
  };

  useEffect(() => {
    getData(1);
  }, []);

  return (
    <Bgcover name="Confirmation Screen">
      <View style={{ flex: 1 }}>
        <View style={{ maxHeight: "100%", marginHorizontal: 20 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>
            Collections List
          </Text>

          <FlatList
            data={allPendingColleciton}
            renderItem={({ item }) => {
              return (
                <Accordion
                  data={item}
                  title={`${item.producer.first_name}  ${item.producer.last_name}`}
                ></Accordion>
              );
            }}
          ></FlatList>

          <View
            style={{
              marginTop: 20,
              // flexDirection: "row",
              // justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Estimated Time to Agent Location
            </Text>
            <Text style={{ fontSize: 15 }}>{timeToLocation}</Text>
          </View>

          <View
            style={{
              marginTop: 10,
              // flexDirection: "row",
              // justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Estimated distance to Agent Location
            </Text>
            <Text style={{ fontSize: 15 }}>{distanceApart}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              notifyAgentWrapper();
            }}
            style={{
              paddingHorizontal: 30,
              paddingVertical: 10,
              alignSelf: "flex-end",
              backgroundColor: "green",
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
              Notify Agent
            </Text>
          </TouchableOpacity>

          {/* 
      <ScrollView>
        {pendingCollection.map((ele) => {
          let newCreate = ele.created_at.split(" ");
          let datePart = newCreate[0].split("-");
          datePart[1] = datePart[1] - 1;
          let timePart = newCreate[1].split(":");

          let createAt = new Date(...datePart, ...timePart);

          return (
            <Accordion title={createAt} data={ele} allMaterial={materialsObj} />
          );
        })}
      </ScrollView> */}
          {/* <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              textAlign: "right",
              marginBottom: 10,
            }}
          >
            Tuesday February 10th 2021
          </Text>
          <Text style={styles.mainHeading}>Material Types{" & "}Tonnage</Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>Cartoon:</Text>
              <Text style={{ marginLeft: 20 }}>15kg</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>Cartoon:</Text>
              <Text style={{ marginLeft: 20 }}>15kg</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>Cartoon:</Text>
              <Text style={{ marginLeft: 20 }}>15kg</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>Cartoon:</Text>
              <Text style={{ marginLeft: 20 }}>15kg</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>Cartoon:</Text>
              <Text style={{ marginLeft: 20 }}>15kg</Text>
            </View>
          </View>

          <Text style={styles.mainHeading}>Total Tonnage</Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>100kg</Text>
            </View>
          </View>

          <Text style={styles.mainHeading}>
            Estimated Time to Agent Location
          </Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>1hr 15mins</Text>
            </View>
          </View>

          <Text style={styles.mainHeading}>Estimated Commission</Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>NGN 5,000</Text>
            </View>
          </View>

          <Text style={styles.mainHeading}>Estimated Cost of Goods</Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>NGN 50,000</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ConfirmTonnageByAgent");
            }}
            style={{
              paddingHorizontal: 30,
              paddingVertical: 10,
              alignSelf: "flex-end",
              backgroundColor: "green",
              borderRadius: 10,
              marginTop: 30,
            }}
          >
            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView> */}
        </View>
      </View>
    </Bgcover>
  );
};

const ListFooterComponent = () => (
  <View
    style={{
      position: "relative",
      width: "100%",
      height: 40,
      paddingVertical: 20,
      marginTop: 10,
      marginBottom: 10,
      borderColor: "#F18921",
      justifyContent: "center",
    }}
  >
    <ActivityIndicator animating size="large" color={"#F18921"} />
  </View>
);

const styles = StyleSheet.create({
  mainHeading: { fontSize: 15, fontWeight: "bold", marginTop: 20 },
  leftWrapper: { marginTop: 10, marginLeft: 20 },
});

export default connect(mapStateToProps)(ConfirmationPageScreen);
