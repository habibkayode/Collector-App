import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import {
  updateBleCon,
  saveBonded,
  saveDiscoverList,
  saveDiscoveringState,
  updateConnected,
  updateSelectedDevice,
} from "../../Redux/actionCreator";
import RNBluetoothClassic from "react-native-bluetooth-classic";
import * as BLEapi from "../../Api/bluetoothApi";
import { useNavigation } from "@react-navigation/native";
import Button from "../../native-base-theme/components/Button";

const mapStateToProps = (state) => {
  return {
    bluetoothBondedList: state.bluetooth.bondedList,
    bluetoothState: state.bluetooth.bluetoothConneted,
    discoverList: state.bluetooth.discoverList,
    discoveringStatus: state.bluetooth.discovering,
    selectedDevice: state.bluetooth.selectedDevice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBleCon: (state) => {
      console.log(state, "bluetooth State");
      dispatch(updateBleCon(state));
    },
    saveBonded: (list) => {
      dispatch(saveBonded(list));
    },
    saveDiscoverList: (list) => {
      dispatch(saveDiscoverList(list));
    },
    saveDiscoveringState: (state) => {
      dispatch(saveDiscoveringState(state));
    },
    updateConnected: (state) => {
      dispatch(updateConnected(state));
    },
    updateSelectedDevice: (obj) => {
      dispatch(updateSelectedDevice(obj));
    },
  };
};

const BluetoothModal = (props) => {
  const navigation = useNavigation();
  const [discoverList, setDiscoverList] = useState([]);
  const [connectionError, setConnectionError] = useState({
    value: false,
    message: "",
  });

  useEffect(() => {
    console.log("about to connect", props.selectedDevice == true);
    if (props.selectedDevice) {
      console.log("connecting to ", props.selectedDevice.name);
      BLEapi.connect()
        .then(() => {
          setDiscoverList([]);
        })
        .catch((e) => setConnectionError({ value: true, message: e.message }))
        .finally(() => {});
    }
  }, [props.selectedDevice]);

  useEffect(() => {
    if (props.bluetoothState) {
      console.log("i am discovring", props.bluetoothState);
      BLEapi.startDiscovery();
    }

    // getBondedDevices();
  }, [props.bluetoothState]);

  useEffect(() => {
    if (props.discoverList.length > 0) {
      console.log("checking for QH");
      let fi = props.discoverList.filter((i) => i.name === "QH");
      setDiscoverList(fi);
      console.log("found ", fi.length, "QH");
      if (fi.length > 0) {
        let bonded = fi.filter((k) => k.bonded === true);
        if (bonded.length > 0) {
          console.log("connecting to bonded");
          props.updateSelectedDevice(bonded[0]);
        } else {
          console.log("connecting to the first scale");
          props.updateSelectedDevice(fi[0]);
        }
      } else {
        console.log("no scale found");
      }
    }
  }, [props.discoverList]);

  let getBondedDevices = async (unloading) => {
    console.log("DeviceListScreen::getBondedDevices");
    try {
      let bonded = await RNBluetoothClassic.getBondedDevices();
      console.log("DeviceListScreen::getBondedDevices found", bonded);
      setBondedList(bonded);
      props.saveBonded(bonded);
    } catch (error) {
      props.saveBonded([]);
      setBondedList([]);
    }
  };

  const retry = () => {
    BLEapi.startDiscovery();
  };

  return (
    <>
      <Modal
        isVisible={true}
        style={styles.modal}
        animationInTiming={600}
        onBackButtonPress={() => navigation.goBack()}
        backdropOpacity={0.6}
      >
        <View style={[styles.modalContainer, { marginBottom: 20 }]}>
          <Text
            style={[
              styles.modalTitle,
              { marginBottom: 20, color: "white", fontWeight: "bold" },
            ]}
          >
            Connecting to the IOT Scale
          </Text>
          <Image
            source={require("../../assets/scale.png")}
            style={{ marginBottom: 20 }}
          />
          {!props.bluetoothState && (
            <Text
              style={[styles.modalText, { color: "red", fontWeight: "bold" }]}
            >
              Please On your Bluetooth
            </Text>
          )}
          {props.bluetoothState && props.discoveringStatus && (
            <View>
              <Text
                style={[
                  styles.modalText,
                  { color: "white", fontWeight: "bold" },
                ]}
              >
                Scanning for IOT Scale
              </Text>
              <ActivityIndicator size="large" color="#EF7700" />
            </View>
          )}
          {props.bluetoothState &&
            !props.discoveringStatus &&
            discoverList.length === 0 && (
              <View>
                <Text
                  style={[
                    styles.modalText,
                    { color: "white", fontWeight: "bold" },
                  ]}
                >
                  IOT Scale not found
                </Text>
                <TouchableOpacity
                  onPress={retry}
                  style={{
                    alignSelf: "center",
                    padding: 10,
                    backgroundColor: "#EF7700",
                    borderRadius: 10,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    Retry
                  </Text>
                </TouchableOpacity>
              </View>
            )}

          {props.bluetoothState &&
            !props.discoveringStatus &&
            discoverList.length > 0 && (
              <View>
                <Text
                  style={[
                    styles.modalText,
                    { color: "white", fontWeight: "bold" },
                  ]}
                >
                  Connecting to an IOT Scale
                </Text>
                <ActivityIndicator size="large" color="#EF7700" />
              </View>
            )}
        </View>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothModal);

const styles = StyleSheet.create({
  modal: {
    //justifyContent: "flex-end",
    margin: 0,
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 20,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
  },
  modalText: {
    fontSize: 18,
    color: "#555",
    marginTop: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
