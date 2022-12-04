/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Linking,
  ScrollView,
  Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem } from 'react-native-elements';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as Analytics from 'expo-firebase-analytics';
import { SafeAreaView } from 'react-native-safe-area-context';
import dimensions from '../../util/dimensions';
import {
  setShowPopUp, setShowRomanised, reset
} from '../../redux/actions';

// TODO - Move all colors to separate file and import as variables.
import SwitchBar from './settingBarSwitch';
// import theColors from '../../util/colors';

function Settings({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
  });
  const {width} = dimensions;
  // const colors = theColors.false;
  // const platform = Platform.OS;
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      // justifyContent: "center",
      backgroundColor: '#eeccaa',
      width: '100%',
      height: '100%',
    },
    headerStyle: {
      color: '#274CCC',
      fontFamily: 'Muli',
      fontWeight: '600',
      fontSize: width * 0.0425,
    },
    shadow: {
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
    scroll: {
      width: '100%',
      height: '100%',
    },
    listText: {
      fontSize: width * 0.04
    }
  });

  async function resetGame() {
    await Analytics.logEvent('setting_used', { setting: 'reset' });
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="orange"
        barStyle="dark-content"
      />
      <View style={{
        width: '100%', height: width*0.175, backgroundColor: 'orange', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 5
      }}
      >
        <IonIcons
          name="chevron-back"
          color="black"
          size={width * 0.08}
          style={{ position: 'absolute', left: 10 }}
          onPress={() => { navigation.goBack(); }}
        />
        <Text style={{
          color: ('black'),
          fontSize: width * 0.05,
          fontFamily: 'Muli',
          margin: 0,
        }}
        >
          Settings
        </Text>
      </View>

      {/* <SettingsBar theImage={} title={} data={}/> */}
      <ScrollView style={styles.scroll}>
        <View
          style={{
            width: '100%', height: width*0.07, marginLeft: 10, marginTop: 10
          }}
        >
          <Text
            style={styles.headerStyle}
          >
            App Options
          </Text>
        </View>
        {/* <SwitchBar
          title="dark_mode"
          theSetting="Dark Mode"
          theList={[true, false]}
          imageSource="khanda"
          theAction={setDarkMode} // setDarkMode toggles the darkMode
          theCurrentOptionIndex={[true, false].indexOf(state.darkMode)}
        /> */}
        <SwitchBar
          title="show_pop_up"
          theSetting="Show Pop Up after each word"
          theList={[true, false]}
          imageSource="ikOngkar"
          theAction={setShowPopUp}
          // setShowPopUp toggles the showing of pop up on level completion.
          theCurrentOptionIndex={[true, false].indexOf(state.showPopUp)}
        />
        <SwitchBar
          title="show_romanised"
          theSetting="Romanised words"
          theList={[true, false]}
          imageSource="ura"
          theAction={setShowRomanised} // setShowRomanised toggles the showing of romanised words.
          theCurrentOptionIndex={[true, false].indexOf(state.romanised)}
        />
        {/* <SwitchBar
          title="show_num_of_letters"
          theSetting="Indicate Number of Letters"
          theList={[true, false]}
          imageSource="letters"
          theAction={setShowNumOfLetters} // toggles the showing of number of letters in the word.
          theCurrentOptionIndex={[true, false].indexOf(state.showNumOfLetters)}
        />
        <SwitchBar
          title="include_matra"
          theSetting="Include Matras"
          theList={[true, false]}
          imageSource="matra"
          theAction={setIncludeMatra} // toggles the showing of matras in the word.
          theCurrentOptionIndex={[true, false].indexOf(state.includeMatra)}
          displayParam={state.showNumOfLetters}
        /> */}
        <ListItem
          containerStyle={[
            styles.titleText,
            { alignItems: 'flex-start' }
          ]}
          onPress={() => {
            resetGame();
            dispatch(reset());
          }}
          bottomDivider
        >
          <MaskedView
            style={{ width: width * 0.08, height: width * 0.08 }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IonIcons name="reload" size={width * 0.08} color="#464646" style={styles.shadow} />
              </View>
          )}
          >
            <LinearGradient
              colors={['#274CCC', '#274C77']}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <ListItem.Content style={{ alignSelf: 'center' }}>
            <ListItem.Title><Text style={styles.listText}>Reset</Text></ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <View
          style={{
            width: '100%', height: width*0.07, marginLeft: 10, marginTop: 10
          }}
        >
          <Text
            style={styles.headerStyle}
          >
            Other Options
          </Text>
        </View>
        <ListItem
          containerStyle={[
            styles.titleText,
            { alignItems: 'flex-start' }
          ]}
          onPress={() => Linking.openURL('https://khalisfoundation.org/donate/')}
          bottomDivider
        >
          <MaskedView
            style={{ width: width * 0.08, height: width * 0.08 }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontAwesome5Icons name="donate" size={width * 0.08} color="#464646" style={styles.shadow} />
              </View>
          )}
          >
            <LinearGradient
              colors={['#274CCC', '#274C77']}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <ListItem.Content style={{ alignSelf: 'center' }}>
            <ListItem.Title><Text style={styles.listText}>Donate</Text></ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="black" size={width * 0.04} />
        </ListItem>
        <ListItem
          containerStyle={[
            styles.titleText,
            { alignItems: 'flex-start' }
          ]}
          onPress={() => { navigation.navigate('about'); }}
          bottomDivider
        >
          <MaskedView
            style={{ width: width * 0.08, height: width * 0.08 }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontAwesomeIcons name="question-circle" size={width * 0.08} color="#464646" style={styles.shadow} />
              </View>
          )}
          >
            <LinearGradient
              colors={['#274CCC', '#274C77']}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <ListItem.Content style={{ alignSelf: 'center' }}>
            <ListItem.Title><Text style={styles.listText}>About</Text></ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="black" size={width * 0.04} />
        </ListItem>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Settings;
