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

const CompositeModal = (props) => {
  let [classId, setClassId] = useState();
  let [item, setItem] = useState();
  let [description, setDescription] = useState();
  let [price, setPrice] = useState();
  let [showError, setShowError] = useState(false);
  let [itemName, setItemName] = useState();

  let handleSubmit = () => {
    if (!props.compositeObj.compositeClass || !props.compositeObj.itemId) {
      console.log(props.compositeObj, "submit");
      return setShowError(true);
    }
    props.handleSubmit();
  };

  // useEffect(() => {
  //   console.log(props.compositeMaterial, "composite material");
  //   let obj = props.compositeMaterial.find((k) => k.class_name === classId);
  //   if (obj) {
  //     let itemFind = obj.items.find((ele) => ele.item === item);
  //     setDescription(itemFind.description);
  //     console.log(itemFind.current_market_value, "price");
  //     setPrice(itemFind.current_market_value);
  //   }
  // });

  return (
    <Modal
      isVisible={props.showCompositeModal}
      onBackButtonPress={props.handleModalBackButton}
      style={styles.modal}
      animationInTiming={600}
      backdropOpacity={0.5}
    >
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <RNPickerSelect
          placeholder={{
            label: "Select class of Material",
            value: "default",
            color: "black",
          }}
          onValueChange={(value) => {
            props.setCompositeObj({
              compositeClass: value,
              materialType: "Composite",
            });
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
          value={props.compositeObj.compositeClass}
          // items={[
          //   { label: "Composite", value: "Composite", color: "black" },
          //   { label: "Composite 1", value: "1", color: "black" },
          //   { label: "Composite 2", value: "2", color: "black" },
          // ]}
          items={Object.keys(props.compositeMaterial).map((i) => {
            return {
              label: i,
              value: i,
              color: "black",
            };
          })}
        />
        <RNPickerSelect
          placeholder={{
            label: "Select class of Material",
            value: "default",
            color: "black",
          }}
          onValueChange={(value) => {
            console.log(value, "value item");

            let obj =
              props.compositeMaterial[props.compositeObj?.compositeClass];
            console.log(obj, "obj");
            if (obj) {
              let itemFind = obj.find(
                (ele) => Number(ele.id) === Number(value)
              );
              if (itemFind) {
                console.log(itemFind, "itemFind");
                props.setCompositeObj((prev) => ({
                  ...prev,
                  itemId: value,
                  price: itemFind.producer_commission,
                  description: itemFind.description,
                  itemName: itemFind.item,
                }));
              }
            }
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
          value={props.compositeObj.itemId}
          // items={[
          //   { label: "Composite", value: "Composite", color: "black" },
          //   { label: "Composite 1", value: "1", color: "black" },
          //   { label: "Composite 2", value: "2", color: "black" },
          // ]}
          items={
            props.compositeObj.compositeClass
              ? props.compositeMaterial[props.compositeObj.compositeClass]
                ? props.compositeMaterial[
                    props.compositeObj.compositeClass
                  ].map((k) => {
                    return {
                      label: k.item,
                      value: k.id,
                      color: "black",
                    };
                  })
                : {}
              : {}
          }
        />
        <Image source={require("../assets/image.png")} />
        <View style={styles.textAreaContainer}>
          <TextInput
            value={props.compositeObj.description}
            editable={false}
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Material description "
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
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
              Click here
            </Text>
          </Text>
        </View>
      </ScrollView>
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
    width: "90%",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    borderRadius: 20,
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

export default CompositeModal;
