import { View } from "native-base";
import React, { useEffect, useState } from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const PagaCard = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      disabled={props.disable}
      style={{
        padding: 20,
        width: "45%",
        backgroundColor: props.disable ? "#C4C4C4" : "#EDD3B9",
        borderRadius: 8,
      }}
    >
      <View
        style={{
          position: "absolute",
          width: "138%",
          height: "140%",
          zIndex: 4,
          //padding: 20,
          // alignSelf: "stretch",
          backgroundColor: "rgba(0,0,0,0.7)",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            alignSelf: "center",
          }}
        >
          Coming Soon
        </Text>
      </View>
      <Image style={{ marginTop: 5 }} source={require("../assets/paga.png")} />
      <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 24 }}>
        Paga
      </Text>
    </TouchableOpacity>
  );
};

export default PagaCard;
