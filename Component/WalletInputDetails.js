import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { getUserName } from "../Api/api";
import RadioButtonRN from "radio-buttons-react-native";

const WalletDetailsInput = (props) => {
  const [pagaData, setPagaData] = useState({
    phone: "",
    amount: "",
    type: "",
  });
  const [userDetails, setUserDetails] = useState({});

  let getDetails = async (value) => {
    try {
      let response = await getUserName(value);
      setUserDetails(response.data);
    } catch (e) {
      console.log(e);

      if (e.response.data.error === "Not Found.") {
        Alert.alert(
          "Notice",
          `User with the phone number ${value} is currently not registered with Scrapays.Kindly confirm if you will like to proceed  to credit this User.`,
          [
            {
              text: "Proceed",
              onPress: () => {
                Alert.alert(
                  "Notice",
                  "No worries 😁, Transfers can be made to anyone and they will get a credit SMS with instructions to access the funds. "
                );
              },
              style: "Cancel",
            },
            {
              text: "No",
              onPress: () => {
                setPagaData((prev) => ({ ...prev, phone: "" }));
              },
              style: "destructive",
            },
          ],
          {
            cancelable: false,
          }
        );
      } else {
        Alert.alert("Error", e.response.data.error);
      }
    }
  };

  let makeTransfer = () => {
    let payload = {
      // full_name: pagaData.fullName,
      amount: pagaData.amount,
      beneficiary: pagaData.phone,
      type: pagaData.type,
    };
    props.sendFunc(payload);
  };

  const radioData = [
    {
      label: props.cog ? "Commission Account" : "Main Account",
    },
    {
      label: "Another Wallet",
    },
  ];

  return (
    <>
      <RadioButtonRN
        activeColor="#F18921"
        data={radioData}
        selectedBtn={(e, i) => {
          console.log(e, i);
          setPagaData((prev) => ({ ...prev, type: e.label }));
        }}
        textStyle={{ fontWeight: "bold" }}
      />
      {pagaData.type === "Another Wallet" && (
        <View style={[styles.inputWrapper]}>
          <TextInput
            placeholder="User Phone no"
            keyboardType="phone-pad"
            value={pagaData.phone}
            onChangeText={(value) => {
              if (value.length < 12) {
                setPagaData((prev) => {
                  return {
                    ...prev,
                    phone: value,
                  };
                });

                if (value.length === 11) {
                  getDetails(value);
                } else {
                  setUserDetails({});
                }
              }
            }}
            style={{ fontWeight: "bold", fontSize: 16 }}
          />
        </View>
      )}
      {pagaData.type === "Another Wallet" && userDetails.Name && (
        <View style={[styles.inputWrapper, { justifyContent: "center" }]}>
          <Text style={{ textAlignVertical: "center", fontWeight: "bold" }}>
            {userDetails.Name}
          </Text>
          {/* <TextInput
          placeholder="Full name"
          value={pagaData.fullName}
          onChangeText={(value) => {
            setPagaData((prev) => {
              return {
                ...prev,
                fullName: value,
              };
            });
          }}
          style={{ fontWeight: "bold", fontSize: 16 }}
        /> */}
        </View>
      )}
      <View style={[styles.inputWrapper]}>
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
          makeTransfer();
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
  inputWrapper: {
    borderColor: "#F18921",
    borderWidth: 1,
    borderStyle: "solid",
    paddingHorizontal: 20,
    borderRadius: 10,
    // width: "47%",
    height: 50,
    marginTop: 10,
  },
});
export default WalletDetailsInput;
