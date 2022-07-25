/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  Dimensions,
  Animated,
  Platform,
  ScrollView
} from 'react-native';
import { useState } from 'react';
import { Header } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { getKeyboardKeyValue, getMatraAkhar } from '../GurmukhiKeyboard/utils';
import { defaultMatraValue, matras, withMatra, withoutMatra } from '../GurmukhiKeyboard/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import GLOBAL from '../../util/globals';
import { setGiveUpLives, setLivesWord } from '../../redux/actions';
import theColors from '../../util/colors';
import { useEffect } from 'react';
import * as Analytics from 'expo-firebase-analytics';

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

  const screenWidth = Dimensions.get('window').width;
  //console.log('screenWidth: ', screenWidth);
  const screenHeight = Dimensions.get('window').height;

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
  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.getMoreGiveUps.container,
      height: '100%',
      width: '100%',
      marginTop: (Platform.OS == 'android') ? '3.5%' : 0,
    },
    scrollview: {
      flex: 1,
      flexDirection: 'column',
      padding: 8,
      height: '100%', width: '100%'
    },
    keyboardRow: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 7
    },
    key: {
      minWidth: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 2,
      padding: 2,
      borderColor: '#000',
      borderWidth: .5,
      borderRadius: 5,
      backgroundColor: "#072227",
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
    },
    keyText: {
      color:'white',
    },
    instructionsText: {
      fontFamily: 'Muli',
      backgroundColor: 'white',
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 1,
      marginHorizontal: 5,
      fontSize: (screenWidth<370 ? 13 : 18),
      padding: 5,
      textAlign: 'center',
      marginVertical: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    infoText: {
      fontFamily: 'Muli',
      marginHorizontal: 5,
      fontSize: (screenWidth<370 ? 10 : 15),
      color: state.darkMode ? '#fff' : '#000',
      padding: 5,
      textAlign: 'center',
      marginVertical: 5,
    },
    DHANcover: {
      margin: 5,
      width: '100%',
      elevation: 5,
      justifyContent: 'center',
      backgroundColor: state.darkMode ? '#000' : '#fff',
      borderRadius: 20,
    },
    DHAN: {
      textAlign: 'center',
      padding: 5,
      fontSize: (screenWidth<370 ? 20 : 30),
      textShadowRadius: 10,
      fontFamily: 'Bookish',
      color: "#ff8008"
    },
    inputBox: {
      padding: 10,
      width: '100%',
    },
    textInput: {
      marginTop: 10,
      marginBottom: 5,
      marginHorizontal: 10,
      fontSize: 15,
      color: "#ffc837",
      backgroundColor: "#000",
      borderRadius: 20,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    submitButton: {
      alignItems: 'center',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      marginBottom: 15,
    },
    submit: {
      fontFamily: 'Nasa',
      fontSize: (screenWidth<370 ? 10 : 16),
      alignSelf: 'center',
      padding: 10,
      color: state.darkMode ? 'black' : 'white',
    },
    upBox: {
      backgroundColor: '#072227',
      flexDirection: 'row',
      height: 40,
      width: 100,
      alignItems: 'center',
      borderRadius: 30,
      margin: 10,
      elevation: 5,
      justifyContent: 'space-between',
      paddingHorizontal: 10
    },
    upText: {
      color: 'white',
      fontSize: (screenWidth<370 ? 12 : 15),
      fontWeight: 'bold'
    }
  });
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

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
    'DMn gurU gRMQ swihb jI',
    'DMn gurU DMn gurU ipAwry',
  ];
  const getRandomWord = () => {
    return wordsToType[Math.floor(Math.random() * wordsToType.length)];
  };
  const [word, setWord] = useState(getRandomWord());

  async function used_get_lives(current_lives) {
    await Analytics.logEvent('used_get_lives', {has_lives: current_lives});
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <Header
        backgroundColor={
            GLOBAL.COLOR.TOOLBAR_COLOR_ALT
          }
        leftComponent={(
          <Icon
            name="arrow-back"
            color="black"
            size={30}
            onPress={() => { navigation.navigate(prevScreen); }}
          />
          )}
        centerComponent={{
          text: 'Get More Lives',
          style: {
            color: 'black',
            fontSize: (screenWidth<370 ? 16 : 20),
            fontFamily: 'Muli',
            margin:0,
          }
        }}
      />
      <ScrollView
        scrollEventThrottle={16}
        style={[styles.scrollview, state.darkMode && { backgroundColor: black }]}
        contentContainerStyle={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
      <View
        style={styles.upBox}
      >
        <IconM
          name="lightbulb-on"
          size={25}
          color="orange"
        />
        <Text style={[styles.upText, { color: 'cyan' }]}>{state.giveUpsLeft}</Text>
      </View>
      <Text style={styles.instructionsText}>
        Try to type the following to get more Lives.
      </Text>
      <Text style={styles.infoText}>
        {'{'}
        You will have to figure out which english letters correspond to the
        respective Gurmukhi characters
        {'}'}
      </Text>
      <View style={styles.DHANcover}>
        <Text style={{...styles.DHAN, color: '#0600bd'}}>{word}</Text>
      </View>
      <View style={{ ...styles.DHANcover, backgroundColor: state.darkMode ? '#fff' : '#000', shadowColor: '#000' }}>
        <Text
          style={{ ...styles.DHAN, fontFamily: 'Bookish' }}>
          {textEntry}
        </Text>
      </View>
      {keyboardGrid.map((rows, index) => {
        return (
          <View key={index} id={`gurmukhi-keyboard-page-${index + 1}`}>
            {rows.map((chars, rowIndex) => (
              <View style={styles.keyboardRow} key={`${index}-${rowIndex}`}>
                  {chars.map((keyboardKey, i) => {
                    if (keyboardKey === 'meta') {
                      return (
                        <TouchableOpacity style={styles.key} key={keyboardKey} onPress={() => handleClick('meta')}>
                          <Text style={{...styles.keyText,fontSize:(screenWidth<370 ? 18 : 25)}}>{"\u2190"}</Text>
                        </TouchableOpacity>
                      );
                    }

                    if (keyboardKey === 'space') {
                      return (
                        <TouchableOpacity style={styles.key} key={keyboardKey} onPress={() => handleClick('space')}>
                          <Text style={{...styles.keyText,fontSize:(screenWidth<370 ? 18 : 25)}}>{"\u2423"}</Text>
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
                        <Text style={{...styles.keyText, fontFamily: 'Bookish', fontSize: (screenWidth<370 ? 18 : 25)}}>
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
          console.log(textEntry);
          console.log(word);
          if (textEntry === word) {
            console.log('Good job');
            dispatch(setGiveUpLives('+'));
            used_get_lives(state.giveUpsLeft);
            setWord(getRandomWord());
            setTextEntry('');
          }
        }}
      >
        <AnimatedLinearGradient colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']} style={styles.submitButton}>
          <Text style={{ ...styles.submit, fontFamily: 'Nasa' }}>Submit</Text>
        </AnimatedLinearGradient>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default MoreGiveUps;
