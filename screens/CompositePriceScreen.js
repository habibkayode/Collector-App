import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Bgcover from "../Component/Bg/BackgroundCover";
import RNPickerSelect from "react-native-picker-select";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Container, Header, Content, Picker, Form } from "native-base";
import { connect } from "react-redux";
import { numberWithCommas } from "../helper/helper";

const mapStateToProps = (state) => {
  return {
    compositeMaterial: state.normal.compositeMaterial,
  };
};

const CompositePriceScreen = (props) => {
  let [data, setData] = useState({});

  useEffect(() => {
    setData(props.compositeMaterial);
    console.log(props.compositeMaterial);
  }, [props.compositeMaterial]);

  const handleTextChange = (values) => {
    // let newState =  props. compositeMaterial.filter((ele) => {
    //   let eleValue = ele.class_name.toUpperCase();
    //   let valueCap = values.toUpperCase();
    //   return eleValue.indexOf(valueCap) > -1;
    // });
    // setData(newState);

    let newobj = {};
    for (const ele in props.compositeMaterial) {
      if (ele.toUpperCase().indexOf(values.toUpperCase()) > -1) {
        newobj[ele] = props.compositeMaterial[ele];
      }
    }

    // let newState = Object.keys(props.compositeMaterial).filter((i) => {
    //   let className = i.toUpperCase();
    //   let valueCap = values.toUpperCase();
    //   return className.indexOf(valueCap) > -1;
    // });
    setData(newobj);
  };

  return (
    <Bgcover name="Composite Material Price List ">
      <ScrollView
        contentContainerStyle={{
          padding: 10,
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            marginHorizontal: 20,
            height: 50,
            backgroundColor: "#F0F0F0",
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Image
            style={{ marginRight: 10 }}
            source={require("../assets/loupe1.png")}
          />
          <TextInput
            placeholder="search for composite"
            placeholderTextColor="#D3D3D3"
            style={{ fontSize: 15, fontWeight: "bold", flex: 1 }}
            onChangeText={handleTextChange}
          />
        </View>

        {Object.keys(data).map((i) => (
          <Log items={data[i]} name={i} />
        ))}
      </ScrollView>
    </Bgcover>
  );
};

let EachComposite = (props) => {
  let [selectedValue, setSelectedValue] = useState({});

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        flexDirection: "row",
        marginHorizontal: 10,
        paddingHorizontal: 10,
        width: "100%",
      }}
    >
      <View style={{ width: "100%", flex: 1, height: 90 }}>
        <Text style={styles.bodyText}>{props.item.class_name}</Text>
        <Picker
          mode="dropdown"
          style={{
            width: 150,
            fontSize: 8,
            borderWidth: 1,
            borderColor: "black",
            borderStyle: "solid",
          }}
          placeholder="Select One"
          placeholderStyle={{ color: "black" }}
          note={false}
          selectedValue={selectedValue}
          onValueChange={(e) => {
            console.log(e);
            setSelectedValue(e);
          }}
        >
          {props.item.items.map((i) => (
            <Picker.Item label={i.item} value={i.item} color="black" />
          ))}
        </Picker>
        {/* <Text style={{ fontSize: 12, fontWeight: "bold", marginRight: 3 }}></Text>

      <TouchableOpacity style={{ top: 1 }}>
        <MaterialCommunityIcons name="chevron-down" />
      </TouchableOpacity> */}

        <Text style={[styles.bodyText]}>NGN 30,000</Text>
        <Text style={styles.bodyText}>NGN 10,000</Text>
      </View>
    </ScrollView>
  );
};

let RenderRow = (props) => {
  let [selectedValue, setSelectedValue] = useState({});
  return (
    <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Text style={styles.bodyText}>{props.item.class_name}</Text>
      </View>
      {/* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Picker
          mode="dropdown"
          style={{
            width: 120,
            fontSize: 8,
            borderWidth: 1,
            borderColor: "black",
            borderStyle: "solid",
          }}
          placeholder="Select One"
          placeholderStyle={{ color: "black" }}
          note={false}
          selectedValue={selectedValue}
          onValueChange={(e) => {
            console.log(e);
            setSelectedValue(e);
          }}
        >
          {props.item.items.map((i) => (
            <Picker.Item label={i.item} value={i.item} color="black" />
          ))}
        </Picker>
      </View>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Text>NGN 30,000</Text>
      </View>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Text>NGN 30,000</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    flex: 1,
    // textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
    color: "white",
    textAlignVertical: "center",
  },
  bodyText: {
    fontWeight: "bold",
    fontSize: 12,
    textAlignVertical: "center",
    //  flex: 1,
  },
});

let Log = (props) => {
  let [selectedValue, setSelectedValue] = useState();
  let [obj, setObj] = useState({});
  // useEffect(() => {
  //   let selectObj = props.item.items.find((m) => m.item === selectedValue);
  //   if (selectObj) setObj(selectObj);
  // }, [selectedValue]);
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        padding: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 10,
        borderColor: "#F18921",
        borderWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>
          {props.name}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <RNPickerSelect
          placeholder={{
            label: "Select class of Material",
            value: "default",
            color: "black",
          }}
          onValueChange={(value) => {
            setSelectedValue(value);
          }}
          style={{
            viewContainer: {
              borderWidth: 1,
              borderColor: "#F18921",
              borderStyle: "solid",
              borderRadius: 10,
              // marginBottom: 20,
              // width: 400,
              flex: 1,
            },
            placeholder: {
              color: "black",
              fontWeight: "bold",
            },
            inputAndroid: {
              color: "black",
            },
          }}
          value={selectedValue}
          // items={[
          //   { label: "Composite", value: "Composite", color: "black" },
          //   { label: "Composite 1", value: "1", color: "black" },
          //   { label: "Composite 2", value: "2", color: "black" },
          // ]}
          items={props.items.map((i, index) => {
            return {
              label: i.item,
              value: index,
              color: "black",
            };
          })}
        />
      </View>
      <Image
        style={{ marginRight: 10, alignSelf: "center", marginTop: 20 }}
        source={require("../assets/image.png")}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 18 }}>Price</Text>
        <Text style={{ fontSize: 18 }}>
          {props.items[selectedValue] &&
            numberWithCommas(props.items[selectedValue].producer_commission)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 18 }}>Commission</Text>
        <Text style={{ fontSize: 18 }}>
          {props.items[selectedValue] &&
            numberWithCommas(props.items[selectedValue].collector_commission)}
        </Text>
      </View>
    </View>
  );
};

export default connect(mapStateToProps)(CompositePriceScreen);
