import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { checkEmail, checkPhone } from "../utils/check";
import RNPickerSelect from "react-native-picker-select";
import { connect } from "react-redux";
import { getAllCoverageRegion } from "../Api/api";
import MultiSelect from "react-native-multiple-select";

const mapStateToProps = (state) => {
  return {
    coverageZone: state.normal.coverageZone,
  };
};

const SignUpScreen = ({ navigation, coverageZone }) => {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    age: "",
    sex: "",
    lga: [],
    collection_zone: [],
    password: "",
    secureTextEntry: true,
    isValidEmail: true,
    isValidFname: true,
    isValidLname: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidAge: true,
    isValidSex: true,
    iscollection_zone: true,
  });

  const [showError, setShowError] = useState(false);

  let lgaRef = useRef();
  let zoneRef = useRef();

  useEffect(() => {
    getAllCoverageRegion();
  }, []);
  const emailChange = (val) => {
    if (checkEmail(val.trim())) {
      setData({
        ...data,
        email: val.trim(),
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        isValidEmail: false,
      });
    }
  };

  const phoneChange = (val) => {
    if (checkPhone(val)) {
      setData({
        ...data,
        phone: val,
        isValidPhone: true,
      });
    } else {
      setData({
        ...data,
        isValidPhone: false,
      });
    }
  };

  const passwordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val.trim(),
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        isValidPassword: false,
      });
    }
  };

  const nameChange = (val, name) => {
    if (name === "fname") {
      if (val.trim().length >= 3) {
        setData({
          ...data,
          fname: val.trim(),
          isValidFname: true,
        });
      } else {
        setData({
          ...data,
          isValidFname: false,
        });
      }
    }
    if (name === "lname") {
      if (val.trim().length >= 3) {
        setData({
          ...data,
          lname: val.trim(),
          isValidLname: true,
        });
      } else {
        setData({
          ...data,
          isValidLname: false,
        });
      }
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const nextHandle = (data, navigation) => {
    if (
      !data.isValidEmail ||
      !data.isValidPassword ||
      !data.isValidFname ||
      !data.isValidLname ||
      !data.isValidPhone ||
      data.email.length == 0 ||
      data.password.length == 0 ||
      data.fname.length == 0 ||
      data.lname.length == 0 ||
      data.phone.length == 0 ||
      data.age.length == 0 ||
      data.sex.length == 0 ||
      data.collection_zone.length == 0 ||
      data.collection_zone.lga == 0
    ) {
      Alert.alert("Wrong Input!", "Please check input and try again", [
        { text: "Okay" },
      ]);
      setShowError(true);
      return;
    }

    //  Navivage to Pin Screen with State
    console.log(data);
    navigation.navigate("SignUpPin", data);
  };

  return (
    <ImageBackground
      source={require("../assets/background/bg2.jpg")}
      style={{ height: "100%", width: "100%" }}
    >
      <View
        style={{
          marginTop: StatusBar.currentHeight + 20,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcons name="arrow-left" color="#6F6F6F" size={30} />
        </TouchableOpacity>
        <Image
          style={{
            alignSelf: "flex-end",
          }}
          source={require("../assets/logo-small.png")}
        />
      </View>

      <StatusBar backgroundColor="#EF7700" barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.header}>
          <Text style={styles.text_header}>Create your account </Text>
        </View>

        <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
          <View style={styles.action}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => nameChange(val, "fname")}
            />
          </View>
          {data.isValidFname ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Invalid First Name</Text>
            </Animatable.View>
          )}

          <View style={styles.action}>
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => nameChange(val, "lname")}
            />
          </View>
          {data.isValidLname ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Invalid Last Name</Text>
            </Animatable.View>
          )}

          <View style={styles.action}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => emailChange(val)}
            />
          </View>
          {data.isValidEmail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Invalid Email</Text>
            </Animatable.View>
          )}

          <View style={styles.action}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => passwordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <MaterialCommunityIcons
                  name="eye-off-outline"
                  color="grey"
                  size={20}
                />
              ) : (
                <MaterialCommunityIcons
                  name="eye-outline"
                  color="grey"
                  size={20}
                />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}

          <View style={styles.action}>
            <TextInput
              placeholder="080x xxx xxxx"
              keyboardType="numeric"
              placeholderTextColor="#666666"
              style={[styles.textInput]}
              autoCapitalize="none"
              onChangeText={(val) => phoneChange(val)}
            />
          </View>
          {data.isValidPhone ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Invalid Phone Number</Text>
            </Animatable.View>
          )}

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "40%" }}>
              <RNPickerSelect
                placeholder={{
                  label: "Age Range",
                  value: "default",
                  color: "#666666",
                }}
                onValueChange={(value) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      age: value,
                    };
                  });
                }}
                style={{
                  viewContainer: {
                    borderBottomWidth: 1,
                    borderBottomColor: "#F18921",
                    borderStyle: "solid",
                    //marginBottom: 20,
                    width: "100%",
                    marginTop: 5,
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
                value={data.age}
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

              {showError && data.age.length < 4 && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Invalid Age Range</Text>
                </Animatable.View>
              )}
            </View>
            <View style={{ width: "45%" }}>
              <RNPickerSelect
                placeholder={{
                  label: "Sex",
                  value: "default",
                  color: "#666666",
                }}
                onValueChange={(value) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      sex: value,
                    };
                  });
                }}
                style={{
                  viewContainer: {
                    borderBottomWidth: 1,
                    borderBottomColor: "#F18921",
                    borderStyle: "solid",
                    width: "100%",
                    marginTop: 5,
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
                value={data.sex}
                items={[
                  { label: "Male", value: "male", color: "black" },
                  { label: "Female", value: "female", color: "black" },
                ]}
              />

              {showError && data.sex.length < 2 && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Invalid Sex Type</Text>
                </Animatable.View>
              )}
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <MultiSelect
              fixedHeight={true}
              single={true}
              items={Object.keys(coverageZone).map((i, ind) => {
                return {
                  name: i,
                  id: i,
                  key: i,
                };
              })}
              fontSize={15}
              hideSubmitButton={true}
              uniqueKey="name"
              ref={lgaRef}
              styleTextDropdown={{
                // fontWeight: "bold",
                //   color: "black",
                paddingHorizontal: 20,
              }}
              onSelectedItemsChange={(items) => {
                console.log(items, "lga");
                setData((prev) => ({ ...prev, lga: items }));
              }}
              textInputProps={{ autoFocus: false }}
              styleMainWrapper={{
                //height: 200,
                alignSelf: "stretch",
              }}
              styleInputGroup={{
                borderBottomWidth: 1,
                borderBottomColor: "#F18921",
                borderStyle: "solid",
              }}
              styleTextDropdownSelected={{
                fontSize: 16,
                paddingHorizontal: 20,
              }}
              styleDropdownMenuSubsection={{
                borderBottomWidth: 1,
                borderBottomColor: "#F18921",
              }}
              styleListContainer={{ height: "100%" }}
              // styleSelectorContainer={{ borderColor: "black", borderWidth: 1 }}
              styleDropdownMenu={{ height: 50 }}
              selectedItemIconColor="#F18921"
              selectedItems={data.lga}
              selectText="Select your L.G.A"
              searchInputPlaceholderText="Search for your L.G.A"
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

          {showError && data.lga.length !== 1 && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Select one LGA</Text>
            </Animatable.View>
          )}
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
                coverageZone[data.lga]
                  ? coverageZone[data.lga].map((i, ind) => {
                      return {
                        name: i.name,
                        id: i.id,
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
              textInputProps={{ autoFocus: false }}
              onSelectedItemsChange={(items) => {
                console.log(items, "zone");
                //let zone = data.collection_zone;
                // zone.push(items);
                if (items.length <= 3)
                  setData((prev) => ({ ...prev, collection_zone: items }));
              }}
              styleMainWrapper={{
                //height: 200,
                alignSelf: "stretch",
              }}
              styleTextDropdown={{
                //fontWeight: "bold",
                //color: "black",
                paddingHorizontal: 20,
              }}
              styleInputGroup={{
                borderBottomWidth: 1,
                borderBottomColor: "#F18921",
              }}
              styleTextDropdownSelected={{
                // color: "black",
                // fontWeight: "bold",
                fontSize: 16,
                paddingHorizontal: 20,
              }}
              styleDropdownMenuSubsection={{
                borderBottomWidth: 1,
                borderBottomColor: "#F18921",
              }}
              styleListContainer={{ height: "100%" }}
              // styleSelectorContainer={{ borderColor: "black", borderWidth: 1 }}
              styleDropdownMenu={{ height: 50 }}
              selectedItemIconColor="#F18921"
              selectedItems={data.collection_zone}
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

          {showError &&
            (data.collection_zone.length === 0 ||
              data.collection_zone.length > 3) && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Minimum of one maximum of three
                </Text>
              </Animatable.View>
            )}

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.next}
              onPress={() => {
                nextHandle(data, navigation);
              }}
            >
              <Text style={{ color: "black", fontSize: 20, marginRight: 10 }}>
                Next
              </Text>
              <MaterialCommunityIcons
                name="arrow-right"
                color="#EF7700"
                size={50}
              />
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
    </ImageBackground>
  );
};

export default connect(mapStateToProps)(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1.5,
    justifyContent: "flex-end",
    marginTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 2.5,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "black",
    fontWeight: "bold",
    fontSize: 35,
  },
  text: {
    color: "#05375a",
    marginTop: 10,
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EF7700",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    marginTop: 30,
  },
  next: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
