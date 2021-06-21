import React, { useEffect, useRef, useState } from "react";
import { Image, Alert } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { Text, TouchableOpacity, PermissionsAndroid } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import IntroScreen from "./screens/IntroScreen";
//import SplashScreen from "./screens/SplashScreen";
import FirstScreen from "./screens/SplashScreen";
import { StyleProvider, View } from "native-base";
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignUpPinScreen from "./screens/SignUpPinScreen";
import CodePinScreen from "./screens/CodePinScreen";
import DashBoard from "./screens/Dashboard";
import PickupScreen from "./screens/PickUpScreen";
import AcceptPickUp from "./screens/AcceptPickupScreen";
import CollectionLogScreen from "./screens/CollectionLogScreen";
import MapScreen from "./screens/MapScreen";
//import ProcessPickupScreen from "./screens/ProcessPickUpScreen";
import ProcessPickupScreen from "./screens/newP";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import PaymentConfirm from "./screens/PaymentConfirmScreen";
import BulkOfTakeScreen from "./screens/BulkOffTakeScreen";
//import WalletScreen from "./screens/Wallet";
import WalletScreen from "./screens/WalletScreen_New";
import SearchAgentScreen from "./screens/SearchAgentScreen";
import ConfirmationPageScreen from "./screens/ConfirmationPageScreen";
import RecievedScreen from "./screens/ReceivedScreen";
import ConfirmTonnageByAgent from "./screens/ConfirmTonnageByAgent";
//import CollectionHistory from "./screens/CollectionHistoryScreen";
import CollectionHistory from "./screens/NewCollectionHistory";

import CollectionHistoryDetailScreen from "./screens/CollectionHistoryDetailScreen";
import WithdrawScreen from "./screens/WithdrawScreen";
import WithdrawCOGScreen from "./screens/WithdrawCOGScreen";
import WithdrawComission from "./screens/WithdrawCommission";
import { connect } from "react-redux";
import NetworkModal from "./Component/NetworkModal";
import NetInfo from "@react-native-community/netinfo";
import Echo from "laravel-echo";
import PusherNative from "pusher-js/react-native";
import { Notifications } from "react-native-notifications";
//import * as Pusher from "pusher";
import firebase from "react-native-firebase";
//window.pusher = PusherNative;
import {
  savePickupAndImages,
  updateNetWork,
  updateSideBar,
  saveLoginLocation,
  updateNewNotificationPop,
  updateNewRequestPop,
} from "./Redux/actionCreator";
import { BleManager } from "react-native-ble-plx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NetworkLoading from "./Component/NetworkLoading";
import Rejected from "./screens/RejectedPickupScreen";
import AgentMapScreen from "./screens/AgentMapScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CompositePriceScreen from "./screens/CompositePriceScreen";
import MessageScreen from "./screens/MessageScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "react-native-geolocation-service";
import { store } from "./Redux/store";
import { updateLocation } from "./Api/api";
import WalletDetailScreen from "./screens/WalletDetailScreen";
import WalletHistory from "./screens/WalletHistory";
import NewPickup from "./Component/NewPickup";
import { baseURL } from "./Api/axios";
import FundWalletScreen from "./screens/FundWalletScreen";
import WalletToWalletScreen from "./screens/WalletToWalletScreen";
import NewMessage from "./Component/NewMessage";
import ForgetPassword from "./screens/ForgetPassword";
import ForgetPasswordCodePinScreen from "./screens/ForgetPasswordCodePinScreen";
import InputPassword from "./screens/InputPasswordScreen";

