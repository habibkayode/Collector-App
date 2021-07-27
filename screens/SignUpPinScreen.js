import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import {
  registerCollector,
  changeUserType,
  forgetPassword,
} from "../Api/authApi";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import ProcessPickUpScreen from "./ProcessPickUpScreen";

const mapStateToProps = (state) => {
  return {
    coverageZone: state.normal.coverageZone,
  };
};

const SignUpPinScreen = ({ navigation, route, coverageZone }) => {
  console.log(route.params, "route");

  const [disable, setDisable] = useState(true);
  const [values, setValues] = useState({
    code: "",
    confirmationCode: "",
  });
  const pinInput = React.createRef();
  const pinInputConfirm = React.createRef();
  let data = route.params;

  const handleChangeUserType = async () => {
    try {
      let payload = {
        new_user_type: "Collector",
        phone: data.phone,
      };
      let response = await changeUserType(payload);
      Alert.alert(
        "congratulations",
        "You have change your account type successfully",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Splash");
            },
            style: "cancel",
          },

          {
            text: "Cancel",
            onPress: () => {
              navigation.navigate("Splash");
            },
            style: "cancel",
          },
        ],
        {
          cancelable: false,
        }
      );
    } catch (error) {
      Alert.alert("Error", error.response?.data.error);
    }
  };

  const handleSignUp = async () => {
    // navigation.navigate("CodePin", { phone: data.phone });

    let payload = {
      first_name: data.fname,
      last_name: data.lname,
      phone: data.phone,
      email: data.email,
      password: data.password,
      password_confirmation: data.password,
      age: data.age,
      sex: data.sex,
      pin: values.code,
      security_question: {
        question_id: data.securityQuestions,
        question_answer: data.securityQuestionsAnswer,
      },

      collection_coverage_zone: data.lga[0],
      coverage_zone_coordinates: data.collection_zone.map((i) => {
        let t = coverageZone[data.lga[0]].find((k) => k.name === i);
        console.log(t);
        return t.id;
      }),
    };
    console.log(payload);
    //  navigation.navigate("CodePin");
    try {
      let resp = await registerCollector(payload);
      console.log(resp);
      if (resp.success) {
        navigation.navigate("CodePin", { phone: data.phone });
      } else {
        console.log(resp, "resp in pin");
        Alert.alert(resp.error, [{ text: "Okay" }]);
      }
    } catch (e) {
      console.log(e.response.data.error);
      if (
        e.response &&
        e.response.data.error.startsWith(
          "The phone number has already been registered as a"
        )
      ) {
        let type = e.response.data.error.split(" ").slice(-1);
        console.log(type);
        Alert.alert(
          "Info",
          `This particular phone number ${data.phone} is already register with Scrapays as a(n) ${type} do you want to migrate to a Collector?`,
          [
            {
              text: "Yes",
              onPress: async () => {
                try {
                  let response = await forgetPassword({ phone: data.phone });
                  navigation.navigate("ChangeUserCode", { phone: data.phone });
                  //handleChangeUserType();
                } catch (error) {
                  Alert("Error", error.response?.data.error);
                }
              },
              style: "cancel",
            },

            {
              text: "No",
              onPress: () => {
                navigation.goBack();
              },
              style: "cancel",
            },
          ],
          {
            cancelable: false,
          }
        );
      } else {
        Alert.alert("Error", e.response.data.error);
      }
    }
  };

  const _checkCode = (code) => {
    if (code !== values.code) {
      pinInputConfirm.current
        .shake()
        .then(() => setValues({ confirmationCode: "" }));
    } else {
      console.log(values, code, "code si");
      setDisable(false);
    }
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
      <Animatable.View animation="fadeInUpBig" style={[styles.container]}>
        <Text style={styles.text}>Input a default wallet pin</Text>
        <SmoothPinCodeInput
          ref={pinInput}
          value={values.code}
          onTextChange={(code) => setValues({ ...values, code: code })}
          cellStyle={{
            borderWidth: 2,
            borderColor: "#EF7700",
          }}
          cellStyleFocused={{
            borderColor: "darkorange",
            backgroundColor: "orange",
          }}
        />
        <Text style={[styles.text, { marginTop: 30 }]}>Re-enter your pin</Text>
        <SmoothPinCodeInput
          ref={pinInputConfirm}
          value={values.confirmationCode}
          onTextChange={(code) =>
            setValues({ ...values, confirmationCode: code })
          }
          onFulfill={_checkCode}
          cellStyle={{
            borderWidth: 2,
            borderColor: "#EF7700",
          }}
          cellStyleFocused={{
            borderColor: "darkorange",
            backgroundColor: "orange",
          }}
        />

        <View style={styles.button}>
          <TouchableOpacity
            disabled={disable}
            style={styles.signUp}
            onPress={() => {
              handleSignUp();
            }}
          >
            <LinearGradient
              colors={["#EF7700", "#CB6500"]}
              style={styles.signUp}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign Up
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </ImageBackground>
  );
};

export default connect(mapStateToProps)(SignUpPinScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signUp: {
    paddingHorizontal: 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    width: "80%",
    textAlignVertical: "center",
  },
});
