/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import * as Anvaad from 'anvaad-js';
import {
  View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView, Platform, Animated, TouchableWithoutFeedback
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconH from 'react-native-vector-icons/MaterialIcons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from 'react-native-elements';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import EnIcon from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import theColors from '../../util/colors';
import { StatsBox, WordBox, AttemptInput } from '.';
import WordsDoneModal from './modalNextWord';
import { HintButton } from './hintButton';
import ConfettiCannon from 'react-native-confetti-cannon';
import {
  openHelpModal,
  setAttempt,
  setCorrectWords,
  setBottomWord,
  setTopWord,
  setLevelProgress,
  setNewWords
} from '../../redux/actions';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Analytics from 'expo-firebase-analytics';
import Help from './help';
import dimensions from '../../util/dimensions';
import TheCircle from './circleForGame';

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
  
  const {height, width} = dimensions;

  const points = [];

  const colors = theColors.false;
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: 50
    },
    scroller: {
      height: '100%',
      width: '100%',
      flexDirection: 'column',
      paddingVertical: width*0.05,
      justifyContent:'space-evenly',
    },
    scrollContent: {
      alignItems: 'center', 
      justifyContent: 'space-evenly'
    },
    status: {
      color: 'black',
      fontSize: dimensions.size['10'],
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
      width: "90%",
      paddingHorizontal: 10,
      justifyContent: 'space-evenly',
      borderRadius:30,
      alignSelf: 'center',
      backgroundColor: 'transparent',
      marginHorizontal: 10,
    },
    header: {
      height: 65,
      width: '90%',
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
      color: 'black',
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
      borderColor: 'black',
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
      padding: dimensions.size["4"],
      borderRadius: 50,
      marginTop: 15,
    },
    wordAttempt: {
      width: "75%",
      height: "100%",
      opacity: 0.8,
      color: 'white',
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
      textShadowColor: 'black',
      textShadowOffset: {
        width: 0.5,
        height: 0.5
      },
      textShadowRadius: 1,
      color: 'black',
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
    },
    keyboardRow: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignSelf: 'center',
      padding: 7
    },
    key: {
      width: dimensions.size['20'],
      height: dimensions.size['20'],
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
      marginVertical: 0,
      padding: 2,
      borderColor: '#000',
      borderWidth: .5,
      borderRadius: 10,
      backgroundColor: '#274C7C',
      elevation: 5
    },
    keyText: {
      color: 'white',
    },
  });

  async function ran_out_of_lives(level) {
    await Analytics.logEvent('ran_out_of_lives', { level_at: level });
  }

  if (state.giveUpsLeft == 0) {
    ran_out_of_lives(state.levelProgress[0].level)
  }

  function splitArray(arr, chunk) {
    const groups = arr.map((e, i) => { 
      return i % chunk === 0 ? arr.slice(i, i + chunk) : null; 
    }).filter(e => { return e; });
    return groups;
  }

  const keysArray = points.map(a=>a.letter);
  let chunk = keysArray.length%2 == 0 ? keysArray.length/2 : (keysArray.length + 1)/2
  const keyboardGrid = splitArray(keysArray, chunk)
  //console.log(keyboardGrid);

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
      colors={['#2289d8','#032b45']}
      style={styles.container }
    >
    <SafeAreaView style={styles.scroller}>
        { state.helpPage ? <Help /> : null }
        { state.nextLevelModal[0] ? <WordsDoneModal /> : null }
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
          />
        <View style={{width: '100%', backgroundColor:"transparent", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding:20}}>
            <TouchableOpacity
              style={{justifyContent: 'flex-start'}}
              onPress={() => navigation.goBack()}
              >
              <IonIcons name="chevron-back" size={width*0.08} color={'black'}/>
            </TouchableOpacity>
            <View
              style={styles.header}
              >
              <StatsBox stat="levels" navigation={navigation} />
              <StatsBox stat="hints" navigation={navigation} />
              {/* <StatsBox stat="points" navigation={navigation} /> */}
            </View>
            <IonIcons name="help" size={width*0.08} color={'black'} style={{justifyContent: 'flex-end'}} onPress={() => {dispatch(openHelpModal()); console.log(state.helpPage)}}/>
        </View>
        <View style={styles.scroller}
          contentContainerStyle={styles.scrollContent}>
        {/* <View
          style={styles.header}
          >
          <StatsBox stat="levels" navigation={navigation} />
          <StatsBox stat="hints" navigation={navigation} />
          {/* <StatsBox stat="points" navigation={navigation} />
        </View> */}

        <LinearGradient
          colors={['#ff6f00',"#b34e00"]}
          style={styles.wordBoxAnswers}
          >
        <View
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
        </LinearGradient>
        
        <AttemptInput setWord={setWord}/>

        <View style={{flexDirection:'column', justifyContent: 'space-evenly', height:'50%'}}>
              {/* {keyboardGrid.map((letters, index) => {
                return (
                  <View style={styles.keyboardRow} >
                    {letters.map((letter, index)=>{
                    //   if (letter === 'meta') {
                    //   return (
                    //     <TouchableOpacity style={styles.key} key={letter} onPress={() => {touchedMe(state.attempt.slice(0,-1))}}>
                    //       <Text style={{...styles.keyText, fontSize:(width<370 ? 14 : 20)}}>{"\u2190"}</Text>
                    //     </TouchableOpacity>
                    //   );
                    // }

                    // if (letter === 'space') {
                    //   return (
                    //     <TouchableOpacity style={styles.key} key={letter} onPress={() => {dispatch(setAttempt(' '))}}>
                    //       <Text style={{...styles.keyText, fontSize:(width<370 ? 14 : 20)}}>{"\u2423"}</Text>
                    //     </TouchableOpacity>
                    //   );
                    // }

                    return (
                      <TouchableOpacity
                      style={styles.key} 
                        onPress={() => {touchedMe(state.attempt+letter)}}
                      >
                        <Text style={{...styles.keyText, fontFamily: state.romanised ? 'Muli' : 'Bookish', fontSize: dimensions.size['8']}}>
                          {gurmukhi(letter)}
                        </Text>
                      </TouchableOpacity>
                    );
                    })}
                </View>)
            })} */}
            <TheCircle/>
          {/*condition to show hint button only when both words are not guessed*/}
          <View style={{width: '100%', backgroundColor:"transparent", flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            {((state.topHint.length !== state.firstLength) && (state.topWord.length !== state.firstLength)) ? <HintButton wordType={"top"}/> : <HintButton wordType={"bottom"}/>}
          </View>
        </View>
      </View>
    </SafeAreaView>
    { state.confetti ? <ConfettiCannon count={200} origin={{x: -10, y: 0}} fallSpeed={2000} autoStart/> : null }
    </LinearGradient>
  );
}

export default GameScreen;
