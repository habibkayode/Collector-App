import React, { PureComponent } from "react";
import { View, Animated, ViewPropTypes, Image, Text } from "react-native";

export default class Indicator extends PureComponent {
  render() {
    let {
      pages,
      progress,
      indicatorColor: backgroundColor,
      indicatorOpacity,
      indicatorPosition,
      style,
      ...props
    } = this.props;

    let indicator = [1, 2, 3].map((page, index) => {
      let opacity = progress.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [indicatorOpacity, 1.0, indicatorOpacity],
        extrapolate: "clamp",
      });

      let style = { opacity, backgroundColor };

      return (
        <Animated.View
          style={[style, { padding: 5, borderRadius: 3 }]}
          key={index}
        >
          <Image source={require("../../assets/coins.png")} />
          <Text>Commission</Text>
        </Animated.View>
      );
    });

    let dots = Array.from(new Array(pages), (page, index) => {
      let opacity = progress.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [indicatorOpacity, 1.0, indicatorOpacity],
        extrapolate: "clamp",
      });

      let style = { opacity, backgroundColor };

      return (
        <Animated.View
          style={[
            style,
            {
              backgroundColor: "white",
              borderRadius: 4,
              width: 8,
              height: 8,
              margin: 4,
            },
          ]}
          key={index}
        />
      );
    });

    let flexDirection = /^(top|bottom)$/.test(indicatorPosition)
      ? "row"
      : "column";

    return (
      <View
        style={[
          {
            justifyContent: "center",
            margin: 4,
          },
          { flexDirection },
          style,
        ]}
        {...props}
      >
        {indicator}
      </View>
    );
  }
}
