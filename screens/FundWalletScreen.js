import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
  Alert,
  BackHandler,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { WebView } from "react-native-webview";

import RNPickerSelect from "react-native-picker-select";

import Bgcover from "../Component/Bg/BackgroundCover";

import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { connect } from "react-redux";
import {
  fundWallet,
  walletToWalletTransfer,
  initializeFunding,
} from "../Api/api";

const mapStateToProps = (state) => {
  return {
    phoneNo: state.normal.userData.phone,
    email: state.normal.userData.email,
  };
};

const FundWalletScreen = (props) => {
  const [showBigCheck, setBigCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPaystackModal, setPaystackShowModal] = useState(false);
  const [amount, setAmount] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [paymentLink, setPaymentLink] = useState();
  const [pinVaule, setPinValue] = useState();
  let pinRef = React.useRef();
  let webViewRef = React.useRef();
  let [data, setData] = useState({
    bank: "",
    cardNumber: "",
    cvv: "",
    expdate: "",
    pin: "",
    amount: "",
  });

  const callback_url = "https://app.scrapays.com/dashboard/collector";

  let initPaymentFun = async () => {
    let payload = {
      phone: props.phoneNo,
      amount: amount * 100,
      email: props.email,
    };
    try {
      let response = await initializeFunding(payload);
      setPaymentLink(response.data.authorization_url);
      setPaystackShowModal(true);
    } catch (e) {
      Alert.alert("Error", e.response.data.error);
    }
  };

  let send = async () => {
    let payload = {
      phone: props.phone,
      amount: data.amount,
      account_number: data.cardNumber,
      bank_code: data.bank,
      bank_name: props.bankList.find((k) => k.code === data.bank).name,
      pin: pinVaule,
    };
    try {
      let response = await fundWallet(payload);

      setBigCheck(true);
    } catch (e) {
      Alert.alert("Error", e.response.data.error);
    }
  };

  return (
    <Bgcover name="Fund Wallet">
      <View style={{ marginHorizontal: 20, flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            marginLeft: 20,
            marginBottom: 10,
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          Amount
        </Text>
        <View style={styles.longInputWrapper}>
          <TextInput
            placeholder="Amount"
            value={amount}
            keyboardType="number-pad"
            onChangeText={(value) => {
              // setData((prev) => {
              //   return {
              //     ...prev,
              //     amount: value,
              //   };
              // });

              setAmount(value);
            }}
          />
        </View>

        {/* <RNPickerSelect
          placeholder={{
            label: "Bank",
            value: "default",
            color: "black",
          }}
          onValueChange={(value) => {
            setData((prev) => {
              return {
                ...prev,
                bank: value,
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
              marginTop: 10,
            },
            inputAndroid: {
              color: "black",
              fontWeight: "700",
              fontSize: 18,
            },
          }}
          value={data.bank}
          items={props.bankList.map((i) => ({
            label: i.name,
            key: i.code,
            value: i.code,
          }))}
        />
        <View style={styles.longInputWrapper}>
          <TextInput
            placeholder="Card Number"
            onChangeText={(value) => {
              setData((prev) => {
                return {
                  ...prev,
                  cardNumber: value,
                };
              });
            }}
          />
        </View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <View style={styles.shorInputWrapper}>
            <TextInput
              placeholder="CVV"
              keyboardType="number-pad"
              onChangeText={(value) => {
                setData((prev) => {
                  return {
                    ...prev,
                    cvv: value,
                  };
                });
              }}
            />
          </View>
          <View style={styles.shorInputWrapper}>
            <TextInput
              placeholder="Exp Date"
              keyboardType="numbers-and-punctuation"
            />
          </View>
        </View>

        <View style={styles.longInputWrapper}>
          <TextInput
            placeholder="Card Pin"
            onChangeText={(value) => {
              setData((prev) => {
                return {
                  ...prev,
                  pin: value,
                };
              });
            }}
          /> 
        </View>
        */}

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            //  setBigCheck(true);
            //  setPaystackShowModal(true);
            initPaymentFun();
          }}
        >
          <Text style={styles.sendButtonText}>Proceed</Text>
        </TouchableOpacity>
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
      <Modal
        onRequestClose={() => {
          setPaystackShowModal(false);
          setPaymentLink();
          setAmount();
        }}
        style={[{ flex: 1 }]}
        visible={showPaystackModal}
        animationType="slide"
        transparent={false}
      >
        <WebView
          ref={(r) => (webViewRef.current = r)}
          style={[{ flex: 1 }]}
          source={{ uri: paymentLink }}
          onNavigationStateChange={(state) => {
            const { url } = state;

            console.log(
              state.canGoBack,
              "going back",
              url.split("?")[0] === callback_url,
              callback_url,
              url.split("?")[0]
            );
            console.log(url, "ppp");
            if (!url) {
              return;
            }
            if (url.split("?")) {
              console.log("in here");
              if (url.split("?")[0] === callback_url) {
                console.log(url.split("?")[0], "call back");
                console.log(url);
                setBigCheck(true);
                setShowModal(true);
                setTimeout(() => {
                  props.navigation.navigate("wallet");
                }, 2000);
                setPaystackShowModal(false);
              }
            }

            if (url === "https://standard.paystack.co/close") {
              // handle webview removal
              // You can either unmount the component, or
              // Use a navigator to pop off the view

              setBigCheck(true);
              setShowModal(true);
              setTimeout(() => {
                props.navigation.navigate("wallet");
              }, 2000);
              setPaystackShowModal(false);
            }
          }}
          onMessage={(e) => {
            console.log(e.nativeEvent.data);
            if (e.nativeEvent.data.event == "successful") {
            }
            setPaystackShowModal(false);
          }}
          onLoadStart={() => setisLoading(true)}
          onLoadEnd={() => setisLoading(false)}
        />

        {isLoading && (
          <View>
            <ActivityIndicator
              size="large"
              color={props.ActivityIndicatorColor}
            />
          </View>
        )}
      </Modal>
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
  longInputWrapper: {
    borderColor: "#F18921",
    borderWidth: 1,
    borderStyle: "solid",
    paddingHorizontal: 20,
    borderRadius: 10,
    // width: "47%",
    height: 50,
    marginBottom: 20,
  },
  shorInputWrapper: {
    borderColor: "#F18921",
    borderWidth: 1,
    borderStyle: "solid",
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "47%",
    height: 50,
    marginBottom: 20,
  },
});

export default connect(mapStateToProps)(FundWalletScreen);
