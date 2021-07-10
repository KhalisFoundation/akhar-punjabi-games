/* eslint-disable react-native/no-color-literals */
import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";

import SettingsBar from "./settingBar";
import { setTypeOfWords } from "../redux/actions";

// import { useSelector } from "react-redux";

function Settings({ navigation }) {
  const dispatch = useDispatch();
  // const state = useSelector((theState) => theState.theGameReducer);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        title="Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Image
          source={require("../images/left_arrow.png")}
          style={styles.backArrow}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>SETTINGS</Text>
      </View>
      {/* <SettingsBar theImage={} title={} data={}/> */}
      <ScrollView style={styles.scroll}>
        <SettingsBar
          theSetting="Type of Words"
          theList={["Both", "Gurbani", "Punjabi"]} // the 0 index in theList is the default setting
          imageSource="khalislogo150"
          theAction={setTypeOfWords}
          dispatch={dispatch}
          // theCurrentOptionIndex={state.typesOfWordsSettingsIndex}
        />
        {/* <SettingsBar
          theSetting="Dark Mode"
          theList={["Off", "On"]}
          imageSource="khanda"
        /> */}
      </ScrollView>
    </View>
  );
}

// TODO - Move all colors to separate file and import as variables.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#5F909C",
    width: "100%",
    height: "100%",
    paddingTop: "5%",
  },
  backButton: {
    width: "10%",
    height: "10%",
    right: "40%",
    top: "3%",
  },
  backArrow: {
    width: "70%",
    height: "70%",
  },
  title: {
    fontSize: 32,
    bottom: "130%",
  },
  scroll: {
    width: "100%",
    height: "100%",
  },
});

export default Settings;