const mapStateToProps = (state) => {
  return {
    connected: state.normal.connetcted,
    pickupRequests: state.normal.pickupRequests,
    materials: state.normal.materials,
    pickupAndImage: state.normal.pickupAndImage,
    networkLoading: state.normal.networkLoading,
    showSideBar: state.normal.showSideBar,
    loggedIn: state.normal.loggedIn,
    token: state.token,
    pickupAlert: state.normal.showPickupAlert,
    messageAlert: state.normal.showMessageAlert,
  };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [logedIn, setLogedIn] = useState(false);
  let getStatus = async () => {
    let getStatus = await AsyncStorage.getItem("logedIn");

    console.log(getStatus, "Logiee");
    if (getStatus !== null && getStatus === "true") {
      console.log(getStatus);
      setLogedIn(true);
    } else {
      setLogedIn(false);

      AsyncStorage.setItem("logedIn", "true");
    }
  };
  useEffect(() => {
    getStatus().then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading) SplashScreen.hide();
  }, [loading]);
  if (!loading) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={logedIn ? "Splash" : "Intro"}
      >
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Splash" component={FirstScreen} />
        {/* <Stack.Screen name="Splash" component={WalletScreen} /> */}

        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignUpPin" component={SignUpPinScreen} />
        <Stack.Screen name="CodePin" component={CodePinScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />

        <Stack.Screen name="InputPassword" component={InputPassword} />

        <Stack.Screen
          name="ForgetPasswordCodePin"
          component={ForgetPasswordCodePinScreen}
        />
      </Stack.Navigator>
    );
  } else {
    return <Text>Loading</Text>;
  }
};

const WalletNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="wallet" component={WalletScreen} />
      <Stack.Screen name="Withdraw" component={WithdrawScreen} />
      <Stack.Screen name="WithdrawCOG" component={WithdrawCOGScreen} />
      <Stack.Screen name="WithdrawComission" component={WithdrawComission} />
      <Stack.Screen name="WalletHistory" component={WalletHistory} />
      <Stack.Screen name="WalletDetail" component={WalletDetailScreen} />
      <Stack.Screen name="WalletToWallet" component={WalletToWalletScreen} />
      <Stack.Screen name="FundWallet" component={FundWalletScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Dashboard"
      >
        <Stack.Screen name="Dashboard" component={DashBoard} />
        {/* <Stack.Screen name="Pickup" component={PickupScreen} /> */}
        <Stack.Screen name="AcceptPickup" component={AcceptPickUp} />
        <Stack.Screen name="RejectPickup" component={Rejected} />
        <Stack.Screen name="CollectionLog" component={CollectionLogScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="ProcessPickup" component={ProcessPickupScreen} />
        <Stack.Screen name="confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="PaymentConfirm" component={PaymentConfirm} />
        <Stack.Screen name="BulkOfTake" component={BulkOfTakeScreen} />
        {/* <Stack.Screen name="Wallet" component={WalletScreen} /> */}
        {/* <Stack.Screen name="Withdraw" component={WithdrawScreen} /> */}
        <Stack.Screen name="SearchAgent" component={SearchAgentScreen} />
        {/* <Stack.Screen name="WithdrawCOG" component={WithdrawCOGScreen} /> */}
        <Stack.Screen name="AgentMap" component={AgentMapScreen} />
        <Stack.Screen name="CompositePrice" component={CompositePriceScreen} />

        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen
          name="CollectionHistoryDetail"
          component={CollectionHistoryDetailScreen}
        />
        {/* <Stack.Screen name="CollectionHistory" component={CollectionHistory} /> */}

        <Stack.Screen
          name="ConfirmTonnageByAgent"
          component={ConfirmTonnageByAgent}
        />
        <Stack.Screen name="Received" component={RecievedScreen} />
        <Stack.Screen
          name="ConfirmationPage"
          component={ConfirmationPageScreen}
        />
        {/* <Stack.Screen name="WithdrawComission" component={WithdrawComission} /> */}
      </Stack.Navigator>
    </>
  );
};

let CollectionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="CollectionHistory"
    >
      <Stack.Screen name="CollectionHistory" component={CollectionHistory} />
      <Stack.Screen
        name="CollectionHistoryDetail"
        component={CollectionHistoryDetailScreen}
      />
    </Stack.Navigator>
  );
};

