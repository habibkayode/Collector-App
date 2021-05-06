import React from "react";
import { ImageBackground } from "react-native";

const Background = () => {
  return (
    <ImageBackground
      source={require("../assets/background/bg1.jpg")}
      style={{ height: "100%", width: "100%" }}
    ></ImageBackground>
  );
};

export default Background;
