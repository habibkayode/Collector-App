import React, { useState } from "react";
import {
  Text,
  ImageBackground,
  View,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { store } from "../../Redux/store";
import { updateSideBar } from "../../Redux/actionCreator";
import SideBar from "../SideBar";
import EditProfileModal from "../EditProfile";
import NewPickup from "../NewPickup";
import NewMessage from "../NewMessage";

const Bgcover = (props) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  let userData = store.getState().normal.userData;

  const handlSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <ImageBackground
      source={require("../../assets/background/bg2.jpg")}
      style={{ height: "100%", width: "100%" }}
    >
      <StatusBar backgroundColor="#EF7700" barStyle="light-content" />
      {/* <NewPickup /> */}
      {/* <NewMessage /> */}
      {/* 
      <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => {}}>
        <MaterialCommunityIcons name="arrow-left" color="#6F6F6F" size={30} />
      </TouchableOpacity> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginBottom: 10,
          overflow: "hidden",
          marginTop: 20,
        }}
      >
        <SideBar
          showSideBar={showSideBar}
          handleModalBackButton={() => {
            handlSideBar();
          }}
          showEditProfileModal={() => {
            setShowSideBar(false);
            setShowEditProfileModal(true);
          }}
        />
        <EditProfileModal
          showEditProfileModal={showEditProfileModal}
          userData={userData}
          handleModalBackButton={() => {
            setShowEditProfileModal(false);
          }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{props.name}</Text>
        <TouchableOpacity
          onPress={() => {
            handlSideBar();
          }}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            color="#6F6F6F"
            size={30}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>{props.children}</View>
    </ImageBackground>
  );
};

export default Bgcover;
