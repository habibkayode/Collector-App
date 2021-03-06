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
} from "react-native";
import * as Animatable from "react-native-animatable";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { connect } from "react-redux";
import Bgcover from "../Component/Bg/BackgroundCover";

const mapStateToProps = (state) => {
  return {
    userData: state.normal.userData,
  };
};

const BulkOfTakeScreen = ({ navigation, userData }) => {
  const [materialType, setMaterialType] = useState();
  const [tonnage, setTonnage] = useState(0);
  const [pickedImage, setPickedImage] = useState([]);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [showError, setShowError] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [contactNumber, setContactNumber] = useState("");
  const [contactName, setContactName] = useState("");

  const submitBulkOffTake = () => {
    if (
      address.trim().length < 5 ||
      description.trim().length < 5 ||
      contactName.trim().length < 3 ||
      contactNumber.trim().length !== 11
    ) {
      setShowError(true);
      return;
    }
    let payload = new FormData();
    payload.append("first_name", userData.first_name);
    payload.append("last_name", userData.last_name);
    payload.append("phone", contactName);
    payload.append("email", userData.email);
    payload.append("material_location", address);
    payload.append("material_description", JSON.stringify([description]));
    pickedImage.forEach((i, index) => {
      payload.append(
        "material_images[]",
        {
          uri: i.uri,
          type: i.type,
          name: i.name,
        },
        "item " + index + 1 + "-" + i.name
      );
    });
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
        setPickedImage([...pickedImage, res]);
      }
    });
  };

  const editAnimage = (index) => {
    launchImageLibrary({ mediaType: "photo" }, (res) => {
      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      }
      if (res.uri) {
        console.log(res.uri);
        setPickedImage((prev) => {
          let newState = prev;

          newState[index] = res;
          return newState;
        });

        setRefresh(!refresh);
      }
    });
  };

  return (
    <Bgcover name="Bulk Offtake Request">
      <ScrollView>
        <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
          <View
            style={{
              borderColor: "#F18921",
              borderWidth: 1,
              borderStyle: "solid",
              paddingHorizontal: 20,
              borderRadius: 10,
              marginBottom: 20,
              height: 50,
            }}
          >
            <TextInput
              placeholder="Address"
              value={address}
              onChangeText={(value) => setAddress(value)}
              style={{ fontWeight: "bold", fontSize: 16 }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                borderColor: "#F18921",
                borderWidth: 1,
                borderStyle: "solid",
                paddingHorizontal: 20,
                borderRadius: 10,
                width: "47%",
                height: 50,
              }}
            >
              <TextInput
                placeholder="Material Type"
                value={materialType}
                onChangeText={(value) => setMaterialType(value)}
                style={{ fontWeight: "bold", fontSize: 16 }}
              />
            </View>
            <View
              style={{
                borderColor: "#F18921",
                borderWidth: 1,
                borderStyle: "solid",
                paddingHorizontal: 20,
                borderRadius: 10,
                width: "47%",
                height: 50,
              }}
            >
              <TextInput
                placeholder="Tonnage in Kg"
                keyboardType="numeric"
                value={tonnage}
                onChangeText={(value) => setTonnage(value)}
                style={{ fontWeight: "bold", fontSize: 16 }}
              />
            </View>
          </View>
          <View style={styles.textAreaContainer}>
            <TextInput
              value={description}
              onChangeText={(value) => setDescription(value)}
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Material description "
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
            />
          </View>
          <TouchableOpacity
            disabled={pickedImage.length >= 5}
            style={{ flexDirection: "row" }}
            onPress={() => {
              pickAnImage();
            }}
          >
            <View
              style={{
                backgroundColor: "#F18921",
                paddingVertical: 2,
                borderRadius: 10,
                paddingHorizontal: 3,
                marginRight: 5,
                alignSelf: "flex-start",
                top: 7,
              }}
            >
              <Image
                style={{ bottom: 0 }}
                source={require("../assets/addition-thick-symbol.png")}
              />
            </View>
            <View>
              <Text style={{ color: "#BBB9B9", fontWeight: "bold" }}>
                Add image (jpg, png, jpeg)
              </Text>
              <Text
                style={{
                  color: "#BBB9B9",
                  fontWeight: "bold",
                  fontSize: 12,
                  bottom: 4,
                }}
              >
                max of 5 images
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            {pickedImage.map((ele, index) => (
              <TouchableOpacity
                key={ele}
                onPress={() => {
                  editAnimage(index);
                }}
                style={{
                  alignSelf: "flex-start",
                  marginRight: 10,
                  borderRadius: 10,
                }}
              >
                <Image
                  //key={ele}
                  source={{ uri: ele.uri }}
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              borderColor: "#F18921",
              borderWidth: 1,
              borderStyle: "solid",
              paddingHorizontal: 20,
              borderRadius: 10,
              marginBottom: 20,
              height: 50,
            }}
          >
            <TextInput
              placeholder="Contact Name"
              value={contactName}
              onChangeText={(value) => setContactName(value)}
              style={{ fontWeight: "bold", fontSize: 16 }}
            />
          </View>
          <View
            style={{
              borderColor: "#F18921",
              borderWidth: 1,
              borderStyle: "solid",
              paddingHorizontal: 20,
              borderRadius: 10,
              marginBottom: 20,
              height: 50,
            }}
          >
            <TextInput
              placeholder="Contact phone no"
              keyboardType="phone-pad"
              value={contactNumber}
              onChangeText={(value) => setContactNumber(value)}
              style={{ fontWeight: "bold", fontSize: 16 }}
            />
          </View>

          <TouchableOpacity
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
              navigation.navigate("Wallet");
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
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Bgcover>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "#F18921",
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    //alignItems: "flex-start",
  },
  textArea: {
    //    height: 150,
    //justifyContent: "flex-start",
    fontWeight: "bold",
  },
});
export default connect(mapStateToProps)(BulkOfTakeScreen);
