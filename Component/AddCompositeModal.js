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

import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const AddComposite = (props) => {
  let [className, setClassName] = useState();
  let [item, setItem] = useState();
  let [description, setDescription] = useState();
  let [image, setImage] = useState();
  let [showError, setShowError] = useState(false);

  let handleSubmit = () => {
    if (!className || !item || !description) {
      return setShowError(true);
    }
    props.handleAddNewModalBackButton();
  };

  const pickAnImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (res) => {
      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      }
      if (res.uri) {
        console.log(res.uri);
        setImage(res.uri);
      }
    });
  };

  return (
    <Modal
      isVisible={props.showAddNewCompositeModal}
      onBackButtonPress={props.handleAddNewModalBackButton}
      style={styles.modal}
      animationInTiming={600}
      backdropOpacity={0.5}
    >
      <ScrollView style={{}} contentContainerStyle={styles.modalContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 20 }}>
          Add new composite material{" "}
        </Text>

        <View style={styles.textInputWrapper}>
          <TextInput
            placeholder="Composite material class"
            value={className}
            onChangeText={(value) => setClassName(value)}
            style={{ fontWeight: "bold", fontSize: 16 }}
          />
        </View>

        <View style={styles.textInputWrapper}>
          <TextInput
            placeholder="Item  name "
            value={item}
            onChangeText={(value) => setItem(value)}
            style={{ fontWeight: "bold", fontSize: 16 }}
          />
        </View>

        {image ? (
          <TouchableOpacity onPress={() => pickAnImage}>
            <Image source={{ uri: image }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => pickAnImage}>
            <Image source={require("../assets/image.png")} />
          </TouchableOpacity>
        )}
        <View style={styles.textAreaContainer}>
          <TextInput
            value={description}
            onChangeText={(value) => {
              setDescription(value);
            }}
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
    //  alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
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
  textInputWrapper: {
    borderColor: "#F18921",
    borderWidth: 1,
    borderStyle: "solid",
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    height: 50,
    alignSelf: "stretch",
  },
});

export default AddComposite;
