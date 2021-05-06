import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "./color";
import { useNavigation } from "@react-navigation/native";

let Accordion = (props) => {
  let navigation = useNavigation();
  let [expanded, setExpanded] = useState(false);
  let data = props.data;
  let accordian = useRef().current;
  // let materials = JSON.parse(props.data.materials);
  let materials = props.data.materials;
  let homogenouesMaterial = props.data.homogeneous_materials;
  let allMaterial = props.allMaterial;
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity
        ref={accordian}
        style={styles.row}
        onPress={() => toggleExpand()}
      >
        <Text style={[styles.title, styles.font]}>
          {props.title.toLocaleString()}
        </Text>
        <Icon
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={30}
          color={Colors.DARKGRAY}
        />
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && (
        <View style={styles.child}>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={styles.mainHeading}>Material Types{" & "}Tonnage</Text>
            <View style={styles.leftWrapper}>
              {homogenouesMaterial.map((i) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{i.name}:</Text>
                    <Text>{i.pivot.tonnage}kg</Text>
                  </View>
                );
              })}
            </View>

            <Text style={styles.mainHeading}>Total Tonnage</Text>
            <View style={styles.leftWrapper}>
              <View style={{ flexDirection: "row" }}>
                <Text>
                  {homogenouesMaterial.reduce((sum, current) => {
                    return sum + current.pivot.tonnage;
                  }, 0)}
                  kg
                </Text>
              </View>
            </View>

            <Text style={styles.mainHeading}>Estimated Commission</Text>
            <View style={styles.leftWrapper}>
              <View style={{ flexDirection: "row" }}>
                <Text>
                  NGN {"  "}
                  {homogenouesMaterial.reduce((sum, current) => {
                    return sum + current.collector_commission;
                  }, 0)}
                </Text>
              </View>
            </View>

            <Text style={styles.mainHeading}>Estimated Cost of Goods</Text>
            <View style={styles.leftWrapper}>
              <View style={{ flexDirection: "row", marginBottom: 20 }}>
                <Text>
                  NGN {"  "}
                  {homogenouesMaterial.reduce((sum, current) => {
                    return sum + Number(current.pivot.price);
                  }, 0)}
                </Text>
              </View>
            </View>
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate("ConfirmTonnageByAgent");
              }}
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                alignSelf: "flex-end",
                backgroundColor: "green",
                borderRadius: 10,
                marginTop: 30,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 12, fontWeight: "bold" }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
        
        */}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.DARKGRAY,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: "center",
    backgroundColor: Colors.CGRAY,
  },
  parentHr: {
    height: 1,
    color: Colors.WHITE,
    width: "100%",
  },
  child: {
    backgroundColor: Colors.LIGHTGRAY,
    // padding: 16,
  },
  mainHeading: { fontSize: 15, fontWeight: "bold", marginTop: 20 },
  leftWrapper: { marginTop: 10, marginLeft: 20 },
});

export default Accordion;
