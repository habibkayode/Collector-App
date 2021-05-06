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
        backgroundColor: "#EDD3B9",
        borderRadius: 8,
      }}
    >
      <Image style={{ marginTop: 5 }} source={require("../assets/paga.png")} />
      <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 24 }}>
        Paga
      </Text>
    </TouchableOpacity>
  );
};

export default PagaCard;
