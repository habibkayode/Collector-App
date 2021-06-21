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

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { updateMessageAlert } from "../Redux/actionCreator";
import { store } from "../Redux/store";
const NewMessage = () => {
  let navigation = useNavigation();
  useEffect(() => {
    Vibration.vibrate([2000, 2000, 2000], true);
    setTimeout(() => {
      Vibration.cancel();
      store.dispatch(updateMessageAlert(false));
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
        style={{ flexDirection: "row" }}
        onPress={() => {
          navigation.navigate("Message");
          Vibration.cancel();
          store.dispatch(updateMessageAlert(false));
        }}
      >
        <MaterialCommunityIcons
          name="message-reply-text"
          color="rgba(239, 119, 0, 0.87)"
          size={20}
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
          New Message
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default NewMessage;
