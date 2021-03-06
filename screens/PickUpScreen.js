import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  getSingleCollectorPickUp,
  getAllSingleCollectorPickUp,
} from "../Api/api";
import PickUpCard from "../Component/PickUpCard";
import { connect } from "react-redux";
import Bgcover from "../Component/Bg/BackgroundCover";
import { useFocusEffect } from "@react-navigation/native";

const mapStateToProps = (state) => {
  return {
    pickupData: state.normal.pickupRequests,
    materials: state.normal.materials,
  };
};

const PickupScreen = (props) => {
  const [searchText, setSearchTex] = useState();
  const [data, setData] = useState(props.pickupData);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [allPickup, setAllPickup] = useState([]);

  // useEffect(() => {
  //   setData(props.pickupData);
  // }, [props.pickupData]);

  let getPickup = async () => {
    getSingleCollectorPickUp();
  };

  let getAllPickup = async () => {
    try {
      let response = await getAllSingleCollectorPickUp();
      setAllPickup(response);
      setData(response);
    } catch (e) {
      console.log(e, "error in all pickup");
    }
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setLoading(true);
      getAllPickup().then(() => {
        setSearchTex("");
        setLoading(false);
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    getPickup(pages + 1)
      .then(() => {
        setPages(pages + 1);
      })
      .finally(() => setLoadingMore(false));
    csole.log("i am here handle load more");
  };

  const handleTextChange = (values) => {
    let newState = allPickup.filter((ele) => {
      let eleValue = ele.producer_name.toUpperCase();
      let valueCap = values.toUpperCase();
      return eleValue.indexOf(valueCap) > -1;
    });

    setData(newState);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getAllPickup().then(() => {
      setSearchTex("");
      setRefreshing(false);
    });
  };
  // const handleRefresh = () => {
  //   setPages(1);
  //   setRefreshing(true);
  //   getSingleCollectorPickUp(1, true).then(() => setRefreshing(false));
  // };

  // useEffect(() => {
  //   getSingleCollectorPickUp(1, true).then(() => setLoading(false));
  // }, []);

  return (
    <Bgcover name="New Pickup Request ">
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#F18921" />
        </View>
      ) : (
        <>
          <View
            style={{
              paddingHorizontal: 10,
              marginHorizontal: 20,
              height: 50,
              backgroundColor: "#F0F0F0",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Image
              style={{ marginRight: 10 }}
              source={require("../assets/loupe1.png")}
            />
            <TextInput
              placeholder="search for new request"
              placeholderTextColor="#D3D3D3"
              style={{ fontSize: 15, fontWeight: "bold", flex: 1 }}
              onChangeText={handleTextChange}
            />
          </View>
          {data.length === 0 && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // flex: 1,
                // position: "absolute",
                width: "100%",
                height: "100%",
                //backgroundColor: "red",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#F18921",
                }}
              >
                ... No Pick Data yet
              </Text>
            </View>
          )}
          <FlatList
            // ListEmptyComponent={() => {
            //   return (
            //     <View
            //       style={{
            //         alignItems: "center",
            //         justifyContent: "center",
            //         // flex: 1,
            //         // position: "absolute",
            //         width: "100%",
            //         height: "100%",
            //         backgroundColor: "red",
            //       }}
            //     >
            //       <Text
            //         style={{
            //           fontWeight: "bold",
            //           fontSize: 20,
            //           color: "#F18921",
            //         }}
            //       >
            //         No Pick Data yet
            //       </Text>
            //     </View>
            //   );
            // }}
            contentContainerStyle={{ marginHorizontal: 20 }}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            data={data}
            renderItem={({ item }) => {
              return <PickUpCard data={item} />;
            }}
            keyExtractor={(item, index) => {
              return index;
            }}
            //extraData={props}
            //onEndReached={handleLoadMore}
            // onEndReachedThreshold={0.5}
            //initialNumToRender={10}
          />

          {/* 
          <FlatList
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    No Pick Data yet
                  </Text>
                </View>
              );
            }}
            contentContainerStyle={{ marginHorizontal: 20 }}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            data={data}
            renderItem={({ item }) => {
              return <PickUpCard data={item} />;
            }}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            extraData={props}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            ListFooterComponent={() =>
              loadingMore ? <ListFooterComponent /> : null
            }
          /> */}
        </>
      )}
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

export default connect(mapStateToProps, null)(PickupScreen);
