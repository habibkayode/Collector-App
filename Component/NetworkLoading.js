import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const NetworkLoading = (props) => {
  return (
    <View style={styles.container}>
      <Spinner
        color="#EF7700"
        visible={true}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
};

export default NetworkLoading;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#EF7700",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
