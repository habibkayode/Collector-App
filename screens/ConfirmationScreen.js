import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import Bgcover from "../Component/Bg/BackgroundCover";
import { useRoute } from "@react-navigation/core";
import { numberWithCommas } from "../helper/helper";
import { connect } from "react-redux";
import { submitPickup } from "../Api/api";

const mapStateToProps = (state) => {
  // console.log(state.bluetooth.connected, "bluetoothstate");
  return {
    userData: state.normal.userData,
  };
};

const confirmationScreen = (props) => {
  let requestData = useRoute().params;
  const [code, setCode] = useState();
  const [disable, setDisable] = useState(true);

  const pinInput = React.createRef();

  let submitRequest = () => {
    let newMaterial = requestData.materials.map((i) => {
      console.log(i.materialType, "real material");
      if (i.materialType === "Composite") {
        console.log(i, "comp");
        let obj = {};
        obj.material_type = "Composite";
        obj.material_id = i.itemId;
        return obj;
      } else {
        let obj = {};
        obj.material_type = "Homogeneous";
        obj.tonnage = i.tonnage;
        obj.material_id = i.materialId;
        return obj;
      }
    });
    console.log(code);
    let payload = {
      total_cost: requestData.materials.reduce((prev, current) => {
        console.log(current.price, "price of cuure", prev);
        return prev + (current.price ? Number(current.price) : 0);
      }, 0),
      total_tonnage: requestData.materials.reduce((prev, current) => {
        if (current.materialsType !== "composite") {
          console.log(current.price, "tonnage of cuure", prev);
          return prev + (current.tonnage ? Number(current.tonnage) : 0);
        }

        return prev + 0;
      }, 0),
      payment_mode: requestData.mode,
      collector_id: props.userData.id,
      producer_id: requestData.producerId,
      materials: newMaterial,
      collector_pin: String(code),
    };
    console.log(payload);
    submitPickup(payload)
      .then(() => {
        props.navigation.navigate("PaymentConfirm");
      })
      .catch((e) => {
        Alert.alert(e.response.data.error);
        console.log(e.response.data.error);
      });
  };

  return (
    <Bgcover name="Confimation Page">
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
            marginBottom: 20,

            paddingHorizontal: 20,
          }}
        >
          You are about to pay{" "}
          {numberWithCommas(
            requestData.materials.reduce((prev, current) => {
              console.log(current.price, "price of cuure", prev);
              return prev + (current.price ? Number(current.price) : 0);
            }, 0)
          )}{" "}
          to{" "}
          {`${requestData.producerData.first_name} ${requestData.producerData.last_name}`}
        </Text>

        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            marginBottom: 20,
            paddingHorizontal: 20,
          }}
        >
          Input your wallet pin to confirm
        </Text>
        <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
          <SmoothPinCodeInput
            ref={pinInput}
            value={code}
            onTextChange={(code) => setCode(code)}
            cellStyle={{
              borderWidth: 2,
              borderColor: "#EF7700",
            }}
            cellStyleFocused={{
              borderColor: "darkorange",
              backgroundColor: "orange",
            }}
            onFulfill={() => {
              setDisable(false);
            }}
          />

          <TouchableOpacity
            disabled={disable}
            style={{
              height: 55,
              backgroundColor: "#0A956A",
              borderRadius: 10,
              justifyContent: "center",
              paddingHorizontal: 20,
              marginHorizontal: 20,
              marginTop: 40,
            }}
            onPress={() => {
              submitRequest();
              //  props.navigation.navigate("PaymentConfirm");
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Bgcover>
  );
};

export default connect(mapStateToProps)(confirmationScreen);
