import React, { useEffect, useState } from "react";
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
  TouchableWithoutFeedback,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Bgcover from "../Component/Bg/BackgroundCover";
import { Dropdown } from "react-native-material-dropdown";
import CalendarPicker from "react-native-calendar-picker";
import Modal from "react-native-modal";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

let dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const WalletScreen = (props) => {
  let testRef = React.useRef();
  let [lineWidth, setLineWidth] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [modalCalender, setModalCalender] = useState(false);

  useEffect(() => {
    console.log(testRef.current);
  });

  let onDateChange = (date, type) => {
    console.log(date, type, "dates");
    if (type === "END_DATE") {
      setEndDate(date);
    } else {
      setStartDate(date);
    }
  };
  return (
    <Bgcover name="Wallet">
      <Modal
        isVisible={modalCalender}
        onBackButtonPress={() => {
          setModalCalender(false);
        }}
        style={styles.modal}
        animationInTiming={300}
        animationOutTiming={300}
        backdropOpacity={0.5}
        animationIn="slideInDown"
        animationOut="slideOutUp"
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            height: "100%",
            width: "100%",
            flex: 1,
            justifyContent: "center",
          }}
          onPress={() => {
            console.log("first 11");
            setModalCalender(false);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("first");
            }}
          >
            <View style={{ backgroundColor: "white", marginHorizontal: 10 }}>
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                //  minDate={minDate}
                maxDate={new Date()}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#F18921"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
              />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      <ScrollView>
        <View
          style={{
            marginHorizontal: 20,
            padding: 20,
            backgroundColor: "#0A956A",
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Image source={require("../assets/purse.png")} />
            {/* <Dropdown
              // label="Status"
              placeholder="Days"
              placeholderTextColor="white"
              baseColor="white"
              textColor="white"
              //   itemColor="white"
              selectedItemColor="black"
              fontSize={12}
              dropdownOffset={{ top: 0, left: 0 }}
              inputContainerStyle={{ borderBottomColor: "transparent" }}
              containerStyle={{
                width: 90,
              }}
              style={{}}
              data={[
                {
                  label: "All ",
                  value: "all",
                },
                {
                  label: "Today",
                  value: 0,
                },
                {
                  label: "3 days Ago",
                  value: 3,
                },
                {
                  label: "1 week Ago",
                  value: 7,
                },
                {
                  label: "2 Weeks",
                  value: 14,
                },

                {
                  label: "1 month Ago",
                  value: 30,
                },

                {
                  label: "2 month Ago",
                  value: 60,
                },

                {
                  label: "3 month Ago",
                  value: 90,
                },

                {
                  label: "6 month Ago",
                  value: 180,
                },
              ]}
            /> */}

            {/* <View style={{ alignSelf: "flex-start", flexDirection: "row" }}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 9,
                  marginRight: 3,
                }}
              >
                Today
              </Text>
              <Image
                source={require("../assets/Polygon.png")}
                style={{ alignSelf: "center" }}
              />
            </View> */}
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              marginBottom: 10,
              color: "white",
            }}
          >
            TOTAL Amount Spent
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 28, color: "white" }}>
            # 500,000.00
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Withdraw");
            }}
            style={{
              padding: 10,
              borderRadius: 5,
              backgroundColor: "#F18921",
              width: 100,
              // alignSelf: "flex-end",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Withdraw
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("WalletHistory");
            }}
            style={{
              padding: 10,
              borderRadius: 5,
              backgroundColor: "#F18921",
              width: 100,
              alignSelf: "flex-end",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",

            marginHorizontal: 20,
          }}
        >
          {/* <TouchableOpacity style={{ alignSelf: "center" }}>
            <Image source={require("../assets/right-arrow.png")} />
          </TouchableOpacity> */}
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View
              style={{
                padding: 10,
                width: "47%",
                backgroundColor: "#0A956A",
                borderRadius: 10,
              }}
            >
              <Image source={require("../assets/coins.png")} />
              <Text
                style={{
                  fontSize: 22,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                #300,000.00
              </Text>
              <Text style={{ color: "white", fontSize: 12, marginBottom: 10 }}>
                Account Balance
              </Text>
            </View>
            <View
              style={{
                padding: 10,
                width: "47%",
                backgroundColor: "#0A956A",
                borderRadius: 10,
                marginLeft: "auto",
              }}
            >
              <Image source={require("../assets/coins.png")} />
              <Text
                style={{
                  fontSize: 22,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                #300,000.00
              </Text>
              <Text style={{ color: "white", fontSize: 12, marginBottom: 10 }}>
                Commission Balance
              </Text>
            </View>
          </View>
          {/* <TouchableOpacity style={{ alignSelf: "center" }}>
            <Image source={require("../assets/right-arrow2.png")} />
          </TouchableOpacity> */}
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            justifyContent: "space-between",
            paddingHorizontal: 15,
          }}
        >
          <View>
            <Text
                  style={{
                fontWeight: "bold",
                fontSize: 15,
              }}
              onLayout={(e) => {
                console.log(e.nativeEvent.layout.width, "oo");
                setLineWidth(e.nativeEvent.layout.width);
              }}
            >
              Transaction history
            </Text>
            <View
              style={{
                width: 70,
                backgroundColor: "#0A956A",
                height: 3,
                marginBottom: 10,
              }}
            ></View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Dropdown
              placeholder="Days"
              placeholderTextColor="black"
              baseColor="gray"
              textColor="white"
              selectedItemColor="black"
              fontSize={12}
              dropdownOffset={{ top: 0, left: 0 }}
              containerStyle={{
                borderWidth: 1,
                borderColor: "#F18921",
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
              inputContainerStyle={{
                width: 60,
                borderBottomColor: "transparent",
                paddingBottom: 0,
              }}
              data={[
                {
                  label: "All ",
                  value: "all",
                },
                {
                  label: "Today",
                  value: 0,
                },
                {
                  label: "3 days Ago",
                  value: 3,
                },
                {
                  label: "1 week Ago",
                  value: 7,
                },
                {
                  label: "2 Weeks",
                  value: 14,
                },

                {
                  label: "1 month Ago",
                  value: 30,
                },

                {
                  label: "2 month Ago",
                  value: 60,
                },

                {
                  label: "3 month Ago",
                  value: 90,
                },

                {
                  label: "6 month Ago",
                  value: 180,
                },
              ]}
            />

            <TouchableOpacity
              style={{
                marginRight: 20,
                justifyContent: "center",
                flexDirection: "row",
                top: 7,
                left: 8,
              }}
              onPress={() => {
                setModalCalender(true);
              }}
            >
              <MaterialCommunityIcons
                name="calendar-range"
                color="grey"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View> */}
        {/* <ScrollView contentContainerStyle={{ marginHorizontal: 20 }}>
          {dummyArray.map((ele, index) => {
            return (
              <TouchableOpacity
                style={{ flexDirection: "row", marginBottom: 4 }}
              >
                <Text style={{}}>{index + 1}</Text>
                   <Text
                  style={{
                    marginLeft: 20,
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  Withdraw
                </Text>
                <Text
                  style={{
                    marginLeft: 20,
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  NGN 30,000
                </Text>
                <Text
                  style={{
                    marginLeft: 20,
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  Transfer
                </Text>
                <Text
                  style={{
                    marginLeft: 20,
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  23/12/2010
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView> */}
      </ScrollView>
    </Bgcover>
  );
};

const styles = StyleSheet.create({
  modal: {
    //  justifyContent: "center",
    margin: 0,
    position: "absolute",
    flex: 1,
    height: "100%",
    alignSelf: "flex-start",
    ///justifyContent: "center",
    //  alignItems: "center",
    width: "100%",
  },
});

export default WalletScreen;
