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
import { useFonts } from 'expo-font';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";

function About({navigation}) {
  const state = useSelector((theState) => theState.theGameReducer);
  let [fontsLoaded] = useFonts({
    'Arial': require('../../assets/fonts/Arial.ttf'),
    'GurbaniHeavy': require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    'Bookish': require('../../assets/fonts/Bookish.ttf'),
    'Mochy': require('../../assets/fonts/Mochy.ttf'),
    'Prabhki': require('../../assets/fonts/Prabhki.ttf'),
  });
  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      padding: 8,
      backgroundColor: "#fff",
      height:'100%'
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
    },
    small: {
      fontSize: 11
    }
  });
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

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
        contentContainerStyle={{
          flexDirection:'column',
          justifyContent:'space-between',}}
      >
        <View>
        <MaskedView
            style={{height: 50, width:"100%"}}
            maskElement={
              <View
                style={{
                  backgroundColor: 'transparent',
                }}>
                <Text style={[styles.title, state.darkMode && styles.nightMode, {fontFamily:'Bookish'}]} > ਅਖਰ ਜੋੜ</Text>
              </View>
            }>
            <LinearGradient
              colors={state.darkMode?["#ff8008", "#ffc837"]: ["#FF0076", "#590FB7"]}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <MaskedView
            style={{height: 50, width:"100%", marginTop:0}}
            maskElement={
              <View
                style={{
                  backgroundColor: 'transparent',
                }}>
                <Text style={{fontFamily:'Mochy', margin:10}}>(Akhar Jor)</Text>
              </View>
            }>
            <LinearGradient
              colors={state.darkMode? ["#FF0076", "#590FB7"]: ["#ff8008", "#ffc837"]}
              style={{ flex: 1 }}
            />
          </MaskedView>
          </View>
          <Image style={{height:250, alignSelf:'center'}} source={require('../../images/logo_squared.png')} resizeMode="contain"/>
        <Text style={[state.darkMode && styles.nightMode, {fontSize:16, fontFamily:'Arial'}]}>
          {"\n"}
          <Text style={{fontFamily:'Mochy'}}>Akhar Jor - Punjabi Wordlink</Text> utilizes{" \n\n \u2022"}
          <Text
            style={{ color: "#009bff", }}
            onPress={() => Linking.openURL("https://www.discoversikhism.com/sikh.html")}
          >
            DiscoverSikhism
          </Text>{", \n \u2022"}
          <Text
            style={{ color: "#009bff" }}
            onPress={() => Linking.openURL("https://1000mostcommonwords.com/1000-most-common-punjabi-words/")}
          >
            1000MostCommonWords
          </Text>{", \n \u2022"}
          <Text
            style={{ color: "#009bff" }}
            onPress={() => Linking.openURL("https://www.chardikalaa.com/?page_id=61")}
          >
            Chardikalaa
          </Text>{", \n \u2022"}
          <Text
            style={{ color: "#009bff" }}
            onPress={() => Linking.openURL("https://www.sikhiwiki.org/index.php/Gurmukhi_to_English")}
          >
            SikhiWiki
          </Text>{" \n"}
          to create Punjabi Wordlink, an interactive game, for spreading the knowledge of our Mother Tongue, Punjabi. {"\n"}
        </Text>
        <Text style={[state.darkMode && styles.nightMode, {fontSize:16, fontFamily:'Arial'}]}>
            {"\n"}We welcome your comments, suggestions, and corrections!
            For information, suggestions, or help, visit us at{"  "}
          <Text
              style={{ color: "#009bff", fontFamily:'Mochy' }}
              onPress={() => Linking.openURL("https://khalisfoundation.org")}
            >
              KhalisFoundation.org
            </Text>
            {"\n"}
        </Text>
        <View>
        <Text style={state.darkMode && styles.nightMode, {fontFamily:'Arial', alignSelf:'flex-end'}}>
          {"\n"}Bhul Chuk Maaf!{"\n"}
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
            style={{ width: 125 }}
            resizeMode="contain"
          />
        </TouchableHighlight>

        <View style={styles.singleLine}>
          <View style={styles.leftContainer}>
            <Text
              style={[styles.small, state.darkMode && styles.nightMode, {fontFamily:'Arial'}]}
            >
              &copy; {new Date().getFullYear()} Khalis Foundation
            </Text>
          </View>
          <Text
            style={[styles.small, state.darkMode && styles.nightMode, {fontFamily:'Arial'}]}
          >
            Chardikala{"\n"}
          </Text>
        </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default About;