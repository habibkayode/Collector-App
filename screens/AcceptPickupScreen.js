import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Bgcover from "../Component/Bg/BackgroundCover";

const AcceptPickUp = ({ navigation }) => {
  return (
    <Bgcover>
      <View style={{}}>
        <Text style={{ fontWeight: "bold", fontSize: 40, textAlign: "center" }}>
          Accepted
        </Text>
        <View
          style={{
            width: 203,
            height: 203,
            borderColor: "#0A956A",
            borderWidth: 2,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 20,
            borderRadius: 110,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ marginTop: 30 }}
            source={require("../assets/check-big.png")}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            paddingHorizontal: 30,
            textAlign: "center",
            fontSize: 16,
            lineHeight: 18,
          }}
        >
          Request accepted, request has been added to your collection log and
          the user has been notified.
        </Text>
        <TouchableOpacity
          style={{
            height: 71,
            backgroundColor: "#0A956A",
            marginHorizontal: 30,
            borderRadius: 10,
            justifyContent: "center",
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate("CollectionLog");
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            View Collection Log
          </Text>
        </TouchableOpacity>
      </View>
    </Bgcover>
  );
};

export default AcceptPickUp;
