import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Linking,
  ScrollView,
  TouchableHighlight,
  StatusBar,
  Platform
} from "react-native";
import { Header } from "react-native-elements";
import { useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/MaterialIcons";
import GLOBAL from "../../util/globals";
import theColors from '../../util/colors';

function About({navigation}) {
  const state = useSelector((theState) => theState.theGameReducer);
  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      backgroundColor: "#fff",
    },
    nightMode: {
      backgroundColor: "#000",
      color: "#fff"
    },
    singleLine: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    title: {
      fontSize: 40,
      fontWeight: "bold"
    },
    small: {
      fontSize: 11
    }
  });

  return (
    <View
      style={{
        flex: 1,
        marginTop:'3.5%'
      }}
    >
      <StatusBar
        backgroundColor={GLOBAL.COLOR.TOOLBAR_COLOR_ALT2}
        barStyle={"light-content"}
      />
      <Header
        backgroundColor={GLOBAL.COLOR.TOOLBAR_COLOR_ALT2}
        containerStyle={[Platform.OS === "android" && { height: 56, paddingTop: 0 }]}
        leftComponent={
          <Icon
            name="arrow-back"
            color={GLOBAL.COLOR.TOOLBAR_TINT}
            size={30}
            onPress={() => {navigation.navigate('settings')}}
          />
        }
        centerComponent={{
          text: "About",
          style: { color: GLOBAL.COLOR.TOOLBAR_TINT, fontSize: 18 }
        }}
      />
      <ScrollView
        style={[
          styles.container,
          state.darkMode && { backgroundColor: "#000" }
        ]}
      >
        <Text
          style={[styles.title, state.darkMode && styles.nightMode]}
        >
          ਅਖਰ ਜੋੜ
        </Text>
        <Text
          style={[styles.small, state.darkMode && styles.nightMode]}
        >
          {"\n"}Created By:
        </Text>
        <TouchableHighlight
          underlayColor={"#009bff"}
          onPress={() => Linking.openURL("https://khalisfoundation.org")}
        >
          <Image
            source={
              state.darkMode
                ? require("../../images/khalislogo150white.png")
                : require("../../images/khalislogo150.png")
            }
          />
        </TouchableHighlight>
        <Text style={state.darkMode && styles.nightMode}>
          <Text>
            {"\n"}We welcome your comments, suggestions, and corrections!
            {"\n"}
            {"\n"}
            For information, suggestions, or help, visit us at{"\n"}
          </Text>
          <Text>
            <Text
              style={{ color: "#009bff" }}
              onPress={() => Linking.openURL("https://khalisfoundation.org")}
            >
              https://www.KhalisFoundation.org
            </Text>
            <Text>!</Text>
          </Text>
        </Text>
        <Text style={state.darkMode && styles.nightMode}>
          {"\n"}
          {"\n"}
          Akhar Jod utilizes{" "}
          <Text
            style={{ color: "#009bff" }}
            onPress={() => Linking.openURL("https://www.discoversikhism.com/sikh.html")}
          >
            DiscoverSikhism
          </Text>{", "}
          <Text
            style={{ color: "#009bff" }}
            onPress={() => Linking.openURL("https://1000mostcommonwords.com/1000-most-common-punjabi-words/")}
          >
            1000MostCommonWords
          </Text>{", "}
          <Text
            style={{ color: "#009bff" }}
            onPress={() => Linking.openURL("https://www.chardikalaa.com/?page_id=61")}
          >
            Chardikalaa
          </Text>{", "}
          <Text
            style={{ color: "#009bff" }}
            onPress={() => Linking.openURL("https://www.sikhiwiki.org/index.php/Gurmukhi_to_English")}
          >
            SikhiWiki
          </Text>{" "}
          - to create Gurmukhi Wordlink, an interactive game, for spreading the knowledge of our Mother Tongue, Punjabi. {"\n"}
        </Text>
        <Text style={state.darkMode && styles.nightMode}>
          {"\n"}Bhul Chuk Maaf!{"\n"}
        </Text>
        <Text
          style={[styles.small, state.darkMode && styles.nightMode]}
        />

        <View style={styles.singleLine}>
          <View style={styles.leftContainer}>
            <Text
              style={[styles.small, state.darkMode && styles.nightMode]}
            >
              &copy; {new Date().getFullYear()} Khalis Foundation
            </Text>
          </View>
          <Text
            style={[styles.small, state.darkMode && styles.nightMode]}
          >
            Chardikala{"\n"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default About;