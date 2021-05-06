import React from "react";
import {
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Container, H1, Text, Button } from "native-base";
import * as Animatable from "react-native-animatable";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SplashScreen = ({ navigation }) => {
  return (
    <Container>
      <ImageBackground
        source={require("../assets/background/bg1.jpg")}
        style={{ height: "100%", width: "100%" }}
      >
        <View
          style={{
            marginTop: StatusBar.currentHeight + 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}


        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              color="#6F6F6F"
              size={30}
            />
          </TouchableOpacity>
          <Image
            style={{
              alignSelf: "flex-end",
            }}
            source={require("../assets/logo-small.png")}
          />
        </View>
        <StatusBar backgroundColor="#EF7700" barStyle="light-content" />
        <View style={styles.content}>
          <Animatable.View animation="fadeInUpBig">
            <H1
              style={{
                marginBottom: 20,
                fontWeight: "bold",
                fontSize: 32,
                fontFamily: "",
              }}
            >
              Scrapays
            </H1>
            <Text style={{ marginBottom: 40, fontSize: 18 }}>
              Collect and aggregate recyclable and "Out-of-Use" items, make
              money while being environmentally freindly
            </Text>

            <Button
              style={styles.buttonPrimary}
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text style={styles.buttonText}>Log in </Text>
            </Button>
            <Button
              style={styles.buttonSecondary}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: "#EF7700",
                    textAlign: "center",
                  },
                ]}
              >
                Sign up
              </Text>
            </Button>
          </Animatable.View>
        </View>
      </ImageBackground>
    </Container>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  buttonPrimary: {
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
    padding: 5,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonSecondary: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
    borderColor: "#EF7700",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
    height: 50,
    alignSelf: "center",
  },

  buttonText: {
    fontSize: 20,
    textTransform: "capitalize",
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    flex: 1,
  },
});
