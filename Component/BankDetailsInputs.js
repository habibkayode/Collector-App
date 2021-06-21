import { objectPrototype } from "mobx/dist/internal";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { getAccountName } from "../Api/api";
import { store } from "../Redux/store";

let emptyObj = {
  name: "",
  amount: "",
  accountNumber: "",
  accountName: "",
};

const BankDetailsInput = (props) => {
  const [banksData, setBankData] = useState(emptyObj);
  let [accountDetails, setAccountDetails] = useState({});
  let bankList = store.getState().normal.bankList;

  let sendData = () => {
    let payload = {};
    payload.amount = banksData.amount;
    payload.account_number = banksData.accountNumber;
    payload.account_name = banksData.accountName;
    payload.bank_code = banksData.name;
    payload.account_name = accountDetails.account_name;
    payload.bank_name = bankList.find((k) => k.code === banksData.name).name;
    console.log(payload, "bank payload");

    props.sendFunc(payload);
  };

  let getAccountDetail = async () => {
    try {
      let response = await getAccountName({
        bankCode: banksData.name,
        account: banksData.accountNumber,
      });
      setAccountDetails(response.data);
    } catch (e) {
      Alert.alert("Error", e.response.data.error);
    }
  };

  useEffect(() => {
    if (banksData.name && banksData.accountNumber.length === 10) {
      getAccountDetail();
    } else {
      setAccountDetails({});
    }
  }, [banksData.name, banksData.accountNumber]);

  return (
    <>
      <RNPickerSelect
        placeholder={{
          label: "Bank",
          value: "",
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
        // items={[
        //   { label: "Composite", value: "Composite", color: "black" },
        //   { label: "Composite 1", value: "1", color: "black" },
        //   { label: "Composite 2", value: "2", color: "black" },
        // ]}

        items={bankList.map((i) => ({
          label: i.name,
          key: i.code,
          value: i.code,
        }))}
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
            if (value.length < 11) {
              setBankData((prev) => {
                return {
                  ...prev,
                  accountNumber: value,
                };
              });
            }
          }}
          style={{ fontWeight: "bold", fontSize: 16 }}
        />
      </View>

      {accountDetails.account_name && (
        <View
          style={[
            {
              borderColor: "#F18921",
              borderWidth: 1,
              borderStyle: "solid",
              paddingHorizontal: 20,
              borderRadius: 10,
              // width: "47%",
              height: 50,
              marginBottom: 20,
            },
            { justifyContent: "center" },
          ]}
        >
          <Text style={{ textAlignVertical: "center", fontWeight: "bold" }}>
            {accountDetails.account_name}
          </Text>
        </View>
      )}

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
          sendData();
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
