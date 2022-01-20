/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Linking,
  ScrollView,
  Platform
} from 'react-native';
import { useSelector } from 'react-redux';
import { ListItem, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {
  setTypeOfWords, setDarkMode, setShowPopUp, setShowRomanised
} from '../../redux/actions';

// TODO - Move all colors to separate file and import as variables.
import SwitchBar from './settingBarSwitch';
import SettingsBar from './settingBar';
import theColors from '../../util/colors';

function Settings({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
  });
  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      // justifyContent: "center",
      backgroundColor: state.darkMode ? '#333' : colors.settings.container,
      width: '100%',
      height: '100%',
      marginTop: '3.5%',
    },
    headerStyle: {
      color: 'black',
      margin: 10,
      padding: 5,
      paddingBottom: 10,
      fontWeight: 'bold',
      fontSize: 15
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
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
      />
      <Header
        backgroundColor="orange"
        containerStyle={[
          Platform.OS === 'android' && { height: 56, paddingTop: 0 }
        ]}
        leftComponent={(
          <Icon
            name="arrow-back"
            color="black"
            size={30}
            onPress={() => { navigation.navigate('Home'); }}
          />
          )}
        centerComponent={{
          text: 'Settings',
          style: {
            color: 'black',
            fontSize: 18,
            fontFamily: 'Arial'
          }
        }}
      />

      {/* <SettingsBar theImage={} title={} data={}/> */}
      <ScrollView style={styles.scroll}>
        <MaskedView
          style={{ width: '100%', height: 50 }}
          maskElement={(
            <View
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <Text
                style={[
                  styles.headerStyle,
                  state.darkMode && { color: '#fff' }
                ]}
              >
                App Options
              </Text>
            </View>
          )}
        >
          <LinearGradient
            colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
            style={{ flex: 1 }}
          />
        </MaskedView>
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
        <SwitchBar
          theSetting="Romanised words"
          theList={[true, false]}
          imageSource="ura"
          theAction={setShowRomanised} // setTypeOfWords take 1 param, both,gurbani or punjabi,
          theCurrentOptionIndex={[true, false].indexOf(state.romanised)}
        />
        <MaskedView
          style={{ width: '100%', height: 50 }}
          maskElement={(
            <View
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <Text
                style={[
                  styles.headerStyle,
                  state.darkMode && { color: '#fff' }
                ]}
              >
                Other Options
              </Text>
            </View>
          )}
        >
          <LinearGradient
            colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
            style={{ flex: 1 }}
          />
        </MaskedView>
        <ListItem
          containerStyle={[
            styles.titleText,
            state.darkMode && { backgroundColor: '#464646' },
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
                <FontAwesome5Icons name="donate" size={30} color={state.darkMode ? '#fff' : '#464646'} style={styles.shadow} />
              </View>
          )}
          >
            <LinearGradient
              colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <ListItem.Content>
            <ListItem.Title style={state.darkMode && { color: '#fff' }}><Text>Donate</Text></ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={state.darkMode ? 'white' : 'black'} />
        </ListItem>
        <ListItem
          containerStyle={[
            styles.titleText,
            state.darkMode && { backgroundColor: '#464646' },
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
                <FontAwesomeIcons name="question-circle" size={30} color={state.darkMode ? '#fff' : '#464646'} style={styles.shadow} />
              </View>
          )}
          >
            <LinearGradient
              colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <ListItem.Content>
            <ListItem.Title style={state.darkMode && { color: '#fff' }}><Text>About</Text></ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={state.darkMode ? 'white' : 'black'} />
        </ListItem>
      </ScrollView>
    </View>
  );
}

export default Settings;
