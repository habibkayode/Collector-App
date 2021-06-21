import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import PushNotificationManager from "./PushNotificationsManager";

const Wrapper = (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <PushNotificationManager>
          <App />
        </PushNotificationManager>
      </NavigationContainer>
    </Provider>
  );
};

export default Wrapper;
