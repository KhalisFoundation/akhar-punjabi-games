/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Linking,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ListItem, Header } from "react-native-elements";
import SettingsBar from './settingBar';
import SwitchBar from './settingBarSwitch';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import { setTypeOfWords, setDarkMode, setShowPopUp } from '../../redux/actions';

import theColors from '../../util/colors';

function Settings({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);

  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      // justifyContent: "center",
      backgroundColor: colors.settings.container,
      width: '100%',
      height: '100%',
      marginTop: '3.5%',
    },
    header: {
      flexDirection: 'row',
      height: '7%',
      borderRadius: 20,
    },
    headerStyle: {
      color: 'black',
      marginTop: 10,
      padding: 5,
      paddingLeft: 10
    },
    backButton: {
      flex: 1,
    },
    backArrow: {
      width: 50,
      height: 50,
    },
    title: {
      fontSize: 30,
      fontFamily: 'Arial',
      flex: 2,
      fontWeight: 'bold',
      color: 'white',
    },
    scroll: {
      width: '100%',
      height: '100%',
    },
  });
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
  return (
    <View style={styles.container}>
      <StatusBar
          backgroundColor={
            'black'
          }
          barStyle={"light-content"}
        />
      <Header
          backgroundColor={
            "orange"
          }
          containerStyle={[
            Platform.OS === "android" && { height: 56, paddingTop: 0 }
          ]}
          leftComponent={
            <Icon
              name="arrow-back"
              color={
                'black'
              }
              size={30}
              onPress={() => {navigation.navigate('Home');}}
            />
          }
          centerComponent={{
            text: "Settings",
            style: {
              color: 'black',
              fontSize: 18
            }
          }}
        />
      
      {/* <SettingsBar theImage={} title={} data={}/> */}
      <ScrollView style={styles.scroll}>
      <Text
          style={[
            styles.headerStyle,
            state.darkMode && { color: "#fff" }
          ]}
        >
          App Options
        </Text>
        <SettingsBar
          theSetting="Type of Words"
          theList={['Both', 'Gurbani', 'Punjabi']} // the 0 index in theList is the default setting
          imageSource="khalislogo150"
          theAction={setTypeOfWords} // setTypeOfWords take 1 param, both,gurbani or punjabi,
          theCurrentOptionIndex={['Both', 'Gurbani', 'Punjabi'].indexOf(
            state.typesOfWords
          )}
        />
        <SwitchBar
          theSetting="Dark Mode"
          theList={[true, false]}
          imageSource="khanda"
          theAction={setDarkMode} // setTypeOfWords take 1 param, both,gurbani or punjabi,
          theCurrentOptionIndex={[true, false].indexOf(state.darkMode)}
        />
        <SwitchBar
          theSetting="Show Pop Up after each word"
          theList={[true, false]}
          imageSource="ikOngkar"
          theAction={setShowPopUp} // setTypeOfWords take 1 param, both,gurbani or punjabi,
          theCurrentOptionIndex={[true, false].indexOf(state.showPopUp)}
        />
        <Text
          style={[
            styles.headerStyle,
            state.darkMode && { color: "#fff" }
          ]}
        >
          Other Options
        </Text>
        <ListItem 
            containerStyle={[
              styles.titleText,
              state.darkMode && { backgroundColor: "#464646" },
              {alignItems: 'flex-start'}
            ]}
            onPress={() => Linking.openURL("https://khalisfoundation.org/donate/")}
          bottomDivider>
          <FontAwesome5Icons name="donate" size={30} color={state.darkMode ? "#fff" : "#464646"}/>
          <ListItem.Content>
            <ListItem.Title style={state.darkMode && { color: "#fff" }}>Donate</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={state.darkMode ? 'white' : 'black'} />
        </ListItem>
        <ListItem 
            containerStyle={[
              styles.titleText,
              state.darkMode && { backgroundColor: "#464646" },
              {alignItems: 'flex-start'}
            ]}
            onPress={() => {navigation.navigate('about');}}
          bottomDivider>
          <FontAwesomeIcons name="question-circle" size={30} color={state.darkMode ? "#fff" : "#464646"}/>
          <ListItem.Content>
            <ListItem.Title style={state.darkMode && { color: "#fff" }}>About</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={state.darkMode ? 'white' : 'black'} />
        </ListItem>
      </ScrollView>
    </View>
  );
}

// TODO - Move all colors to separate file and import as variables.

export default Settings;
