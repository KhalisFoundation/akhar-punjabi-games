/* eslint-disable react-native/no-color-literals */
import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Switch } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";

import theColors from "../../util/colors";

function SwitchBar({
  theSetting,
  imageSource,
  theList,
  theAction,
  theCurrentOptionIndex,
}) {
  const dispatch = useDispatch();

  const state = useSelector((theState) => theState.theGameReducer);
  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      height: 50,
    },
    settingBar: {
      flexDirection: "row",
      width: "100%",
      height: "99%",
      backgroundColor: colors.settingBar.settingBar,
    },
    image: {
      // flex: 1,
      width: "30%",
      height: "100%",
    },
    text1: {
      flex: 1,
    },
    rightSide: {
      flex: 1,
      flexDirection: "row",
    },
    text2: {
      // flex: 1,
    },
    icon: {
      // flex: 1,
    },
  });
  const allImages = {
    khalislogo150: require("../../images/khalislogo150.png"),
    khanda: require("../../images/khanda.png"),
    ikOngkar: require("../../images/ikOngkar.png"),
  };
  // const [isVisible, setIsVisible] = React.useState(false);
  const [currentSetting, setCurrentSetting] = React.useState(
    theList[theCurrentOptionIndex]
  );

  return (
    <View style={styles.container}>
      <View style={styles.settingBar}>
        <Image style={styles.image} source={allImages[imageSource]} />
        <Text style={styles.text1}>{theSetting}</Text>

        <View style={styles.rightSide}>
          <Text style={styles.text2}>
            {String(currentSetting).charAt(0).toUpperCase() +
              String(currentSetting).slice(1)}
          </Text>
          <Switch
            value={currentSetting}
            onValueChange={(newSetting) => {
              dispatch(theAction(newSetting));
              setCurrentSetting(newSetting);
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default SwitchBar;
