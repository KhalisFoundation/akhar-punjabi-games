import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ੴਸਤਿਗੁਰਪ੍ਰਸਾਦਿ॥</Text>
      <Text></Text>
      <Image style={styles.khanda} source={require("../images/khanda.png")} />
      <Image
        style={styles.logo}
        source={require("../images/khalislogo150white.png")}
      />
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => {
          navigation.navigate("Next");
        }}
      >
        <Text>PLAY</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 35,
    backgroundColor: "grey",
  },
  text: {
    fontSize: 20,
  },
  khanda: {
    width: 200,
    height: 220,
    top: 30,
  },
  logo: {
    top: 320,
  },
  touchableOpacity: {
    top: 220,
    backgroundColor: "white",
    borderRadius: 10,
    height: 30,
    width: 50,
    justifyContent: "center",
  },
});

export default HomeScreen;
