import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import MultiSelect from "react-native-multiple-select";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import RNPickerSelect from "react-native-picker-select";

import { store } from "../Redux/store";
import { getAllCoverageRegion, updateProfile } from "../Api/api";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { updateUserData } from "../Redux/actionCreator";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const EditProfileModal = (props) => {
  let userData = store.getState().normal.userData;
  let coverageZoneObj = store.getState().normal.coverageZone;

  let oo = [54, 74, 72];
  let derivedLga;
  let userZones = userData.userable.coverage_zone_coordinates;
  // let userZones = [];
  //chage
  // if (userZones.length > 0) {
  //   Object.keys(coverageZoneObj).forEach((k) => {
  //     let findingLga = coverageZoneObj[k].find((p) => p.id === userZones[0]);
  //     console.log(findingLga, "lpoo");
  //     if (findingLga) {
  //       derivedLga = findingLga.lga;
  //       return;
  //     }
  //   });
  // }
  // console.log(derivedLga);
  let [firstName, setFirstName] = useState(userData.first_name);
  let [lastName, setLastName] = useState(userData.last_name);
  let [email, setEmail] = useState(userData.email);
  let [coverageZone, setCoverageZone] = useState(
    userData.userable.collection_coverage_zone
  );

  let [profileImage, setProfileImage] = useState(userData.avatar_image);

  let [lga, setLga] = useState(userZones[0]?.lga);
  console.log(
    userZones.map((i) => i.id),
    "poiuyyy"
  );
  let [zone, setZone] = useState(userZones.map((i) => i.name));
  let [sex, setSex] = useState(userData.userable.sex);
  let [age, setAge] = useState(userData.userable.age);

  let [imageResponse, setImageResponse] = useState();
  let [showError, setShowError] = useState(false);
  let [zoneChange, setZoneChange] = useState(false);
  let [imageChane, setImageChane] = useState(false);
  const multiSelectRef = useRef();
  const zoneRef = useRef();
  const lgaRef = useRef();

  useEffect(() => {
    if (Object.keys(coverageZoneObj).length === 0) {
      getAllCoverageRegion().then(() => {
        coverageZoneObj = store.getState().normal.coverageZone;
      });
    }
  }, []);

  let handleSubmit = () => {
    let payload = new FormData();
    payload.append("first_name", firstName);
    console.log(firstName, "first name");
    payload.append("last_name", lastName);
    console.log(lastName, "last Name");
    payload.append("email", email);
    payload.append("sex", sex);
    payload.append("age", age);
    console.log(age, sex, "age in payload");
    if (zoneChange) {
      let newZone = zone.map((k) => {
        let actual = coverageZoneObj[lga].find((f) => f.name === k);
        return actual.id;
      });
      console.log(newZone, "mkkkk");
      payload.append("collection_coverage_zone", coverageZone);
      newZone.forEach((i) => {
        payload.append("coverage_zone_coordinates[]", i);
      });

      console.log(zone, "coverage zone");
    } else {
      payload.append("collection_coverage_zone", coverageZone);
      userZones.forEach((i) => {
        console.log(i, "poiuy");
        payload.append("coverage_zone_coordinates[]", i.id);
      });

      console.log(coverageZone, "coverage zone");
    }

    if (imageResponse) {
      console.log("badd", imageResponse.type);
      payload.append("avatar_image", {
        name: "image1." + imageResponse.type.split("/")[1],
        type: imageResponse.type,
        uri: imageResponse.uri,
      });
    }

    updateProfile(payload)
      .then((resp) => {
        console.log("finished", resp);
        store.dispatch(updateUserData(resp.data));
        Alert.alert("Info", "Your profile details have updated successfully");
      })
      .catch((e) => {
        console.log(e);
        //   Alert.alert("Error", e.response.data.error);
      });
  };

  const closeMultiSelectIfOpened = () => {
    if (lgaRef.current.state.selector) {
      return lgaRef.current._toggleSelector();
    }

    if (zoneRef.current.state.selector) {
      return zoneRef.current._toggleSelector();
    }
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
        setImageResponse(res);
        setProfileImage(res.uri);
      }
    });
  };

  // useEffect(() => {
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
      isVisible={props.showEditProfileModal}
      onBackButtonPress={() => {
        // if (multiSelectRef.current.state.selector) {
        //   multiSelectRef.current._toggleSelector();
        // } else {
        //   props.handleModalBackButton();
        // }

        if (lgaRef.current.state.selector) {
          lgaRef.current._toggleSelector();
          return;
        } else if (zoneRef.current.state.selector) {
          zoneRef.current._toggleSelector();
          return;
        } else {
          props.handleModalBackButton();
        }
      }}
      style={styles.modal}
      animationInTiming={600}
      backdropOpacity={0.5}
    >
      <TouchableWithoutFeedback onPress={closeMultiSelectIfOpened}>
        <View>
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, marginBottom: 20 }}
            >
              Edit Profile
            </Text>
            <View style={styles.textInputWrapper}>
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={(value) => setFirstName(value)}
                style={{ fontWeight: "bold", fontSize: 16 }}
              />
            </View>
            <View style={styles.textInputWrapper}>
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={(value) => setLastName(value)}
                style={{ fontWeight: "bold", fontSize: 16 }}
              />
            </View>
            <View style={styles.textInputWrapper}>
              <TextInput
                placeholder="Email"
                value={email}
                keyboardType="email-address"
                onChangeText={(value) => setEmail(value)}
                style={{ fontWeight: "bold", fontSize: 16 }}
              />
            </View>
            <RNPickerSelect
              placeholder={{
                label: "Age",
                value: "default",
                color: "#666666",
              }}
              onValueChange={(value) => {
                setAge(value);
              }}
              style={{
                viewContainer: {
                  borderWidth: 1,
                  borderColor: "#F18921",
                  borderStyle: "solid",
                  width: "100%",
                  marginVertical: 10,
                  borderRadius: 10,
                  //paddingHorizontal: 0,
                },
                inputAndroid: {
                  color: "black",
                  fontWeight: "700",
                  fontSize: 15,
                },
                placeholder: {
                  color: "#666666",
                },
              }}
              value={age}
              items={[
                { label: "18 - 22", value: "18 - 22", color: "black" },
                { label: "23 - 27", value: "23 - 27", color: "black" },
                { label: "28 - 32", value: "28 - 32", color: "black" },
                { label: "33 - 40", value: "33 - 40", color: "black" },
                {
                  label: "40 and Above",
                  value: "40 and Above",
                  color: "black",
                },
              ]}
            />
            <RNPickerSelect
              placeholder={{
                label: "Sex",
                value: "default",
                color: "#666666",
              }}
              onValueChange={(value) => {
                setSex(value);
              }}
              style={{
                viewContainer: {
                  borderWidth: 1,
                  borderColor: "#F18921",
                  borderStyle: "solid",
                  width: "100%",
                  marginVertical: 10,
                  borderRadius: 10,
                  //paddingHorizontal: 0,
                },
                inputAndroid: {
                  color: "black",
                  fontWeight: "700",
                  fontSize: 15,
                },
                placeholder: {
                  color: "#666666",
                },
              }}
              value={sex}
              items={[
                { label: "Male", value: "male", color: "black" },
                { label: "Female", value: "female", color: "black" },
              ]}
            />

            <View
              style={{
                // borderWidth: 1,
                // borderColor: "#F18921",
                // borderStyle: "solid",
                marginBottom: 20,
                alignSelf: "stretch",
                paddingTop: 4,
                //paddingLeft: 10,
              }}
            >
              <MultiSelect
                fixedHeight={true}
                single={true}
                items={Object.keys(coverageZoneObj).map((i, ind) => {
                  return {
                    name: i,
                    data: i,
                    key: i,
                  };
                })}
                fontSize={15}
                hideSubmitButton={true}
                uniqueKey="name"
                ref={lgaRef}
                styleTextDropdown={{
                  fontWeight: "bold",
                  color: "black",
                  paddingHorizontal: 20,
                }}
                onSelectedItemsChange={(items) => {
                  console.log(items, "lga");
                  setZone([]);
                  setZoneChange(true);
                  setLga(items);
                }}
                styleMainWrapper={{
                  //height: 200,
                  alignSelf: "stretch",
                }}
                styleInputGroup={{
                  borderWidth: 1,
                  borderColor: "#F18921",
                  borderStyle: "solid",
                }}
                styleTextDropdownSelected={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 16,
                  paddingHorizontal: 20,
                }}
                styleDropdownMenuSubsection={{
                  borderWidth: 1,
                  borderColor: "#F18921",
                  borderStyle: "solid",
                  borderRadius: 10,
                }}
                styleListContainer={{ height: "100%" }}
                // styleSelectorContainer={{ borderColor: "black", borderWidth: 1 }}
                styleDropdownMenu={{ height: 50 }}
                selectedItemIconColor="#F18921"
                selectedItems={lga}
                selectText={`${userZones[0]?.lga || "Select your L.G.A"}`}
                searchInputPlaceholderText="Search your L.G.A"
                onChangeInput={(text) => console.log(text)}
                //          altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#F18921"
                tagBorderColor="#F18921"
                tagTextColor="#F18921"
                selectedItemTextColor="black"
                selectedItemIconColor="#F18921"
                itemTextColor="black"
                displayKey="name"
                searchInputStyle={{ color: "black" }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
                hideDropdown={true}
              />
            </View>

            <View
              style={{
                // borderWidth: 1,
                // borderColor: "#F18921",
                // borderStyle: "solid",
                // borderRadius: 10,
                // marginBottom: 20,
                alignSelf: "stretch",
                paddingTop: 4,
              }}
            >
              <MultiSelect
                fixedHeight={true}
                items={
                  coverageZoneObj[lga]
                    ? coverageZoneObj[lga].map((i, ind) => {
                        //  console.log(i);
                        return {
                          name: i.name,
                          // label: i.id,
                          data: i.id,
                          key: i.id,
                        };
                      })
                    : {
                        name: "",
                      }
                }
                fontSize={15}
                hideSubmitButton={true}
                uniqueKey="name"
                ref={zoneRef}
                onSelectedItemsChange={(items, ok) => {
                  console.log(items, "zone");
                  if (items.length < 4) setZone(items);
                }}
                styleMainWrapper={{
                  //height: 200,
                  alignSelf: "stretch",
                }}
                styleTextDropdown={{
                  fontWeight: "bold",
                  color: "black",
                  paddingHorizontal: 20,
                }}
                styleInputGroup={{
                  borderWidth: 1,
                  borderColor: "#F18921",
                  borderStyle: "solid",
                }}
                styleTextDropdownSelected={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 16,
                  paddingHorizontal: 20,
                }}
                styleDropdownMenuSubsection={{
                  borderWidth: 1,
                  borderColor: "#F18921",
                  borderStyle: "solid",
                  borderRadius: 10,
                }}
                styleListContainer={{ height: "100%" }}
                // styleSelectorContainer={{ borderColor: "black", borderWidth: 1 }}
                styleDropdownMenu={{ height: 50 }}
                selectedItemIconColor="#F18921"
                selectedItems={zone}
                selectText="Select your Coverage Zone"
                searchInputPlaceholderText="Search your Coverage Zone"
                onChangeInput={(text) => console.log(text)}
                //          altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#F18921"
                tagBorderColor="#F18921"
                tagTextColor="#F18921"
                selectedItemTextColor="black"
                selectedItemIconColor="black"
                itemTextColor="black"
                displayKey="name"
                searchInputStyle={{ color: "black" }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
                hideDropdown={true}
              />
            </View>

            {/* <View
            style={{
              borderWidth: 1,
              borderColor: "#F18921",
              borderStyle: "solid",
              borderRadius: 10,
              marginBottom: 20,
              alignSelf: "stretch",
              paddingTop: 4,
              paddingLeft: 10,
            }}
          >
            <MultiSelect
              fixedHeight={true}
              items={coverageZoneList.map((i, ind) => {
                return {
                  name: i.name,
                  id: i.name,
                  key: i.name,
                };
              })}
              fontSize={15}
              hideSubmitButton={true}
              uniqueKey="name"
              ref={multiSelectRef}
              onSelectedItemsChange={(items) => {
                console.log(items);
                setCoverageZone(items);
              }}
              styleMainWrapper={{
                //height: 200,
                alignSelf: "stretch",
              }}
              selectedItemIconColor="#F18921"
              selectedItems={coverageZone}
              selectText="Select coverage Zone"
              searchInputPlaceholderText="Search for places"
              onChangeInput={(text) => console.log(text)}
              //          altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#F18921"
              tagBorderColor="#F18921"
              tagTextColor="#F18921"
              selectedItemTextColor="black"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
              hideDropdown={true}
            />
          </View> */}
            {/* <RNPickerSelect
          placeholder={{
            label: "Select Preferred collection coverage ",
            value: "default",
            color: "black",
          }}
          onValueChange={(value) => {
            // setClassId(value);
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
          value={coverageZone}
          //   items={[
          //     { label: "Composite", value: "Composite", color: "black" },
          //     { label: "Composite 1", value: "1", color: "black" },
          //     { label: "Composite 2", value: "2", color: "black" },
          //   ]}
          items={coverageZoneList.map((i) => {
            return {
              label: i.name,
              value: i.id,
              color: "black",
              key: i.name,
            };
          })}
        /> */}
            {profileImage ? (
              <TouchableOpacity onPress={pickAnImage}>
                <Image
                  source={{
                    uri: imageResponse
                      ? profileImage
                      : "https://staging.scrapays.com/storage/profile_pictures/" +
                        profileImage,
                  }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 20,
                    marginBottom: 20,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={pickAnImage}>
                <Image
                  source={require("../assets/upload_avatar.png")}
                  style={{ zIndex: -1 }}
                />
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity onPress={pickAnImage}>
          <Image source={require("../assets/image.png")} />
        </TouchableOpacity> */}
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
                Update Profile
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
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
    width: "100%",
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

export default EditProfileModal;
