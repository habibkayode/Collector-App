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
} from "react-native";
import * as Animatable from "react-native-animatable";
import Bgcover from "../Component/Bg/BackgroundCover";

import { Dropdown } from "react-native-material-dropdown";

let dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const WithdrawScreen = (props) => {
  let testRef = React.useRef();
  let [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    console.log(testRef.current);
  });

  return (
    <Bgcover name="Withdraw">
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
            <Dropdown
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
            />

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
            Total Amount Spent
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 28, color: "white" }}>
            # 500,000.00
          </Text>
          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("WithdrawCOG");
            }}
            style={{
              padding: 10,
              borderRadius: 5,
              backgroundColor: "#F18921",
              width: 100,
              alignSelf: "flex-end",
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
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            flexDirection: "row",

            marginHorizontal: 5,
          }}
        >
          <TouchableOpacity style={{ alignSelf: "center" }}>
            <Image source={require("../assets/right-arrow.png")} />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <TouchableOpacity
              style={{
                padding: 10,
                width: "47%",
                backgroundColor: "#F18921",
                borderRadius: 10,
              }}
              onPress={() => props.navigation.navigate("WithdrawCOG")}
            >
              <Image source={require("../assets/money2.png")} />
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              >
                Withdraw Account Balance
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("WithdrawComission")}
              style={{
                padding: 10,
                width: "47%",
                backgroundColor: "#F18921",
                borderRadius: 10,
                marginLeft: "auto",
              }}
            >
              <Image source={require("../assets/money3.png")} />
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              >
                Withdraw Commission Balance{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ alignSelf: "center" }}>
            <Image source={require("../assets/right-arrow2.png")} />
          </TouchableOpacity>
        </View>

        <Text
          //  ref={testRef}
          style={{
            fontWeight: "bold",
            fontSize: 15,
            marginTop: 30,
            marginLeft: 20,
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
            marginLeft: 22,
            marginBottom: 10,
          }}
        ></View>
        <ScrollView contentContainerStyle={{ marginHorizontal: 20 }}>
          {dummyArray.map((ele, index) => {
            return (
              <View style={{ flexDirection: "row", marginBottom: 4 }}>
                <Text style={{}}>{index + 1}</Text>
                <View
                  style={{
                    marginLeft: 2,
                    height: 10,
                    backgroundColor: "#F98511",
                    borderWidth: 0,
                    width: 1.5,
                    alignSelf: "center",
                  }}
                ></View>
                <Text
                  style={{
                    marginLeft: 20,
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  Withdrawal
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
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
    </Bgcover>
  );
};

export default WithdrawScreen;
