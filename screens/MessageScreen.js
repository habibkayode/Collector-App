import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Bgcover from "../Component/Bg/BackgroundCover";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MessageModal from "../Component/MessageModal";
import { getAllNofification } from "../Api/api";
import { connect } from "react-redux";
let dummyArray = [1, 2, 3, 45, 6, 7, 8];

const mapStateToProps = (state) => {
  return {
    notifications: state.normal.notifications,
  };
};

const MessageScreen = (props) => {
  let [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedIndex, setSelectIndex] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNofification().then(setLoading(false));
  }, []);

  let handleModalBackButton = () => {
    setShowMessageModal(!showMessageModal);
  };

  return (
    <Bgcover name="New Message">
      <ScrollView contentContainerStyle={{ marginHorizontal: 10 }}>
        {loading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#F18921" />
          </View>
        )}
        {selectedIndex && (
          <MessageModal
            showMessage={showMessageModal}
            handleModalBackButton={handleModalBackButton}
            data={props.notifications[selectedIndex]}
          />
        )}

        {!loading && props.notifications.length > 0 ? (
          props.notifications.map((i, index) => <Message data={i} />)
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              No notification yet
            </Text>
          </View>
        )}
      </ScrollView>
    </Bgcover>
  );
};

let Message = ({ data }) => {
  return (
    <View
      style={{
        //borderStyle: "solid",

        //  padding: 20,
        borderColor: "#DCDCDC",
        //  backgroundColor: "#fff",
        borderRadius: 20,

        maxWidth: "100%",
        //backgroundColor: "white",
        //borderWidth: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setSelectIndex(index);
          setShowMessageModal(true);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          elevation: 3,
          borderColor: "rgba(16, 170, 174, 0.2)",
          paddingHorizontal: 10,
          // height: "auto",
          paddingVertical: 15,
        }}
      >
        <View
          style={{
            height: "100%",
            width: 4,
            backgroundColor: "#8E67BE",
            marginRight: 10,
          }}
        ></View>
        <View
          style={{
            padding: 4,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#8E67BE",
            borderRadius: 10,
            marginRight: 10,
          }}
        >
          <MaterialCommunityIcons name="exclamation" />
        </View>
        <View style={{ maxWidth: "70%" }}>
          <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: "bold" }}>
            {data.tile}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              marginVertical: 10,
              fontWeight: "bold",
              color: "#DCDCDC",
            }}
          >
            {data.body}
          </Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={30}
            color="red"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default connect(mapStateToProps)(MessageScreen);
