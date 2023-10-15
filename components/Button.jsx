import React from "react";
import PropTypes from "prop-types";
import * as Analytics from "expo-firebase-analytics";
import { TouchableOpacity, Text, Animated } from "react-native";

const Button = ({ gameId, navigation, text, btnStyle, textStyle }) => {
  const shadowHeight = new Animated.Value(4);
  const whichGame = async (gameName) => {
    await Analytics.logEvent("game_chosen", { gameName });
  };

  const handlePressIn = () => {
    Animated.timing(shadowHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(shadowHeight, {
      toValue: 4,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      style={[
        btnStyle,
        {
          shadowColor: "#EDD7C6",
          shadowRadius: 0.5,
          shadowOffset: { height: shadowHeight },
          shadowOpacity: shadowHeight.interpolate({
            inputRange: [0, 4],
            outputRange: [0, 1],
          }),
        },
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        whichGame(gameId);
        navigation.navigate(gameId);
      }}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  gameId: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  text: PropTypes.string.isRequired,
  btnStyle: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    borderRadius: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    justifyContent: PropTypes.string.isRequired,
    alignItems: PropTypes.string.isRequired,
    margin: PropTypes.number.isRequired,
  }).isRequired,
  textStyle: PropTypes.shape({
    fontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    textAlign: PropTypes.string.isRequired,
  }).isRequired,
};

export default Button;
