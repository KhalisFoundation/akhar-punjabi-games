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
import {
  setDarkMode, setBGM, setShowPopUp, setShowRomanised, setShowNumOfLetters, setIncludeMatra, reset
} from '../../redux/actions';

// TODO - Move all colors to separate file and import as variables.
import SwitchBar from './settingBarSwitch';
import theColors from '../../util/colors';

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
  const colors = theColors[state.darkMode];
  const platform = Platform.OS;
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      // justifyContent: "center",
      backgroundColor: state.darkMode ? '#333' : colors.settings.container,
      width: '100%',
      height: '100%',
    },
    headerStyle: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 15,
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
          Platform.OS === 'android' && { height: 75, paddingTop: 0 }
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
            fontFamily: 'Muli'
          }
        }}
      />

      {/* <SettingsBar theImage={} title={} data={}/> */}
      <ScrollView style={styles.scroll}>
        <MaskedView
          style={{
            width: '100%', height: 40, marginLeft: 10, marginTop: 10, marginBottom: -10
          }}
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
        <SwitchBar
          theSetting="Dark Mode"
          theList={[true, false]}
          imageSource="khanda"
          theAction={setDarkMode} // setDarkMode toggles the darkMode
          theCurrentOptionIndex={[true, false].indexOf(state.darkMode)}
        />
        <SwitchBar
          theSetting="Show Pop Up after each word"
          theList={[true, false]}
          imageSource="ikOngkar"
          theAction={setShowPopUp} // setShowPopUp toggles the showing of pop up on level completion.
          theCurrentOptionIndex={[true, false].indexOf(state.showPopUp)}
        />
        <SwitchBar
          theSetting="Romanised words"
          theList={[true, false]}
          imageSource="ura"
          theAction={setShowRomanised} // setShowRomanised toggles the showing of romanised words.
          theCurrentOptionIndex={[true, false].indexOf(state.romanised)}
        />
        <SwitchBar
          theSetting="Indicate Number of Letters"
          theList={[true, false]}
          imageSource="letters"
          theAction={setShowNumOfLetters} // toggles the showing of number of letters in the word.
          theCurrentOptionIndex={[true, false].indexOf(state.showNumOfLetters)}
        />
        <SwitchBar
          theSetting="Include Matras"
          theList={[true, false]}
          imageSource="matra"
          theAction={setIncludeMatra} // toggles the showing of matras in the word.
          theCurrentOptionIndex={[true, false].indexOf(state.includeMatra)}
          displayParam={state.showNumOfLetters}
        />
        <ListItem
          containerStyle={[
            styles.titleText,
            state.darkMode && { backgroundColor: '#464646' },
            { alignItems: 'flex-start' }
          ]}
          onPress={() => { dispatch(reset()); }}
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
                <IonIcons name="reload" size={35} color={state.darkMode ? '#fff' : '#464646'} style={styles.shadow} />
              </View>
          )}
          >
            <LinearGradient
              colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <ListItem.Content style={{ alignSelf: 'center' }}>
            <ListItem.Title style={state.darkMode && { color: '#fff' }}><Text>Reset</Text></ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <MaskedView
          style={{
            width: '100%', height: 40, marginLeft: 10, marginTop: 10, marginBottom: -10
          }}
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
                <FontAwesome5Icons name="donate" size={35} color={state.darkMode ? '#fff' : '#464646'} style={styles.shadow} />
              </View>
          )}
          >
            <LinearGradient
              colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <ListItem.Content style={{ alignSelf: 'center' }}>
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
                <FontAwesomeIcons name="question-circle" size={35} color={state.darkMode ? '#fff' : '#464646'} style={styles.shadow} />
              </View>
          )}
          >
            <LinearGradient
              colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <ListItem.Content style={{ alignSelf: 'center' }}>
            <ListItem.Title style={state.darkMode && { color: '#fff' }}><Text>About</Text></ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={state.darkMode ? 'white' : 'black'} />
        </ListItem>
      </ScrollView>
    </View>
  );
}

export default Settings;
