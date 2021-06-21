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
import WalletCard from "../Component/WalletCard";
import WalletDetailsInput from "../Component/WalletInputDetails";
import Bgcover from "../Component/Bg/BackgroundCover";
import { walletToWalletTransfer } from "../Api/api";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    phoneNo: state.normal.userData.phone,
  };
};

const WalletToWalletScreen = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showBigCheck, setBigCheck] = useState(false);
  const [pinVaule, setPinValue] = useState();
  let [walletData, setWalletData] = useState();
  let pinRef = React.useRef();

  let makeTransfer = async () => {
    let payload = walletData;
    (payload.pin = pinVaule), (payload.phone = props.phoneNo);
    console.log(payload, "final payload from wallet");

    try {
      let response = await walletToWalletTransfer(payload);

      setBigCheck(true);
    } catch (e) {
      Alert.alert("Error", e.response.data.error);
    }
  };

  return (
    <Bgcover name="Wallet Transfer">
      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 40,
            }}
          >
            <WalletCard
              disable={true}
              onPress={() => {
                // setTogglePaymentType(true);
                // setPaymenthod("Wallet");
              }}
            />
          </View>

          <WalletDetailsInput
            sendFunc={(data) => {
              setWalletData(data);
              setShowModal(true);
            }}
          />
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
                    onTextChange={(code) => setPinValue(code)}
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
                      makeTransfer();
                      //  setBigCheck(true);
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

export default connect(mapStateToProps)(WalletToWalletScreen);
