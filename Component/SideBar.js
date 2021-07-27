import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Linking,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import { store } from "../Redux/store";
import { updateLoggedIn } from "../Redux/actionCreator";

const SideBar = (props) => {
  let navigation = useNavigation();
  let userData = store.getState().normal.userData;

  let userImageUrl = store.getState().normal.userData.avatar_image;
  let logoutAlert = () => {
    Alert.alert(
      "Notice",
      "Are you sure you want to logout",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => store.dispatch(updateLoggedIn(false)),
          style: "destructive",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  console.log("side");
  return (
    <Modal
      animationIn="slideInRight"
      animationOut="slideOutRight"
      isVisible={props.showSideBar}
      animationOutTiming={600}
      onBackButtonPress={props.handleModalBackButton}
      style={styles.modal}
      animationInTiming={600}
      backdropOpacity={0.5}
    >
      <TouchableOpacity
        activeOpacity={1.0}
        style={{ width: "100%", height: "100%" }}
        onPress={(e) => {
          console.log(e.target.name, "target");
          props.handleModalBackButton();
        }}
      >
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={1.0}
            style={{ width: "100%", height: "100%" }}
            onPress={(e) => {
              e.stopPropagation();
            }}
          >
            {userImageUrl ? (
              <ImageBackground
                style={{ width: "100%", minHeight: 250, marginBottom: 20 }}
                blurRadius={20}
                source={{
                  uri:
                    "https://api.scrapays.com/storage/profile_pictures/" +
                    userImageUrl,
                }}
                resizeMode="cover"
              >
                <Image
                  //  resizeMode="cover"
                  style={{
                    width: 97,
                    height: 97,
                    borderRadius: 50,
                    // position: "relative",
                    marginTop: 100,
                    paddingLeft: 10,
                  }}
                  source={{
                    uri:
                      "https://api.scrapays.com/storage/profile_pictures/" +
                      userImageUrl,
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 22,
                    paddingLeft: 10,
                  }}
                >
                  {userData.first_name}
                  {"  "}
                  {userData.last_name}
                </Text>
                <Text
                  style={{
                    color: "white",

                    fontSize: 15,
                    paddingLeft: 10,
                  }}
                >
                  {userData.email}
                </Text>
              </ImageBackground>
            ) : (
              <ImageBackground
                style={{ width: "100%", minHeight: 250, marginBottom: 20 }}
                blurRadius={20}
                source={require("../assets/avatar.png")}
                resizeMode="cover"
              >
                <Image
                  //  resizeMode="cover"
                  style={{
                    width: 97,
                    height: 97,
                    borderRadius: 50,
                    // position: "relative",
                    marginTop: 100,
                    paddingLeft: 10,
                  }}
                  source={require("../assets/avatar.png")}
                />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 22,
                    paddingLeft: 10,
                  }}
                >
                  {userData.first_name}
                  {"  "}
                  {userData.last_name}
                </Text>
                <Text
                  style={{
                    color: "white",

                    fontSize: 15,
                    paddingLeft: 10,
                  }}
                >
                  {userData.email}
                </Text>
              </ImageBackground>
            )}

            <View style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                }}
                onPress={props.showEditProfileModal}
              >
                <MaterialCommunityIcons
                  name="account"
                  size={25}
                  color="#828282"
                  style={{ marginRight: 20 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  marginTop: 20,
                }}
                onPress={() => {
                  Linking.openURL("tel:07088592037}");
                }}
              >
                <MaterialCommunityIcons
                  name="phone"
                  size={25}
                  color="#72DFC5"
                  style={{ marginRight: 20 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Call Support
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  marginTop: 20,
                }}
                onPress={() => {
                  navigation.navigate("Message");
                  props.handleModalBackButton();
                }}
              >
                <MaterialCommunityIcons
                  name="message-outline"
                  size={25}
                  color="black"
                  style={{ marginRight: 20 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Messages
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  marginTop: 20,
                }}
                onPress={() => {
                  Linking.openURL(
                    `whatsapp://send?text=Good day admin, i am ${userData.first_name} ${userData.last_name} Scrapays partner(Collector)   &phone=+2347088592037`
                  );
                }}
              >
                <MaterialCommunityIcons
                  name="whatsapp"
                  size={25}
                  color="#0A956A"
                  style={{ marginRight: 20 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Chat Admin
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  marginTop: 20,
                }}
                onPress={() => logoutAlert()}
              >
                <MaterialCommunityIcons
                  name="logout"
                  size={25}
                  color="gray"
                  style={{ marginRight: 20 }}
                />
                <Text style={{ fontWeight: "100", fontSize: 18 }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </TouchableOpacity>
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
    alignSelf: "flex-end",
    justifyContent: "center",
    width: "100%",
    //   backgroundColor: "green",
  },
  modalContainer: {
    backgroundColor: "#fff",
    // padding: 20,
    //  alignItems: "flex-end",
    width: "70%",
    height: "100%",
    alignSelf: "flex-end",
  },
  textAreaContainer: {
    borderColor: "#F18921",
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    //alignItems: "flex-start",
  },
});

export default SideBar;
