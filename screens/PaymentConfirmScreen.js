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

const PaymentConfirm = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/background/bg1.jpg")}
      style={{ height: "100%", width: "100%" }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: 20,
          marginBottom: 20,
          marginTop: 120,
        }}
      >
        <Image source={require("../assets/menu2.png")} />
      </View>
      <View style={{}}>
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
            fontSize: 28,
          }}
        >
          Payment Successful
        </Text>
        <TouchableOpacity
          style={{
            height: 55,
            backgroundColor: "#0A956A",
            borderRadius: 10,
            justifyContent: "center",
            paddingHorizontal: 20,
            marginHorizontal: 20,
            marginTop: 40,
          }}
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default PaymentConfirm;
