import React, { useState } from "react";
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
import Bgcover from "../Component/Bg/BackgroundCover";

const ConfirmTonnageByAgent = ({ navigation }) => {
  const [confirm, setConfirm] = useState(false);
  const [notConfirm, setNotCofirm] = useState(false);

  const redirectFunc = () => {
    navigation.navigate("ProcessPickup");
  };
  return (
    <Bgcover name="Confirm tonnage received by agent">
      <View style={{ marginHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            textAlign: "right",
            marginBottom: 10,
          }}
        >
          Tuesday February 10th 2021
        </Text>
        <Text style={styles.mainHeading}>Material Types{" & "}Tonnage</Text>
        <View style={styles.leftWrapper}>
          <View style={{ flexDirection: "row" }}>
            <Text>Cartoon:</Text>
            <Text style={{ marginLeft: 20 }}>15kg</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Cartoon:</Text>
            <Text style={{ marginLeft: 20 }}>15kg</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Cartoon:</Text>
            <Text style={{ marginLeft: 20 }}>15kg</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Cartoon:</Text>
            <Text style={{ marginLeft: 20 }}>15kg</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Cartoon:</Text>
            <Text style={{ marginLeft: 20 }}>15kg</Text>
          </View>
        </View>
      </View>

      <Text style={([styles.mainHeading], { marginLeft: 20 })}>
        Total Tonnage
      </Text>
      <View style={styles.leftWrapper}>
        <View style={{ flexDirection: "row" }}>
          <Text>100kg</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 30,
        }}
      >
        <TouchableOpacity
          style={{
            height: 55,
            backgroundColor: "#0A956A",
            borderRadius: 10,
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
          onPress={() => {
            setConfirm(true);
            //  props.navigation.navigate("confirmation");
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
            Input correct
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 55,
            backgroundColor: "#E50202",
            borderRadius: 10,
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
          onPress={() => {
            setNotCofirm(true);
            //   props.navigation.navigate("confirmation");
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
            Input Wrong
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        style={[
          {
            flex: 1,
          },
        ]}
        onRequestClose={() => {
          setConfirm(false);
        }}
        visible={confirm}
      >
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            flex: 1,
            justifyContent: "center",
          }}
        >
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
            Tonnage confirmed with agent input
          </Text>
        </View>
      </Modal>

      <Modal
        transparent={true}
        style={[
          {
            flex: 1,
          },
        ]}
        onRequestClose={() => {
          setNotCofirm(false);
        }}
        visible={notConfirm}
      >
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 203,
              height: 203,
              borderColor: "#D10B0B",
              borderWidth: 2,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 110,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <Image style={{}} source={require("../assets/X.png")} />
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
            Tonnage not confirmed with agent input{" "}
          </Text>

          <Text
            style={{
              marginTop: 40,
              paddingHorizontal: 30,
              textAlign: "center",
              fontSize: 14,
              lineHeight: 18,
              color: "white",
            }}
          >
            *Please sort with agent or call support on 08139122188
          </Text>
        </View>
      </Modal>
    </Bgcover>
  );
};

const styles = StyleSheet.create({
  mainHeading: { fontSize: 15, fontWeight: "bold", marginTop: 20 },
  leftWrapper: { marginTop: 10, marginLeft: 20 },
});

export default ConfirmTonnageByAgent;