let TabsNavigator = ({ messageAlert, pickupAlert }) => {
  console.log(messageAlert, "piuuu");

  let _watchId = useRef();
  let getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log("Your Firebase Token is:", fcmToken);
    } else {
      console.log("Failed", "No token received");
    }
  };
  let requestUserPermission = async () => {
    let authStatus = await firebase.messaging().requestPermission();

    firebase
      .messaging()
      .getToken()
      .then((token) => console.log(token, "my tkk"));

    console.log(authStatus, "auth");
    const enabled =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken(); //<---- Add this
      console.log("Authorization status:", authStatus);
    }
  };
  PusherNative.logToConsole = false;

  let PusherClient = new PusherNative("b707e1c311cbd3a39c77", {
    cluster: "eu",
    // wsHost: "{YOUR_HOST}",
    // wsPort: "6001",
    // enabledTransports: ["ws"],
    // forceTLS: false,
    auth: {
      headers: {
        Authorization: `Bearer ${store.getState().normal.token}`,
      },
    },

    authEndpoint: `${baseURL}/broadcasting/auth`,
  });

  let subscribeEcho = () => {
    let echo = new Echo({
      broadcaster: "pusher",
      client: PusherClient,
    });

    // echo.channel("search-users").listen(".SEARCH_USERS", (e) => {
    //   console.log(e, "echo event");
    // });
    echo
      .private("notifications." + store.getState().normal.userData.id)
      .listen(".SEND_NOTIFICATION", (e) => {
        console.log(e, "new notification");
      });
    // echo.private("pickup-requests").listen(".ASSIGN_PICKUP", (e) => {
    //   console.log(e, "new assign Pickup-request");
    //   store.dispatch(updateNewRequestPop(true));
    //   setTimeout(() => {
    //     store.dispatch(updateNewRequestPop(false));
    //   }, 5000);
    // });
  };

  let watchLocation = async () => {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Scrapays Location Permission",
        message: "Scrapays App needs access to your location ",
      }
    );
    if (granted) {
      _watchId.current = Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          store.dispatch(saveLoginLocation({ lat: latitude, lng: longitude }));
          updateLocation(latitude, longitude);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 5,
          interval: 5000,
          fastestInterval: 5000,
        }
      );
    }
  };

  // useEffect(() => {
  //   getFcmToken();
  //   const unsubscribe = firebase
  //     .messaging()
  //     .onMessage(async (remoteMessage) => {
  //       Alert.alert(
  //         "A new FCM message arrived!",
  //         JSON.stringify(remoteMessage)
  //       );
  //     });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    watchLocation();
    subscribeEcho();
    // requestUserPermission();
    // firebase.notifications().onNotification((notification) => {
    //   const { title, body } = notification;
    //   console.log(title, body);
    // });

    return () => {
      console.log(_watchId, "watch id");
      Geolocation.clearWatch(_watchId.current);
      //  Geolocation.stopObserving();
    };
  }, []);

  console.log(messageAlert, "pliiiiiii");
  return (
    <>
      {messageAlert && <NewMessage />}

      {pickupAlert && <NewPickup />}
      <Tab.Navigator
        tabBarOptions={{ style: { height: 70 }, activeTintColor: "black" }}
      >
        <Tab.Screen
          options={({ navigation }) => ({
            tabBarButton: (props) => {
              return (
                <TouchableOpacity
                  {...props}
                  onPress={() => {
                    navigation.navigate("Dashboard");
                  }}
                />
              );
            },
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <View
                  style={{
                    padding: 5,
                    backgroundColor: "rgba(241, 137, 33, 0.3)",
                    borderRadius: 8,
                  }}
                >
                  <MaterialCommunityIcons
                    name="view-dashboard"
                    color="rgba(241, 137, 33, 0.8)"
                    size={25}
                  />
                </View>
              ) : (
                <MaterialCommunityIcons
                  name="view-dashboard"
                  color="rgba(241, 137, 33, 0.8)"
                  size={25}
                />
              ),
          })}
          name="Home"
          component={MainNavigator}
        />

        <Tab.Screen
          name="CollectionHistory"
          options={({ navigation }) => ({
            tabBarButton: (props) => {
              return (
                <TouchableOpacity
                  {...props}
                  onPress={() => {
                    navigation.navigate("CollectionHistory", {
                      screen: "CollectionHistory",
                    });
                  }}
                />
              );
            },
            tabBarLabel: "Collection History",
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <View
                  style={{
                    padding: 5,
                    backgroundColor: "rgba(241, 137, 33, 0.3)",
                    borderRadius: 8,
                  }}
                >
                  <MaterialCommunityIcons
                    name="history"
                    color="rgba(241, 137, 33, 0.8)"
                    size={33}
                  />
                </View>
              ) : (
                <MaterialCommunityIcons
                  name="history"
                  color="rgba(241, 137, 33, 0.8)"
                  size={33}
                />
              ),
          })}
          component={CollectionStack}
        />

        <Tab.Screen
          name="Pickup"
          options={{
            tabBarButton: (props) => {
              return <TouchableOpacity {...props} />;
            },
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <View
                  style={{
                    padding: 5,
                    backgroundColor: "rgba(241, 137, 33, 0.3)",
                    borderRadius: 8,
                  }}
                >
                  <MaterialCommunityIcons
                    name="bell"
                    color="rgba(241, 137, 33, 0.8)"
                    size={33}
                  />
                </View>
              ) : (
                <MaterialCommunityIcons
                  name="bell"
                  color="rgba(241, 137, 33, 0.8)"
                  size={33}
                />
              ),
          }}
          component={PickupScreen}
        />
        <Tab.Screen
          name="Wallet"
          options={({ navigation }) => ({
            tabBarButton: (props) => {
              return (
                <TouchableOpacity
                  {...props}
                  onPress={() =>
                    navigation.navigate("Wallet", { screen: "wallet" })
                  }
                />
              );
            },
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <View
                  style={{
                    padding: 5,
                    backgroundColor: "rgba(241, 137, 33, 0.3)",
                    borderRadius: 8,
                  }}
                >
                  <MaterialCommunityIcons
                    name="wallet"
                    color="rgba(241, 137, 33, 0.8)"
                    size={33}
                  />
                </View>
              ) : (
                <MaterialCommunityIcons
                  name="wallet"
                  color="rgba(241, 137, 33, 0.8)"
                  size={33}
                />
              ),
          })}
          component={WalletNavigator}
        />
      </Tab.Navigator>
    </>
  );
};

TabsNavigator = connect(mapStateToProps)(TabsNavigator);

const RootNavigator = ({ loggedIn, messageAlert, pickupAlert }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {loggedIn ? (
        <Stack.Screen name="Tab" component={TabsNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

const mapDispatchToProps = (dispatch) => {
  console.log("her");
  return {
    updateNetWork: (state) => {
      dispatch(updateNetWork(state));
    },

    updateSideBar: () => {
      dispatch(updateSideBar(false));
    },
    saveLoginLocation: (obj) => {
      dispatch(saveLoginLocation(obj));
    },
  };
};

const App = (props) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const offline = state.isConnected && state.isInternetReachable;
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      console.log(offline, "state is changeng");
      props.updateNetWork(offline);
    });

    return () => unsubscribe();
  }, []);

  return (
    <StyleProvider style={getTheme(material)}>
      <>
        {!props.connected && <NetworkModal />}
        {props.networkLoading && <NetworkLoading />}

        {/* <NavigationContainer> */}
        <RootNavigator loggedIn={props.loggedIn} />
        {/* </NavigationContainer> */}
      </>
    </StyleProvider>
    //   </Provider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
