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
import { setGiveUpLives, setLivesWord } from '../../redux/actions';
import { useEffect } from 'react';
import * as Analytics from 'expo-firebase-analytics';
import dimensions, { height } from '../../util/dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: "#D1FBFF",
      paddingTop: Platform.OS == 'android' ? StatusBar.height : 0,
      height: '100%',
      width: '100%',
    },
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
    icon: {
        position: 'absolute',
        left: 16,
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
      justifyContent: 'space-evenly',
      alignSelf: 'center',
      padding: 7
    },
    key: {
      width: 36,
      height: 36,
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
      marginVertical: 0,
      padding: 2,
      borderColor: '#000',
      borderWidth: .5,
      borderRadius: 75,
      backgroundColor: "#072270",
      elevation: 5,
    },
    keyText: {
      color:'white',
    },
    instructionsText: {
      fontFamily: 'Muli',
      backgroundColor: 'white',
      color: '#000',
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 1,
      fontSize: 16,
      padding: 5,
      textAlign: 'center',
      elevation: 5,
    },
    infoText: {
      fontFamily: 'Muli',
      fontSize: 16,
      color: '#000',
      padding: 5,
      textAlign: 'center',
      margin:5
    },
    DHANcover: {
      margin: 5,
      width: '99%',
      elevation: 5,
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRadius: 20,
    },
    DHAN: {
      textAlign: 'center',
      padding: 5,
      fontSize: 30,
      textShadowRadius: 10,
      fontFamily: 'Prabhki',
      color: "#FF7E00"
    },
    submitButton: {
      alignSelf: 'center',
      alignItems: 'center',
      width: dimensions.size['50'],
      borderRadius: 15,
      marginBottom: 15,
      elevation: 5,
      backgroundColor: "#FF7E00",
      borderColor: "#911",
      borderWidth: .5,
    },
    submit: {
      fontFamily: 'Nasa',
      fontSize: 16,
      alignSelf: 'center',
      padding: 5,
      margin: 5,
      textShadowRadius: 4,
      color: '#000',
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
      fontSize: 15,
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
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'#274C7C'}
        barStyle={'light-content'}
      />
      <View style={{width: '100%', height: dimensions.size['24'], backgroundColor:"#274C7C", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation:5}}>
        <Icon
            name="arrow-back"
            color="#D1FBFF"
            size={30}
            style={styles.icon}
            onPress={() => { navigation.navigate(prevScreen); }}
          />
          <Text style={{
            color: '#D1FBFF',
            fontSize: (screenWidth<370 ? 16 : 20),
            fontFamily: 'Muli',
            margin:0,
          }}>Get More Lives</Text>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        style={styles.scrollview}
        contentContainerStyle={{ flexGrow: 1 ,flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}
      >
      <View style={{width: '100%', alignItems: 'center'}}>
      <View
        style={styles.upBox}
      >
        <IconM
          name="lightbulb-on"
          size={25}
          color="orange"
        />
        <Text style={[styles.upText, { color: '#D1FBFF' }]}>{state.giveUpsLeft}</Text>
      </View>
      <Text style={styles.instructionsText}>
        Try to type the following to get more Lives.
      </Text>
      </View>
      <View style={styles.DHANcover}>
        <Text style={{...styles.DHAN, color: '#0600bd'}}>{word}</Text>
      </View>
      <View style={{width: '100%'}}>
      <View style={{ ...styles.DHANcover, backgroundColor: "#072270", shadowColor: '#000',flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{ ...styles.DHAN, fontSize: 26, width:'80%', fontFamily: 'Bookish' }}>
          {textEntry}
        </Text>
        { textEntry == "" ? null :
          <Icon  
          name="backspace"
          color={'#D1FBFF'}
          size={dimensions.size['8']}
          style={{position: 'absolute', right: 10}}
          onPress={() => { handleClick('meta') }}/>}
      </View>
      {keyboardGrid.map((rows, index) => {
        return (
          <View key={index} >
            {rows.map((chars, rowIndex) => (
              <View style={styles.keyboardRow} key={`${index}-${rowIndex}`}>
                  {chars.map((keyboardKey, i) => {
                    // if (keyboardKey === 'meta') {
                    //   return (
                    //     <TouchableOpacity style={styles.key} key={keyboardKey} onPress={() => handleClick('meta')}>
                    //       <Text style={{...styles.keyText, fontSize:(screenWidth<370 ? 14 : 20)}}>{"\u2190"}</Text>
                    //     </TouchableOpacity>
                    //   );
                    // }

                    if (keyboardKey === 'space') {
                      return (
                        <TouchableOpacity style={styles.key} key={keyboardKey} onPress={() => handleClick('space')}>
                          <Text style={{...styles.keyText, fontSize:(screenWidth<370 ? 14 : 20)}}>{"\u2423"}</Text>
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
                        <Text style={{...styles.keyText, fontFamily: 'Bookish', fontSize: (screenWidth<370 ? 15 : 22)}}>
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
        <Text style={{ ...styles.submit, fontFamily: 'Nasa' }}>Submit</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MoreGiveUps;
