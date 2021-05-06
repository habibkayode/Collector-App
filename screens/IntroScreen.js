import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from "react-native-vector-icons/Ionicons";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const data = [
  {
    title: "Make extra cash collecting scrap.",
    image: require("../assets/intro/intro-1.png"),
    bg: "#FCECD3",
  },
  {
    title: "There is so much value in waste.",
    image: require("../assets/intro/intro-2.png"),
    bg: "#FCECD3",
  },
  {
    title: "Oya start to dey make money from Scrap.",
    image: require("../assets/intro/intro-3.png"),
    bg: "#FCECD3",
  },
];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  image: {
    width: 320,
    height: 200,
  },
  title: {
    fontSize: 55,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
  },
  bottomEle: {
    color: "black",
    opacity: 0.6,
    textAlignVertical: "center",
    fontWeight: "bold",
    marginTop: 12,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

_renderNextButton = () => {
  return (
    <View style={styles.buttonCircle}>
      <MaterialCommunityIcons
        name="arrow-right"
        color="rgba(255, 255, 255, .9)"
        size={24}
      />
    </View>
  );
};
_renderDoneButton = () => {
  return (
    <View style={styles.buttonCircle}>
      <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
    </View>
  );
};

const IntroScreen = ({ navigation }) => {
  const _renderItem = ({ item }) => {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
      </ScrollView>
    );
  };

  const _keyExtractor = (item) => item.title;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        skipLabel={"Skip"}
        showSkipButton={true}
        onSkip={() => navigation.navigate("Splash")}
        renderSkipButton={() => <Text style={styles.bottomEle}>Skip</Text>}
        keyExtractor={_keyExtractor}
        activeDotStyle={{ backgroundColor: "#72DFC5" }}
        dotStyle={{
          backgroundColor: "transparent",
          borderColor: "white",
          borderWidth: 1,
        }}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        renderItem={_renderItem}
        data={data}
        onDone={() => navigation.navigate("Splash")}
      />
    </View>
  );
};

export default IntroScreen;
