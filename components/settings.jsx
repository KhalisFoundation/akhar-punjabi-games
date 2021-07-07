/* eslint-disable react-native/no-color-literals */
import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// import BottomSheet from "reanimated-bottom-sheet";
// import Animated from "react-native-reanimated";
import { ListItem, Header, Switch, BottomSheet } from "react-native-elements";

function Settings({ navigation }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const list = [
    { title: "List Item 1" },
    { title: "List Item 2" },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];
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
      <TouchableOpacity
        onPress={() => {
          setIsVisible((prev) => {
            console.log(prev);
            return !prev;
          });
        }}
      >
        <Header
          backgroundColor="#f8f8f8"
          leftComponent={{ icon: "menu", color: "red" }}
          centerComponent={{
            text: "Types of Words",
            style: { color: "red", fontSize: 25 },
          }}
          rightComponent={<Switch value={isVisible} />}
          statusBarProps={{ backgroundColor: undefined }}
          style={{ height: "50%" }}
        />
      </TouchableOpacity>
      <BottomSheet
        modalProps={{
          animationType: "slide",
          visible: isVisible,
          backgroundColor: "blue",
          transparent: true,
          onRequestClose: () => {
            setIsVisible((prev) => !prev);
          },
        }}
        // containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
      >
        {list.map((item) => (
          <ListItem
            key={item.title}
            containerStyle={item.containerStyle}
            onPress={item.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={item.titleStyle}>
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
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
    paddingTop: "10%",
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
});

export default Settings;
