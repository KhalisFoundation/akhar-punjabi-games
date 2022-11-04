/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Linking,
  ScrollView,
  Platform,
  Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import dimensions from '../../util/dimensions';
import {
  setDarkMode, setBGM, setShowPopUp, setShowRomanised, setShowNumOfLetters, setIncludeMatra, reset
} from '../../redux/actions';

// TODO - Move all colors to separate file and import as variables.
import SwitchBar from './settingBarSwitch';
import theColors from '../../util/colors';
import * as Analytics from 'expo-firebase-analytics';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const screenWidth = Dimensions.get('window').width;
  const colors = theColors.false;
  const platform = Platform.OS;
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
      fontSize: 18,
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
  });

  async function reset_game() {
    await Analytics.logEvent('setting_used', {setting: 'reset'});
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={"orange"}
        barStyle={'dark-content'}
      />
      <View style={{width: '100%', height: dimensions.size['24'], backgroundColor:"orange", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation:5}}>
        <IonIcons
            name="chevron-back"
            color={"black"}
            size={35}
            style={{position: 'absolute', left: 10}}
            onPress={() => { navigation.goBack(); }}
          />
          <Text style={{
            color: ('black'),
            fontSize: (screenWidth<370 ? 16 : 20),
            fontFamily: 'Muli',
            margin:0,
          }}>Settings</Text>
      </View>

      {/* <SettingsBar theImage={} title={} data={}/> */}
      <ScrollView style={styles.scroll}>
        <View
          style={{
            width: '100%', height: 40, marginLeft: 10, marginTop: 10, marginBottom: -10
          }}
        >
          <Text
            style={[
              styles.headerStyle
            ]}
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
          theAction={setShowPopUp} // setShowPopUp toggles the showing of pop up on level completion.
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
            reset_game();
            dispatch(reset()); 
          }}
          bottomDivider
        >
          <MaskedView
            style={{ width: 35, height: 35 }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IonIcons name="reload" size={35} color={'#464646'} style={styles.shadow} />
              </View>
          )}
          >
          <LinearGradient
            colors={['#274CCC', '#274C77']}
            style={{ flex: 1 }}
          />
          </MaskedView>
          <ListItem.Content style={{ alignSelf: 'center' }}>
            <ListItem.Title><Text>Reset</Text></ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <View
          style={{
            width: '100%', height: 40, marginLeft: 10, marginTop: 10, marginBottom: -10
          }}
        >
          <Text
            style={[
              styles.headerStyle
            ]}
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
            style={{ width: 35, height: 35 }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontAwesome5Icons name="donate" size={35} color={'#464646'} style={styles.shadow} />
              </View>
          )}
          >
          <LinearGradient
            colors={['#274CCC', '#274C77']}
            style={{ flex: 1 }}
          />
          </MaskedView>
          <ListItem.Content style={{ alignSelf: 'center' }}>
            <ListItem.Title><Text>Donate</Text></ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={'black'} />
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
            style={{ width: 35, height: 35 }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontAwesomeIcons name="question-circle" size={35} color={'#464646'} style={styles.shadow} />
              </View>
          )}
          >
            <LinearGradient
              colors={['#274CCC', '#274C77']}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <ListItem.Content style={{ alignSelf: 'center' }}>
            <ListItem.Title><Text>About</Text></ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={'black'} />
        </ListItem>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Settings;
