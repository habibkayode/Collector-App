import React, { useEffect, useState } from "react";
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
  TouchableWithoutFeedback,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Bgcover from "../Component/Bg/BackgroundCover";

const WalletDetailScreen = () => {
  return (
    <Bgcover name="Transaction Details">
      <View style={{ marginHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            textAlign: "right",
            marginBottom: 10,
          }}
        >
          {new Date().toLocaleString()}
        </Text>

        <Text style={styles.mainHeading}>Transaction Id </Text>
        <View style={styles.leftWrapper}>
          <Text>1234567</Text>
        </View>

        <Text style={styles.mainHeading}>Transaction Type</Text>
        <View style={styles.leftWrapper}>
          <Text>Withdrawal</Text>
        </View>

        <Text style={styles.mainHeading}>Transaction Amount</Text>
        <View style={styles.leftWrapper}>
          <Text> 3000.00</Text>
        </View>
        <Text style={styles.mainHeading}>Other Details</Text>
        <View style={styles.leftWrapper}></View>
      </View>
    </Bgcover>
  );
};

const styles = StyleSheet.create({
  mainHeading: { fontSize: 15, fontWeight: "bold", marginTop: 20 },
  leftWrapper: { marginTop: 10, marginLeft: 20 },
});

export default WalletDetailScreen;
