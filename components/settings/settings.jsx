/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';

import SettingsBar from './settingBar';
import SwitchBar from './settingBarSwitch';
import { setTypeOfWords, setDarkMode, setShowPopUp } from '../../redux/actions';

import theColors from '../../util/colors';

function Settings({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);

  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: "center",
      backgroundColor: colors.settings.container,
      width: '100%',
      height: '100%',
      paddingTop: '10%',
    },
    header: {
      flexDirection: 'row',
    },
    backButton: {
      flex: 1,
    },
    backArrow: {
      width: 50,
      height: 50,
    },
    title: {
      fontSize: 32,
      flex: 2,
      right: 20,
    },
    scroll: {
      width: '100%',
      height: '100%',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          title="Home"
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Image
            source={require('../../images/left_arrow.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.title}>SETTINGS</Text>
      </View>
      {/* <SettingsBar theImage={} title={} data={}/> */}
      <ScrollView style={styles.scroll}>
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
          theList={['Off', 'On']}
          imageSource="khanda"
          theAction={setDarkMode} // setTypeOfWords take 1 param, both,gurbani or punjabi,
          theCurrentOptionIndex={['Off', 'On'].indexOf(state.darkMode)}
        />
        {/* <SettingsBar
          theSetting="Dark Mode"
          theList={["Off", "On"]}
          imageSource="khanda"
          theAction={setDarkMode} // setTypeOfWords take 1 param, both,gurbani or punjabi,
          theCurrentOptionIndex={["Off", "On"].indexOf(state.darkMode)}
        /> */}
        <SettingsBar
          theSetting="Show Pop Up after each word"
          theList={[true, false]}
          imageSource="ikOngkar"
          theAction={setShowPopUp} // setTypeOfWords take 1 param, both,gurbani or punjabi,
          theCurrentOptionIndex={[true, false].indexOf(state.showPopUp)}
        />
      </ScrollView>
    </View>
  );
}

// TODO - Move all colors to separate file and import as variables.

export default Settings;
