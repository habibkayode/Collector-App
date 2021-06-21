import React, { useState } from "react";
import {
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
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { forgetPassword } from "../Api/authApi";

const ForgetPassword = (props) => {
  const [phoneNo, setPhoneNo] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = async () => {
    if (phoneNo.length !== 11) {
      console.log("pl", phoneNo);
      return setShowError(true);
    }
    try {
      let response = await forgetPassword({ phone: phoneNo });

      return props.navigation.navigate("ForgetPasswordCodePin", phoneNo);
    } catch (error) {
      Alert.alert("Error", error.response?.data.error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background/bg1.jpg")}
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
            props.navigation.goBack();
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

      <View style={styles.header}>
        <Text style={styles.text_header}>Recover Password</Text>
        <Text style={styles.text}>
          Collect and aggregate recyclable and "Out-of-Use" items, make money
          while being environmentally freindly
        </Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
        <View style={styles.action}>
          <MaterialIcons name="person-outline" size={20} />
          <TextInput
            placeholder="Phone number "
            placeholderTextColor="#666666"
            style={[styles.textInput]}
            autoCapitalize="none"
            keyboardType="number-pad"
            onChangeText={(val) => setPhoneNo(val)}
          />
          {phoneNo.length === 11 && (
            <Animatable.View animation="bounceIn">
              <MaterialCommunityIcons
                name="check-circle-outline"
                color="green"
                size={20}
              />
            </Animatable.View>
          )}
        </View>
        {showError && phoneNo.length !== 11 && (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Invalid Phone Number</Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              handleSubmit();
            }}
          >
            <LinearGradient
              colors={["#EF7700", "#CB6500"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                    fontWeight: "bold",
                  },
                ]}
              >
                Send
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text
            onPress={() => props.navigation.navigate("SignUp")}
            style={{ marginTop: 10, fontSize: 15 }}
          >
            Don’t have an account? Click here to{" "}
            <Text style={{ color: "#EF7700" }}> Sign Up</Text>
          </Text>
        </View>
      </Animatable.View>
    </ImageBackground>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EF7700",
    paddingBottom: 5,
  },

  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },

  footer: {
    flex: 2.5,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },

  button: {
    alignItems: "center",
    marginTop: 30,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  text_header: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  text: {
    color: "#05375a",
    marginTop: 10,
    fontSize: 18,
  },

  header: {
    flex: 1.5,
    justifyContent: "flex-end",
    marginTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
