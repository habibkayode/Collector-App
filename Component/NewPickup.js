import React, { useEffect } from "react";
import { View, Text, Vibration, StatusBar } from "react-native";
import * as Animatable from "react-native-animatable";

const NewPickup = () => {
  useEffect(() => {
    Vibration.vibrate(10000);
  }, []);

  return (
    <Animatable.View
      animation="rubberBand"
      // duration={500000}
      iterationCount={"infinite"}
      //delay={0}
      style={{
        zIndex: 10,
        marginTop: StatusBar.currentHeight + 10,
        borderWidth: 2,
        borderColor: "#64D3F6",
        borderRadius: 4,
        backgroundColor: "rgba(216, 241, 249, 0.7)",
        padding: 10,
        position: "absolute",
        alignSelf: "center",
        flexDirection: "row",
      }}
    >
      <Animatable.Image
        source={require("../assets/bell-2.png")}
        // duration={10000}
        //iterationCount={"infinite"}
        // animation="rubberBand"
      />
      <Text
        style={{
          color: "#41CDFA",
          fontWeight: "bold",
          fontSize: 15,
          marginLeft: 5,
          textAlignVertical: "center",
        }}
      >
        New Request!
      </Text>
    </Animatable.View>
  );
};

export default NewPickup;
