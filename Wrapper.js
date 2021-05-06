import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

const Wrapper = (props) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Wrapper;
