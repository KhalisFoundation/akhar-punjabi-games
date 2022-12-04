/* eslint-disable react/no-array-index-key */
/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import * as Analytics from 'expo-firebase-analytics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setGiveUpLives } from '../../redux/actions';
import {
  defaultMatraValue, matras, withMatra, withoutMatra
} from '../GurmukhiKeyboard/constants';
import { getKeyboardKeyValue, getMatraAkhar } from '../GurmukhiKeyboard/utils';
import dimensions from '../../util/dimensions';

function MoreGiveUps({ route, navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
    Nasa: require('../../assets/fonts/Nasalization.otf'),
  });

  const width = Dimensions.get('window').width;
  // console.log('width: ', width);

  const [textEntry, setTextEntry] = useState('');

  // code for gurmukhi keyboard
  const defaultMatraKeys = Object.keys(defaultMatraValue);
  const isWithMatras = true;
  const keys = isWithMatras ? withMatra : withoutMatra;
  const keyboardGrid = [keys];

  const handleClick = (keyValue) => {
    const lastChar = textEntry.slice(-1);

    switch (keyValue) {
      case 'meta':
        if (textEntry !== '') {
          setTextEntry(textEntry.slice(0, -1));
        }
        break;

      case 'space':
        setTextEntry(`${textEntry} `);
        break;

      default:
        // checks if matra could be applied to last character in search textEntry
        if (!matras.includes(lastChar) && keyValue.includes(lastChar) && keyValue !== lastChar) {
          setTextEntry(`${textEntry.slice(0, -1)}${keyValue}`);
        } else {
          setTextEntry(textEntry + keyValue);
        }
        break;
    }
  };

  const prevScreen = route.params.prevScreen === 0 ? 'AkharJor' : 'play';
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: '#D1FBFF',
      paddingTop: Platform.OS === 'android' ? StatusBar.height : 0,
      height: '100%',
      width: '100%',
    },
    icon: {
      position: 'absolute',
      left: 16,
    },
    scrollview: {
      flex: 1,
      flexDirection: 'column',
      padding: 8,
      height: '100%',
      width: '100%'
    },
    scrollContent: {
      flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'
    },
    keyboardRow: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignSelf: 'center',
      padding: 7
    },
    key: {
      width: width * 0.09,
      height: width * 0.09,
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
      marginVertical: 0,
      padding: 2,
      // borderColor: state.darkMode ? 'orange' :'#000',
      // borderWidth: .5,
      borderRadius: 75,
      backgroundColor: '#274C7C',
      elevation: 5,
    },
    instructionsText: {
      fontFamily: 'Muli',
      backgroundColor: 'white',
      color: '#000',
      borderRadius: 5,
      // borderColor: 'black',
      // borderWidth: 1,
      fontSize: width * 0.04,
      padding: 5,
      textAlign: 'center',
      elevation: 5,
    },
    DHANcover: {
      margin: 5,
      width: '99%',
      height: width * 0.15,
      elevation: 5,
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRadius: 20,
    },
    DHAN: {
      textAlign: 'center',
      padding: 5,
      fontSize: width * 0.075,
      textShadowRadius: 10,
      fontFamily: 'Prabhki',
      color: 'darkblue'
    },
    submitButton: {
      alignSelf: 'center',
      alignItems: 'center',
      width: width * 0.3,
      borderRadius: 15,
      elevation: 5,
      backgroundColor: '#FF7E00',
    },
    submit: {
      fontFamily: 'Nasa',
      fontSize: width * 0.04,
      alignSelf: 'center',
      padding: 5,
      margin: 5,
      textShadowRadius: 4,
      color: '#000',
    },
    upBox: {
      backgroundColor: '#072227',
      flexDirection: 'row',
      height: width * 0.1,
      width: width * 0.2,
      alignItems: 'center',
      borderRadius: 30,
      margin: 10,
      elevation: 5,
      justifyContent: 'space-between',
      paddingHorizontal: 10
    },
    upText: {
      fontSize: width * 0.035,
      fontWeight: 'bold',
      color: '#D1FBFF'
    },
    header: {
      width: '100%', height: width * 0.175, backgroundColor: '#274C7C', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 5
    },
    headerText: {
      color: '#D1FBFF',
      fontSize: width * 0.05,
      fontFamily: 'Muli',
      margin: 0,
    },
    info: { width: '100%', alignItems: 'center' },
    fullWidth: { width: '100%' },
    textLayout: {
      margin: 5,
      width: '99%',
      height: width*0.1,
      elevation: 5,
      borderRadius: 20,
      backgroundColor: '#274C7C',
      shadowColor: '#000',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    text: {
      textAlign: 'center',
      textShadowRadius: 10,
      fontSize: width * 0.06,
      width: width*0.85,
      height: width * 0.1,
      fontFamily: 'Prabhki',
      color: '#FF7E00',
      alignItems: 'center',
    },
    backspace: { color: 'white', fontSize:width * 0.05 },
    keyText: { color: 'white', fontFamily: 'Bookish', fontSize: width * 0.05 }
  });

  const wordsToType = [
    'vwihgurU',
    'DMn gurU nwnk dyv swihb jI',
    'DMn gurU AMgd dyv swihb jI',
    'DMn gurU Amrdws swihb jI',
    'DMn gurU rwmdws swihb jI',
    'DMn gurU Arjn dyv swihb jI',
    'DMn gurU hrgoibMd swihb jI',
    'DMn gurU hrrwie swihb jI',
    'DMn gurU hrikRSn swihb jI',
    'DMn gurU qyg bhwdr swihb jI',
    'DMn gurU goibMd isMG swihb jI',
    'DMn SRI gurU gRMQ swihb jI',
    'DMn gurU DMn gurU ipAwry',
  ];
  const getRandomWord = () => {
    return wordsToType[Math.floor(Math.random() * wordsToType.length)];
  };
  const [word, setWord] = useState(getRandomWord());

  async function usedGetLives(currentLives) {
    await Analytics.logEvent('used_get_lives', { lives_count: currentLives });
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#274C7C"
        barStyle="light-content"
      />
      <View style={styles.header}>
        <IonIcons
          name="chevron-back"
          color="#D1FBFF"
          size={width * 0.07}
          style={styles.icon}
          onPress={() => { navigation.navigate(prevScreen); }}
        />
        <Text style={styles.headerText}>
          Get More Credits
        </Text>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        style={styles.scrollview}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.info}>
          <View
            style={styles.upBox}
          >
            <IconM
              name="lightbulb-on"
              size={width * 0.06}
              color="orange"
            />
            <Text style={styles.upText}>{state.giveUpsLeft}</Text>
          </View>
          <Text style={styles.instructionsText}>
            Try to type the following to get more Credits.
          </Text>
        </View>
        <View style={styles.DHANcover}>
          <Text style={{ ...styles.DHAN }}>{word}</Text>
        </View>
        <View style={styles.fullWidth}>
          <View style={styles.textLayout}>
            <Text
              style={styles.text}
            >
              {textEntry}
            </Text>
            { textEntry === '' ? null
              : (
                <Icon
                  name="backspace"
                  color="#D1FBFF"
                  size={width*0.05}
                  onPress={() => { handleClick('meta'); }}
                />
              )}
          </View>
          {keyboardGrid.map((rows, index) => {
            return (
              <View key={index}>
                {rows.map((chars, rowIndex) => (
                  <View style={styles.keyboardRow} key={rowIndex}>
                    {chars.map((keyboardKey, i) => {
                      /*
                      if (keyboardKey === 'meta') {
                        return (
                          <TouchableOpacity
                            style={styles.key}
                            key={keyboardKey}
                            onPress={() => handleClick('meta')}>
                            <Text style={{color: 'white',, fontSize:(width<370 ? 14 : 20)}}>
                              {"\u2190"}
                            </Text>
                          </TouchableOpacity>
                        );
                      } */

                      if (keyboardKey === 'space') {
                        return (
                          <TouchableOpacity style={styles.key} key={keyboardKey} onPress={() => handleClick('space')}>
                            <Text style={styles.backspace}>{'\u2423'}</Text>
                          </TouchableOpacity>
                        );
                      }

                      const isCurrentKeyDefaultMatraKey = defaultMatraKeys.includes(keyboardKey);

                      return (
                        <TouchableOpacity
                          style={styles.key}
                          key={i}
                          onPress={() => handleClick(getKeyboardKeyValue(keyboardKey, textEntry))}
                        >
                          <Text style={styles.keyText}>
                            {isCurrentKeyDefaultMatraKey
                              ? getMatraAkhar(keyboardKey, textEntry)
                              : keyboardKey}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ))}
              </View>
            );
          })}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              // console.log(textEntry);
              // console.log(word);
              if (textEntry === word) {
                // console.log('Good job');
                dispatch(setGiveUpLives('+'));
                usedGetLives(state.giveUpsLeft);
                setWord(getRandomWord());
                setTextEntry('');
              }
            }}
          >
            <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MoreGiveUps;
