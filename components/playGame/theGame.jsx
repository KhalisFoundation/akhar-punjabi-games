/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import * as Anvaad from 'anvaad-js';
import {
  View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Platform, Animated, TouchableWithoutFeedback
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconH from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from 'react-native-elements';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import IonIcons from 'react-native-vector-icons/Ionicons';
import theColors from '../../util/colors';
import { StatsBox, WordBox, AttemptInput, TheCircle } from '.';
import WordsDoneModal from './modalNextWord';
import {
  openHelpModal
} from '../../redux/actions';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Analytics from 'expo-firebase-analytics';
import Dimensions from '../../util/dimensions';
import Help from './help';

function GameScreen({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const [visited, setVisited] = useState([]);
  const [word, setWord] = useState('');
  // dummy state const [reset, setReset] = useState(false);
  
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
  });
  
  const {height, width} = Dimensions.get('window');

  const points = [];
  const charArray = state.charArray;

  let angle = 0;
  const radius =  width / 3.5;
  const step = (2 * Math.PI) / charArray.length;
  let charShuffled = (state.levelProgress[0].level < 3 || state.levelProgress[0].level > 5) ? charArray : charArray.sort();
  charShuffled.map((char) => {
    const x = Math.round(radius * Math.cos(angle)) + width/2.35;
    const y = Math.round(radius* Math.sin(angle)) + width/3.75;
    //console.log("height: %d, width: %d, x %d, y %d", new_height, new_width, x, y)
    // let theLetter = String.fromCharCode(char);
    angle += step;
    points.push({ x, y, letter:char });
  })

  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center', 
      flexDirection: 'column',
    },
    scroller: {
      width: '100%',
      height: '100%',
      paddingHorizontal: 10,
      flexDirection: 'column',
      justifyContent:'space-between',
    },
    scrollContent: {
      alignItems: 'center', 
      justifyContent: 'space-evenly'
    },
    status: {
      color: state.darkMode ? '#ff6e00' : 'black',
      fontSize: Dimensions.size['10'],
      fontFamily: 'Bookish',
      justifyContent: 'center',
    },
    ball: {
      width: 100,
      height: 100,
      borderRadius: 100,
      backgroundColor: 'blue',
      alignSelf: 'center',
    },
    wordBoxAnswers: {
      // flexDirection: "column",
      width: "100%",
      marginBottom: 5,
      backgroundColor: 'transparent',
      paddingHorizontal: 10,
      justifyContent: 'space-evenly'
    },
    header: {
      height: 65,
      width: '100%',
      margin: 5,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    answerRow: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 20,
    },
    wordBoxText: {
      flex: 2,
      margin: 5,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      width: "100%",
      height: "100%",
    },
    answerText: {
      textAlign: 'center',
      color: state.darkMode ? 'white' : 'black',
      fontSize: 35,
      borderRadius: 25,
      height: 50,
    },
    answerTouchOpacity: {
      justifyContent: 'center',
      paddingTop: 10,
      height: 50,
      width: "100%",
      marginBottom: 10,
    },
    giveUp: {
      marginRight: 5,
      marginTop: 5,
      alignSelf: 'center',
      backgroundColor: colors.theGame.giveUp,
      opacity: 1,
      width: 40,
      height: 40,
      borderColor: state.darkMode ? 'white' : 'black',
      borderWidth: 2,
      borderRadius: 20,
    },
    giveUpTxt: {
      textAlign: 'center',
      alignItems: 'center',
      fontSize: (state.giveUpsLeft === 0 || state.topWord !== '') ? 30 : 35,
      width: '100%',
      height: '100%',
    },
    wordAttemptView: {
      flexDirection: 'row',
      marginTop: 10,
      padding: 5,
      backgroundColor: colors.theGame.clearBox,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    help: {
      padding: Dimensions.size["4"],
      borderRadius: 50,
      marginTop: 15,
    },
    wordAttempt: {
      width: "75%",
      height: "100%",
      opacity: 0.8,
      color: state.darkMode ? 'darkblue' : 'white',
      borderRadius: 100,
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 30,
    },
    clearBox: {
      alignSelf: 'center',
      width: 50,
      height: 50,
    },
    clearBoxText: {
      textAlign: 'center',
      justifyContent: 'center',
      alignContent: 'center'
    },
    theCircle: {
      position: 'relative'
    },
    definitionText: {
      fontFamily: 'Muli',
      fontSize: 16,
      marginBottom: 5,
      textShadowColor: (state.darkMode) ? 'white' : 'black',
      textShadowOffset: {
        width: 0.5,
        height: 0.5
      },
      textShadowRadius: 1,
      color: (state.darkMode) ? 'white' : 'black',
    },
    upBox: {
      backgroundColor: '#072227',
      flexDirection: 'row',
      height: "70%",
      width: "25%",
      alignItems: 'center',
      borderRadius: 30,
      elevation: 5,
      justifyContent: 'space-evenly'
    },
    upText: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold'
    }
  });
  
  // Animated gradient
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
  const func = (what) => {
    if (what === 'top') {
      return ((state.topWord === '') ? state.topHint : state.topWord);
    }
    return ((state.bottomWord === '') ? state.bottomHint : state.bottomWord);

  };
  // find out how divByMatra should work
  const matras = ['w', 'i', 'I', 'u', 'U', 'y', 'Y', 'o', 'O', 'M', 'N', '`', '~'];
  const divByMatra = (word) => {
    let newWord = '';
    for (let i = 0; i < (word.length); i += 1) {
      // newWord += `,${word[i]}${word[i+1]}`;
      if (word[i + 1] === 'æ') {
        newWord += `${word[i]}${word[i + 1]},`;
        i += 1;
      }
      if (!matras.includes(word[i])) {
        if (i + 1 !== word.length && matras.includes(word[i + 1]) && word[i + 1] !== 'i') {
          newWord += `${word[i]}${word[i + 1]},`;
          i += 1;
        } else if (word[i - 1] === 'i') {
          newWord += `${word[i - 1]}${word[i]},`;
        } else {
          newWord += `${word[i]},`;
        }
      }
    }
    newWord = newWord.slice(0, -1);
    // console.log(newWord); prints out comma separated word with matras
    return newWord.split(',');
  };

  const hintBtn = (word) => {
    let bgColor = '#FF7E00';
    let iconColor = 'black';
    let iconName = 'lightbulb-on-outline';
    if (state.giveUpsLeft === 0 && word !== '') {
      bgColor = '#FF7E00';
      iconColor = (state.darkMode) ? 'white' : 'black';
      iconName = 'check';
    } else if (state.giveUpsLeft === 0) {
      bgColor = '#919191';
      iconColor = 'white';
      iconName = 'lightbulb-outline';
    } else if (word !== '') {
      bgColor = '#06FF00';
      iconColor = (state.darkMode) ? 'white' : 'black';
      iconName = 'check';
    } else {
      bgColor = '#FF7E00';
      iconColor = 'black';
      iconName = 'lightbulb-on-outline';
    }

    return (
      {
        backgroundColor: bgColor,
        color: iconColor,
        name: iconName,
      }
    );
  };

  // animations
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(0);
    });
  };

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
    width: width,
    marginBottom: 25
  };

  async function hint_used(the_word, eng_text) {
    await Analytics.logEvent('hint_used', { word: the_word, eng: eng_text });
  }

  async function given_up_word(the_word, eng_text) {
    await Analytics.logEvent('given_up_word', { word: the_word, eng: eng_text });
  }

  async function ran_out_of_lives(level) {
    await Analytics.logEvent('ran_out_of_lives', { level_at: level });
  }

  // // get length after removing laga matra
  // function woMatra(word) {
  //   var wordWOMatras = Array();
  //   const matras = ['w', 'i', 'I', 'u', 'U', 'y', 'Y', 'o', 'O', 'M', 'N', '`', '~'];
  //   let listedWord = word.split();
  //   console.log(`splitted: ${listedWord}`);
  //   for (ele in matras) {
  //     for (letter in listedWord) {
  //       if (ele === letter) {
  //         wordWOMatras.push(letter);
  //       }
  //     }
  //   }
  //   console.log(`word: ${word} \nlist:
  //  ${wordWOMatras} \nlength: ${wordWOMatras.length}\n final: ${wordWOMatras.join('')}`);
  //   return wordWOMatras.join('');
  // }

  /*
  To know which word is longer
  function longer() {
    if (state.firstWord.engText.length >= state.secondWord.engText.length) {
      return state.firstWord.engText.length;
    } else {
      return state.secondWord.engText.length;
    }
  } */

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <LinearGradient
      colors={state.darkMode ? ['#180188', '#00194f', '#2022fd'] : ['#5fdeff', '#9eebff', '#00bcff']}
      style={styles.container }
    >
      <SafeAreaView style={styles.container}>
        { state.helpPage ? <Help /> : null }
        {state.nextLevelModal[0] ? <WordsDoneModal /> : <View />}
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={state.darkMode ? 'light-content' : 'dark-content'}
        />
        <View style={{width: '100%', height: Dimensions.size['24'], backgroundColor:"transparent", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth:1, borderColor: '#000'}}>
          <IconH
              name="arrow-back"
              color={state.darkMode ? 'white' : 'black'}
              size={Dimensions.size['14']}
              style={{position: 'absolute', left: 10}}
              onPress={() => { navigation.goBack(); }}
            />
            <Text style={{
              color: '#D1FBFF',
              fontSize: (width<370 ? 16 : 20),
              fontFamily: 'Muli',
              margin:0,
              ...styles.status
            }}>ਅਖਰ ਜੋੜ</Text>
            <IonIcons name="help" size={Dimensions.size['14']} color={state.darkMode ? 'white' : 'black'} style={[styles.shadow, {position: 'absolute', right: 10}]} onPress={() => {dispatch(openHelpModal()); console.log(state.helpPage)}}/>
        </View>
        <View style={styles.scroller}
          contentContainerStyle={styles.scrollContent}>
        <View
          style={styles.header}
        >
          <StatsBox stat="levels" navigation={navigation} />
          <StatsBox stat="points" navigation={navigation} />
          <StatsBox stat="hints" navigation={navigation} />
        </View>

        <View
          style={styles.wordBoxAnswers}
        >
            <WordBox wordType={"top"} />
            <WordBox wordType={"bottom"} /> 

          {/* <TouchableOpacity
            style={styles.newWord}
            title="New Words"
            onPress={() => {
              dispatch(setNewWords());
            }}
          >
            <Text>New Word</Text>
          </TouchableOpacity> */}
        </View>
        
        <AttemptInput setWord={setWord}/>

        <Animated.View>
          <TheCircle visited={visited} setVisited={setVisited} points={points} word={word} setWord={setWord}/>
        </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default GameScreen;
