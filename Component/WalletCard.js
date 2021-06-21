import React, { useEffect, useState } from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const WalletCard = (props) => {
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
      <Image
        style={{ marginTop: 5 }}
        source={require("../assets/wallet-new.png")}
      />
      <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 24 }}>
        Wallet transfer
      </Text>
    </TouchableOpacity>
  );
};

export default WalletCard;
