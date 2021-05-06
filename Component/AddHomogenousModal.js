import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import RNPickerSelect from "react-native-picker-select";
import { store } from "../Redux/store";

import { Button } from "native-base";

const HomogeneousModal = (props) => {
  let [showError, setShowError] = useState(false);
  let materialsObj = props.materialsObj;

  let handleSubmit = () => {
    // if (!props.homogenouesObj.id || !props.homogenouesObj.tonnage) {
    //   return setShowError(true);
    // }
    console.log("idid ");
    props.handleSubmit();
  };

  return (
    <Modal
      isVisible={props.homogeneousModalModal}
      onBackButtonPress={props.handleModalBackButton}
      style={styles.modal}
      animationInTiming={600}
      backdropOpacity={0.5}
    >
      <View style={styles.modalContainer}>
        <RNPickerSelect
          placeholder={{
            label: "Select Type of Material",
            value: "default",
            color: "black",
          }}
          onValueChange={(value) => {
            props.setHomogenouesObj((prev) => ({
              id: value,
              materialType: "Homogenoues",
              tonnage: null,
              price: null,

              // commission: materialsObj[value].collector_commission,
            }));
          }}
          style={{
            viewContainer: {
              borderWidth: 1,
              borderColor: "#F18921",
              borderStyle: "solid",
              borderRadius: 10,
              marginBottom: 20,
            },
            placeholder: {
              color: "black",
              fontWeight: "bold",
            },
            inputAndroid: {
              color: "black",
            },
          }}
          value={props.homogenouesObj.id}
          items={Object.keys(materialsObj).map((i, index) => {
            return {
              label: i,
              value: i,
              color: "black",
              key: index,
            };
          })}
          // items={Object.keys(materialsObj).map((i) => {
          //   console.log(i);
          //   return {
          //     label: i,
          //     value: i,
          //     color: "black",
          //   };
          // })}
        />

        {props.homogenouesObj.id ? (
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: `https://api.scrapays.com/storage/material_list_images/${
                props.materialsObj[props.homogenouesObj.id].image
              }`,
            }}
          />
        ) : (
          <Image source={require("../assets/image.png")} />
        )}
        <View
          style={{
            marginVertical: 20,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              borderColor: "#F18921",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 10,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "flex-start",
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {props.homogenouesObj.tonnage
                ? (props.homogenouesObj.tonnage + " Kg").trim()
                : "Tonnage in Kg"}
            </Text>
          </View>
          <Button
            style={{
              padding: 5,
              height: 50,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
            onPress={async () => {
              let value = await props.gettingValue();
              console.log(value, "val");
              props.setHomogenouesObj((prev) => ({
                ...prev,
                tonnage: value,
                price: value * materialsObj[prev.id].price,
                materialId: materialsObj[prev.id].id,
              }));
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Get Value
            </Text>
          </Button>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            padding: 10,
            backgroundColor: "#F18921",
            borderRadius: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 22,
              textAlign: "center",
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 20,
          }}
        >
          <Image
            source={require("../assets/mark.png")}
            style={{ alignSelf: "center", marginRight: 10 }}
          />
          <Text style={{ fontWeight: "bold" }}>
            Did not find the item?
            <Text
              style={{ color: "#F18921" }}
              onPress={props.showAddNewCompositeModal}
            >
              {"  "}
              Click here
            </Text>
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 0,
    position: "absolute",
    flex: 1,
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
    // alignItems: "center",
    width: "90%",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    borderRadius: 20,
    //alignSelf: "center",
  },
  textAreaContainer: {
    borderColor: "#F18921",
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    color: "black",
    //alignItems: "flex-start",
  },
});

export default HomogeneousModal;
