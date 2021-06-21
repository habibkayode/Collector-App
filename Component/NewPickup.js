import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Vibration,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { updatePickuAlert } from "../Redux/actionCreator";
import { store } from "../Redux/store";

const NewPickup = () => {
  let navigation = useNavigation();
  useEffect(() => {
    Vibration.vibrate([2000, 2000, 2000], true);

    setTimeout(() => {
      store.dispatch(updatePickuAlert(false));
      Vibration.cancel();
    }, 15000);
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
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
        }}
        onPress={() => {
          navigation.navigate("Pickup");
          Vibration.cancel();
          store.dispatch(updatePickuAlert(false));
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
          New Pickup request!
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default NewPickup;
