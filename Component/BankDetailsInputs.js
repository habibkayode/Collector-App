import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const BankDetailsInput = (props) => {
  const [banksData, setBankData] = useState({
    name: "",
    amount: "",
    accountNumber: "",
  });

  return (
    <>
      <RNPickerSelect
        placeholder={{
          label: "Bank",
          value: "default",
          color: "black",
        }}
        onValueChange={(value) => {
          setBankData((prev) => {
            return {
              ...prev,
              name: value,
            };
          });
        }}
        style={{
          viewContainer: {
            borderWidth: 1,
            borderColor: "#F18921",
            borderStyle: "solid",
            borderRadius: 10,
            marginBottom: 20,
            marginTop: 40,
          },
          inputAndroid: {
            color: "black",
            fontWeight: "700",
            fontSize: 18,
          },
        }}
        value={banksData.name}
        items={[
          { label: "Composite", value: "Composite", color: "black" },
          { label: "Composite 1", value: "1", color: "black" },
          { label: "Composite 2", value: "2", color: "black" },
        ]}
      />
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
          placeholder="Account Number"
          keyboardType="numeric"
          value={banksData.accountNumber}
          onChangeText={(value) => {
            setBankData((prev) => {
              return {
                ...prev,
                accountName: value,
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
          value={banksData.amount}
          onChangeText={(value) => {
            setBankData((prev) => {
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

export default BankDetailsInput;
