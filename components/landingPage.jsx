import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
} from "react-native";

function HomeScreen({ navigation }) {
  return (
    <ImageBackground style={styles.container} 
    source={require("../assets/background.png")}>
      <Text style={styles.text}>ੴਸਤਿਗੁਰਪ੍ਰਸਾਦਿ॥</Text>
      <Image style={styles.logo} 
      source={require("../assets/logo.png")} />

      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => {
          navigation.navigate("Next");
        }}
      >
        <Image
          style={styles.play}
          source={require("../assets/Play.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity>
         <Image
          style={styles.settings}
          source={require("../assets/settings.png")}
        />
      </TouchableOpacity>
     
     <TouchableOpacity>
        <Image
          style={styles.levels}
          source={require("../assets/levels.png")}
        />  
     </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 35,
  },
  text: {
    fontSize: 20,
  },
  logo: {
    width: 500,
    height: 500,
    top: 50,
  },
  play: {
    height: 100,
    width: 200,
    bottom: 250,
    right: 75,
    backgroundColor:`black`,
  },

  settings: {
      height: 150,
      width: 100,
      marginTop: 80,
      right: 80,
  },

  levels: {
    height: 150,
    width: 100,
    left: 80,
    bottom: 150,
  },

  touchableOpacity: {
    top: 220,
    borderRadius: 10,
    height: 30,
    width: 50,
  },
  background: {
      flex: 1,
      height: 500,
      width: 500
  },

  button: {
   backgroundColor: "black",
   width: "100%",
   height: 70
  }
});

export default HomeScreen;