import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

function HomeScreen({ navigation }) {
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
      <Text style={styles.title}>ਅਖਰ ਜੋੜੋ </Text>
      <View style={styles.wordBoxAnswers}>
        <View style={styles.wordBoxTexts}></View>
      </View>
      <View style={styles.wordAttempt}></View>
      <View style={styles.lettersCircle}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#5F909C",
    paddingTop: "9%",
  },
  backButton: {
    width: "10%",
    height: "7%",
    right: "40%",
  },
  backArrow: {
    width: "90%",
    height: "90%",
  },
  title: {
    fontSize: 60,
    bottom: 65,
  },
  wordBoxAnswers: {
    bottom: 65,
    width: 350,
    height: 250,
    backgroundColor: "#9C734F",
    borderRadius: 20,
  },
  wordBoxText: {
    // bottom: 65,
    // width: 350,
    // height: 250,
    // backgroundColor: "#9C734F",
    // borderRadius: 20,
  },
  wordAttempt: {
    bottom: 58,
    width: 200,
    height: 50,
    backgroundColor: "#CFF6FF",
    borderRadius: 20,
  },
  lettersCircle: {
    bottom: 50,
    width: 350,
    height: 350,
    borderRadius: 200,
    backgroundColor: "#E8C4A5",
  },
});

export default HomeScreen;
