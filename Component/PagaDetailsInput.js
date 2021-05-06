import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const PagaDetailsInput = (props) => {
  const [pagaData, setPagaData] = useState({
    pin: "",
    amount: "",
  });

  return (
    <>
      <View
        style={{
          borderColor: "#F18921",
          borderWidth: 1,
          borderStyle: "solid",
          paddingHorizontal: 20,
          borderRadius: 10,
          // width: "47%",
          height: 50,
          marginBottom: 20,
          marginTop: 40,
        }}
      >
        <TextInput
          secureTextEntry={true}
          placeholder="Paga Pin"
          keyboardType="numeric"
          value={pagaData.pin}
          onChangeText={(value) => {
            setPagaData((prev) => {
              return {
                ...prev,
                pin: value,
              };
            });
          }}
          style={{ fontWeight: "bold", fontSize: 16 }}
        />
      </View>
      <View
        style={{
          borderColor: "#F18921",
          borderWidth: 1,
          borderStyle: "solid",
          paddingHorizontal: 20,
          borderRadius: 10,
          // width: "47%",
          height: 50,
          marginBottom: 20,
        }}
      >
        <TextInput
          placeholder="Amount"
          keyboardType="numeric"
          value={pagaData.amount}
          onChangeText={(value) => {
            setPagaData((prev) => {
              return {
                ...prev,
                amount: value,
              };
            });
          }}
          style={{ fontWeight: "bold", fontSize: 16 }}
        />
      </View>

      <TouchableOpacity
        style={styles.sendButton}
        onPress={() => {
          props.sendFunc();
        }}
      >
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  sendButton: {
    height: 55,
    backgroundColor: "#0A956A",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 40,
    marginHorizontal: 20,
    marginTop: 40,
    alignSelf: "center",
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
export default PagaDetailsInput;
