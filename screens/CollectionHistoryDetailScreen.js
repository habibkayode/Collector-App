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

const CollectionHistoryDetailScreen = ({ navigation }) => {
  let data = useRoute().params;

  let newCreate = data.created_at.split(" ");
  let datePart = newCreate[0].split("-");
  datePart[1] = datePart[1] - 1;
  let timePart = newCreate[1].split(":");

  let createAt = new Date(...datePart, ...timePart);

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

          <Text style={styles.mainHeading}>Producer ID </Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>{data.producer_id}</Text>
            </View>
          </View>

          <Text style={styles.mainHeading}>Material Types{" & "}Tonnage</Text>
          <View style={styles.leftWrapper}>
            {data.homogeneous_materials.map((i) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{i.name}:</Text>
                  <Text>{i.pivot.tonnage}kg</Text>
                </View>
              );
            })}
          </View>

          <Text style={styles.mainHeading}>Total Tonnage</Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>{data.total_tonnage}kg</Text>
            </View>
          </View>

          <Text style={styles.mainHeading}>Estimated Commission</Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>
                {numberWithCommas(
                  data.homogeneous_materials.reduce((sum, curr) => {
                    return sum + Number(curr.collector_commission);
                  }, 0)
                )}
              </Text>
            </View>
          </View>

          <Text style={styles.mainHeading}>Estimated Cost of Goods</Text>
          <View style={styles.leftWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text>{numberWithCommas(data.cost)}</Text>
            </View>
          </View>

          <Text style={styles.mainHeading}>Offtake by agent </Text>
          {data.drop_off_status === "accepted" && (
            <>
              <View style={styles.leftWrapper}>
                <View style={{ flexDirection: "row" }}>
                  <Text>Mr Sunday Afuye </Text>
                </View>
              </View>

              <Text style={styles.mainHeading}>Agent Location </Text>
              <View style={styles.leftWrapper}>
                <View style={{ flexDirection: "row" }}>
                  <Text>5 Bayo Aderiye Street, Abule Egba Lagos State</Text>
                </View>
              </View>

              <Text style={styles.mainHeading}>Agent Phone number </Text>
              <View style={styles.leftWrapper}>
                <View style={{ flexDirection: "row" }}>
                  <Text>08035740541</Text>
                </View>
              </View>
            </>
          )}

          {data.drop_off_status === "pending" && (
            <>
              <View style={styles.leftWrapper}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "red" }}>Not yet given off </Text>
                </View>
              </View>
            </>
          )}
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
