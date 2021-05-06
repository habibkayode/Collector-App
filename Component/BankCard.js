import React, { useEffect, useState } from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const BankCard = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      disabled={props.disable}
      style={{
        padding: 20,
        width: "45%",
        backgroundColor: "#C4C4C4",
        borderRadius: 8,
      }}
    >
      <Image source={require("../assets/bank.png")} />
      <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 24 }}>
        Bank
      </Text>
    </TouchableOpacity>
  );
};

export default BankCard;
