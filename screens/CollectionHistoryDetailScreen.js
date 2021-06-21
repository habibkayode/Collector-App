import { useRoute } from "@react-navigation/core";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Bgcover from "../Component/Bg/BackgroundCover";
import { numberWithCommas } from "../helper/helper";

let rr = {
  address: "Lagos, Nigeria",
  agent: {
    first_name: "Agent",
    id: "PISJ98",
    last_name: "Two",
    location: null,
    phone: "09487728827",
    security_question_id: null,
    userable: null,
  },
  agent_id: "PISJ98",
  collection_type: null,
  collector: {
    first_name: "Boluwatife",
    id: "BRY9FYBDX",
    last_name: "Collector1",
    location: null,
    phone: "0701123875155",
    security_question_id: null,
    userable: null,
  },
  collector_id: "BRY9FYBDX",
  composite_id: null,
  composite_materials: [
    {
      class: "Generator",
      collector_commission: "664",
      id: 4,
      item: "Big generator",
      pivot: [Object],
      producer_commission: "5146",
    },
  ],
  created_at: "2021-05-11T12:48:35.000000Z",
  deleted_at: null,
  drop_off_id: null,
  drop_off_status: "accepted",
  homogeneous_id: null,
  homogeneous_materials: [],
  id: "5CHKX4",
  location: null,
  location_id: 0,
  material_state: null,
  materials: [{ composite_id: 4, material_type: "Composite" }],
  payment_mode: "cash",
  pickup_id: null,
  producer: {
    first_name: "Peter",
    id: "039MCKSK1",
    last_name: "Mr",
    location: null,
    phone: "081182223341",
    security_question_id: null,
    userable: null,
  },
  producer_commission: 5146,
  producer_id: "039MCKSK1",
  producer_type: "Household",
  total_cost: "5146",
  total_tonnage: "0",
};

const CollectionHistoryDetailScreen = ({ navigation }) => {
  let data = useRoute().params;
  console.log(data);

  // let newCreate = data.created_at.split(" ");
  // let datePart = newCreate[0].split("-");
  // datePart[1] = datePart[1] - 1;
  // let timePart = newCreate[1].split(":");

  //  let createAt = new Date(...datePart, ...timePart);

  let createAt = new Date(data.created_at);

  const redirectFunc = () => {
    navigation.navigate("ProcessPickup");
  };
  return (
    <Bgcover name="Collection History">
      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              textAlign: "right",
              marginBottom: 10,
            }}
          >
            {createAt.toLocaleString()}
          </Text>

          <Text style={styles.mainHeading}>Producer Name </Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>
                {data.producer.last_name} {data.producer.first_name}
              </Text>
            </View>
          </View>
          <Text style={styles.mainHeading}>Producer Number </Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>{data.producer.phone}</Text>
            </View>
          </View>

          <Text style={styles.mainHeading}>
            Per-kilo Materials {" & "}Tonnage
          </Text>
          <View style={{}}>
            {data.homogeneous_materials.map((i) => {
              console.log(i.pivot);
              return (
                <View
                  style={{
                    padding: 20,
                    paddingVertical: 10,
                    borderRadius: 10,
                    // marginBottom: 10,
                    paddingTop: 5,
                    // borderColor: "#F18921",
                    //   borderWidth: 1,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 3,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "black" }}>
                      {i.name}
                    </Text>

                    <Text style={{ fontSize: 16, color: "black" }}>
                      {i.pivot.tonnage}kg
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 3,
                    }}
                  >
                    <Text>Cost Price</Text>
                    <Text>
                      {numberWithCommas(
                        Number(i.producer_commission) * Number(i.pivot.tonnage)
                      )}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 3,
                    }}
                  >
                    <Text>Commission</Text>
                    <Text>
                      {numberWithCommas(
                        Number(i.collector_commission) * Number(i.pivot.tonnage)
                      )}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <Text style={styles.mainHeading}>Household Materials </Text>
          <View style={{}}>
            {data.composite_materials.map((i) => {
              return (
                <View
                  style={{
                    padding: 20,
                    paddingVertical: 10,
                    borderRadius: 10,
                    // marginBottom: 10,
                    paddingTop: 5,
                    // borderColor: "#F18921",
                    //   borderWidth: 1,
                  }}
                >
                  <Text style={{ fontSize: 16, color: "black" }}>{i.item}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 3,
                    }}
                  >
                    <Text>Cost Price</Text>
                    <Text>
                      {numberWithCommas(
                        Number(i.collector_commission) +
                          Number(i.producer_commission)
                      )}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 3,
                    }}
                  >
                    <Text>Commission</Text>
                    <Text>
                      {numberWithCommas(Number(i.collector_commission))}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <Text style={styles.mainHeading}>Total Tonnage</Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>{Number(data.total_tonnage).toFixed(2)} Kg</Text>
            </View>
          </View>

          <Text style={styles.mainHeading}>Estimated Commission</Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>{numberWithCommas(data.collector_commission)}</Text>
            </View>
          </View>

          <Text style={styles.mainHeading}>Estimated Cost of Goods</Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>{numberWithCommas(Number(data.producer_commission))}</Text>
            </View>
          </View>

          <Text style={styles.mainHeading}>Offtake by agent </Text>
          {data.drop_off_status !== "droppedoff" ? (
            <View style={styles.leftWrapper}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "red" }}>Not yet given off </Text>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.leftWrapper}>
                <View style={{ flexDirection: "row" }}>
                  <Text>
                    {data.agent.first_name} {data.agent.last_name}
                  </Text>
                </View>
              </View>

              <Text style={styles.mainHeading}>Agent Location </Text>
              <View style={styles.leftWrapper}>
                {/* <View style={{ flexDirection: "row" }}>
                  <Text>5 Bayo Aderiye Street, Abule Egba Lagos State</Text>
                </View> */}
              </View>

              <Text style={styles.mainHeading}>Agent Phone number </Text>
              <View style={styles.leftWrapper}>
                <View style={{ flexDirection: "row" }}>
                  <Text>{data.agent.phone}</Text>
                </View>
              </View>
            </>
          )}

          {/* // {data.drop_off_status !== "droppedoff" ? (
          //   <View style={styles.leftWrapper}>
          //     <View style={{ flexDirection: "row" }}>
          //       <Text style={{ color: "red" }}>Not yet given off </Text>
          //     </View>
          //   </View>
          // ) : (
          //   <View style={styles.leftWrapper}>
          //     <View style={{ flexDirection: "row" }}>
          //       <Text style={{ color: "red" }}> </Text>
          //     </View>
          //   </View>
          // )} */}
        </View>
      </ScrollView>
    </Bgcover>
  );
};

const styles = StyleSheet.create({
  mainHeading: { fontSize: 15, fontWeight: "bold", marginTop: 20 },
  leftWrapper: { marginTop: 10, marginLeft: 20 },
});

export default CollectionHistoryDetailScreen;
