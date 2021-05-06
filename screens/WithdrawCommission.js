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
  Modal,
} from "react-native";
import * as Animatable from "react-native-animatable";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import Airtime from "../Component/AirtimeCard";
import AirttimeInputDetails from "../Component/AirtimeInputsDetails";
import BankCard from "../Component/BankCard";
import BankDetailsInput from "../Component/BankDetailsInputs";
import Bgcover from "../Component/Bg/BackgroundCover";
import PagaCard from "../Component/PagaCard";
import PagaDetailsInput from "../Component/PagaDetailsInput";

const WithdrawComission = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showBigCheck, setBigCheck] = useState(false);
  const [togglePaymentType, setTogglePaymentType] = useState("bank");
  const [pinVaule, setPinValue] = useState();
  let pinRef = React.useRef();

  return (
    <Bgcover name="Withdraw Commission">
      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <BankCard
              disable={!togglePaymentType}
              onPress={() => {
                setTogglePaymentType("bank");
              }}
            />
            <PagaCard
              disable={togglePaymentType === "paga"}
              onPress={() => {
                setTogglePaymentType("paga");
                console.log("poo");
              }}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Airtime
              disable={togglePaymentType === "airtime"}
              onPress={() => {
                setTogglePaymentType("airtime");
                console.log("poo");
              }}
            />
          </View>
          {togglePaymentType == "bank" && (
            <BankDetailsInput
              sendFunc={() => {
                setShowModal(true);
              }}
            />
          )}
          {togglePaymentType == "paga" && (
            <PagaDetailsInput
              sendFunc={() => {
                setShowModal(true);
              }}
            />
          )}

          {togglePaymentType == "airtime" && (
            <AirttimeInputDetails
              sendFunc={() => {
                setShowModal(true);
              }}
            />
          )}
        </View>
        <Modal
          visible={showModal}
          transparent={true}
          style={[
            {
              flex: 1,
            },
          ]}
          onRequestClose={() => {
            setBigCheck(false);
            setShowModal(false);
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {showBigCheck ? (
              <>
                <View
                  style={{
                    width: 203,
                    height: 203,
                    borderColor: "#0A956A",
                    borderWidth: 2,
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderRadius: 110,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                  }}
                >
                  <Image
                    style={{ marginTop: 30 }}
                    source={require("../assets/check-big.png")}
                  />
                </View>
                <Text
                  style={{
                    marginTop: 20,
                    paddingHorizontal: 30,
                    textAlign: "center",
                    fontSize: 16,
                    lineHeight: 18,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Funds sent
                </Text>
              </>
            ) : (
              <View
                style={{
                  marginHorizontal: 20,
                  paddingVertical: 30,
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 30,
                    marginHorizontal: 20,
                  }}
                >
                  Input your wallet pin
                </Text>
                <View style={{ alignSelf: "center", marginRight: 20 }}>
                  <SmoothPinCodeInput
                    ref={pinRef}
                    value={pinVaule}
                    onTextChange={(code) => setValues(setPinValue(code))}
                    onFulfill={() => {}}
                    cellStyle={{
                      borderWidth: 2,
                      borderColor: "#EF7700",
                      marginLeft: 20,
                    }}
                    cellStyleFocused={{
                      borderColor: "darkorange",
                      backgroundColor: "orange",
                    }}
                  />
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {
                      setBigCheck(true);
                    }}
                  >
                    <Text style={styles.sendButtonText}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </Modal>
      </ScrollView>
    </Bgcover>
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

export default WithdrawComission;
