/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import * as Anvaad from 'anvaad-js';
import {
  View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView,
  Animated, Platform
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
import { useState } from 'react';
// import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
// import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import theColors from '../../util/colors';
import TheCircle from './circleForGame';
import WordsDoneModal from './modalNextWord';
import {
  setTopWord,
  setBottomWord,
  setAttempt,
  setNewWords,
  setGivenUpWords,
  setTopHint,
  setBottomHint,
  setGiveUpLives,
} from '../../redux/actions';

function GameScreen({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  /* Can be referred while implementing swipes, if any
  const [swipeWay, setSwipeWay] = useState({
    myText: 'I\'m ready to get swiped!',
    gestureName: 'none',
    backgroundColor: '#fff'
  });

  function onSwipeUp(gestureState) {
    setSwipeWay({myText: 'You swiped up!'});
  }

  function onSwipeDown(gestureState) {
    setSwipeWay({myText: 'You swiped down!'});
  }

  function onSwipeLeft(gestureState) {
    setSwipeWay({myText: 'You swiped left!'});
  }

  function onSwipeRight(gestureState) {
    setSwipeWay({myText: 'You swiped right!'});
    navigation.navigate('Home');
  }
  function onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setSwipeWay({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        setSwipeWay({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        setSwipeWay({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        setSwipeWay({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        setSwipeWay({backgroundColor: 'yellow'});
        break;
    }
  }
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  }; */
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
  });
  const colors = theColors[state.darkMode];
  const [matrafiedTop, setMatrafiedTop] = useState('');
  const [matrafiedBottom, setMatrafiedBottom] = useState('');
  const colorCombos = [['#E233FF', '#FF6B00'], ['#FF0076', '#590FB7'], ['#ffc500', '#c21500'], ['#182848', '#4b6cb7'], ['#e43a15', '#e65245'], ['#480048', '#c04848'], ['#dc2424', '#4a569d'], ['#4776e6', '#8e54e9'], ['#16222a', '#3a6073'], ['#ff8008', '#ffc837'], ['#eb3349', '#f45c43'], ['#aa076b', '#61045f'], ['#ff512f', '#dd2476'], ['#e55d87', '#5fc3e4'], ['#c31432', '#240b36']];
  const colorRandom = Math.floor(Math.random() * colorCombos.length);
  const [colorCenter] = useState(colorCombos[colorRandom]);
  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      backgroundColor: colors.theGame.container,
      width: '100%',
      height: '100%',
      marginTop: '3.5%',
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
      width: 400,
      height: 225,
      backgroundColor: colors.theGame.wordBoxAnswers,
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
    header: {
      height: 65,
      width: '100%',
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
      flex: 3,
      margin: 5,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      width: 250,
      height: 125,
    },
    answerText: {
      justifyContent: 'center',
      textAlign: 'center',
      color: 'black',
      fontSize: 35,
      backgroundColor: colors.theGame.wordBoxText,
      borderRadius: 25,
      width: 50,
      height: 50,
      marginBottom: 5
    },
    giveUp: {
      margin: 8,
      alignItems: 'center',
      justifyContent: 'center',
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
    },
    wordAttemptView: {
      flexDirection: 'row',
      padding: 10,
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
      marginTop: 5
    },
    wordAttempt: {
      width: 200,
      height: 50,
      backgroundColor: colors.theGame.wordAttempt,
      opacity: 0.8,
      borderRadius: 100,
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 30,
      marginEnd: 5
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
    theCircle: {},
    definitionText: {
      color: 'white',
      margin: 25,
    },
    upBox: {
      backgroundColor: '#072227',
      flexDirection: 'row',
      height: 40,
      width: 100,
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
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
  // find out how divByMatra should work
  const matras = ['w', 'i', 'I', 'u', 'U', 'y', 'Y', 'o', 'O', 'M', 'N', '\`', '~'];
  const divByMatra = (word) => {
    let newWord = '';
    for (i=0; i < (word.length); i++) {
      // newWord += `,${word[i]}${word[i+1]}`;
      if (word[i+1] === 'æ'){
        newWord += `${word[i]}${word[i+1]},`;
        i++;
      }
      if (!matras.includes(word[i])) {
        if (i+1 !== word.length && matras.includes(word[i+1]) && word[i+1]!=='i') {
            newWord += `${word[i]}${word[i+1]},`;
            i++;
        } else if (word[i-1] === 'i'){
          newWord += `${word[i-1]}${word[i]},`;
        } else {
          newWord += `${word[i]},`;
        }
      }
    }
    newWord = newWord.slice(0, -1); 
    console.log(newWord);
    return newWord.split(',');
  }
  const awayOrTogether = (which) => {
    var printed = ''
    if (which === 'top') {
      printed = (state.topWord === '') ? state.topHint : state.topWord;
    } else {
      printed = (state.bottomWord === '') ? state.bottomHint : state.bottomWord;
    }
    if (state.includeMatra) {
      printed = divByMatra(printed);
    }
    if (state.showNumOfLetters) {
      return (
        <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          {Array.from(state.includeMatra ? divByMatra((which === 'top') ? state.firstWord.engText : state.secondWord.engText) : Array((which === 'top') ? state.firstWord.engText.length : state.secondWord.engText.length), (e,i) => {
              return <Text style={{...styles.answerText, borderRadius:15}}>{Anvaad.unicode(printed[i])}</Text>
            })}
        </View>
      )
    } else {
      return (
        <Text style={{ ...styles.answerText, width: '95%' }}>
          {Anvaad.unicode((which === 'top') ? ((state.topWord === '') ? state.topHint : state.topWord) : ((state.bottomWord === '') ? state.bottomHint : state.bottomWord))}
        </Text>
      )
    }
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
  //   console.log(`word: ${word} \nlist: ${wordWOMatras} \nlength: ${wordWOMatras.length}\n final: ${wordWOMatras.join('')}`);
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
    <View
      style={styles.container}
    >
      {state.nextLevelModal[0] ? <WordsDoneModal /> : <View />}
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
          <IconH
            name="arrow-back"
            color="black"
            size={30}
            onPress={() => { navigation.navigate('Home'); }}
          />
          )}
        centerComponent={{
          text: 'ਅਖਰ ਜੋੜ',
          style: {
            color: 'black',
            fontSize: 18,
            fontFamily: 'Bookish'
          }
        }}
      />
      <View
        style={styles.header}
      >
        <View
          style={styles.upBox}
        >
          <IconM
            name="trophy-award"
            size={25}
            color="#93FFD8"
          />
          <Text style={styles.upText}>
            Level
            {' '}
            {state.levelProgress[0].level}
          </Text>
        </View>
        <View
          style={styles.upBox}
        >
          <IconM
            name="star-four-points"
            size={25}
            color="yellow"
          />
          <Text style={styles.upText}>{state.totalPoints}</Text>
        </View>
        <View
          style={styles.upBox}
        >
          <IconM
            name="lightbulb-on"
            size={25}
            color="orange"
          />
          <Text style={[styles.upText, { color: 'cyan' }]}>{state.giveUpsLeft}</Text>
          <TouchableOpacity
            onPress={() => { navigation.navigate('giveUps'); }}
          >
            <IconM name="plus-circle" size={25} color="#06FF00" />
          </TouchableOpacity>
        </View>
      </View>

      <AnimatedLinearGradient
        colors={colorCenter}
        start={{ x: 0.5, y: 0.0 }}
        style={styles.wordBoxAnswers}
      >
        <View style={styles.answerRow}>
          <View style={styles.wordBoxText}>
            <View style={{
              flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginStart: 15
            }}
            >
              <TouchableOpacity onPress={() => { dispatch(setAttempt((state.topWord === '') ? state.topHint : state.topWord)); }} style={{ width: '100%' }}>
                {awayOrTogether('top')}
              </TouchableOpacity>
            </View>
            <ScrollView
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              horizontal
            >
              <Text style={styles.definitionText}>
                {state.firstWord.meaning}
              </Text>
            </ScrollView>
          </View>
          <TouchableOpacity
            disabled={state.giveUpsLeft === 0 || state.topWord !== ''}
            style={
              (state.giveUpsLeft === 0 || state.topWord !== '')
                ? { ...styles.giveUp, backgroundColor: '#919191' }
                : styles.giveUp
            }
            onPress={() => {
              dispatch(setGiveUpLives('-'));
              const newTopLength = state.topHint.length;
              const hT = (state.topHint + state.firstWord.engText[newTopLength]).toString();
              dispatch(setTopHint(hT));
              if (newTopLength === (state.firstLength - 1)) {
                dispatch(setTopWord());
                dispatch(setGivenUpWords(state.firstWord));
                if (state.bottomWord !== '') {
                  dispatch(setNewWords());
                }
              }
              console.log(`topHint from state: ${state.topHint}`);
              console.log(`first word from state: ${state.firstWord.engText}`);
            }}
          >
            <IconM name={(state.giveUpsLeft === 0 || state.topWord !== '') ? 'lightbulb-outline' : 'lightbulb-on-outline'} size={25} color={state.darkMode ? 'white' : 'black'} style={styles.giveUpTxt} />
          </TouchableOpacity>
        </View>
        <View style={styles.answerRow}>
          <View style={styles.wordBoxText}>
            <View style={{
              flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginStart: 15
            }}
            >
              {/* {Array.from(Array(state.secondWord.engText.length), (e,i) => {
                  return {<Text style={styles.answerText}>
                  {Anvaad.unicode(state.bottomWord[i])}
                  </Text>}
                })} */}
              <TouchableOpacity onPress={() => { dispatch(setAttempt((state.bottomWord === '') ? state.bottomHint : state.bottomWord)); }} style={{ width: '100%' }}>
                {awayOrTogether('bottom')}
              </TouchableOpacity>
            </View>
            <ScrollView
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              horizontal
            >
              <Text style={styles.definitionText}>
                {state.secondWord.meaning}
              </Text>
            </ScrollView>
          </View>
          <TouchableOpacity
            disabled={state.giveUpsLeft === 0 || state.bottomWord !== ''}
            style={
              (state.giveUpsLeft === 0 || state.bottomWord !== '')
                ? { ...styles.giveUp, backgroundColor: '#919191' }
                : styles.giveUp
            }
            onPress={() => {
              dispatch(setGiveUpLives('-'));
              const newBottomLength = state.bottomHint.length;
              const hB = (state.bottomHint + state.secondWord.engText[newBottomLength]).toString();
              dispatch(setBottomHint(hB));
              if (newBottomLength === (state.secondLength - 1)) {
                dispatch(setBottomWord());
                dispatch(setGivenUpWords(state.secondWord));
                if (state.topWord !== '') {
                  dispatch(setNewWords());
                }
              }
              console.log(`topHint from state: ${state.bottomHint}`);
              console.log(`first word from state: ${state.secondWord.engText}`);
            }}
          >
            <IconM name={(state.giveUpsLeft === 0 || state.bottomWord !== '') ? 'lightbulb-outline' : 'lightbulb-on-outline'} size={25} color={state.darkMode ? 'white' : 'black'} style={styles.giveUpTxt} />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          style={styles.newWord}
          title="New Words"
          onPress={() => {
            dispatch(setNewWords());
          }}
        >
          <Text>New Word</Text>
        </TouchableOpacity> */}
      </AnimatedLinearGradient>

      <AnimatedLinearGradient
        colors={colorCenter}
        style={styles.wordAttemptView}
      >
        <Text style={styles.wordAttempt} placeHolder="Word">
          {Anvaad.unicode(state.attempt)}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: state.darkMode ? 'black' : 'white', borderRadius: 25, height: 40, width: 40, alignSelf: 'center'
          }}
          onPress={() => {
            const slico = state.attempt.slice(0, (state.attempt.length - 1));
            console.log(slico);
            dispatch(setAttempt(state.attempt.slice(0, (state.attempt.length - 1))));
          }}
        >
          <MaskedView
            style={{
              height: 40,
              width: 40,
            }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                  alignSelf: 'center',
                  padding: 5
                }}
              >
                <IconM name="backspace" size={25} />
              </View>
          )}
          >
            <LinearGradient
              colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </TouchableOpacity>
      </AnimatedLinearGradient>

      <Animatable.View
        animation="fadeIn"
        iterationCount={1}
        delay={30}
      >
        <Animatable.View
          animation="rotate"
          iterationCount={1}
          delay={30}
        >
          <TheCircle style={styles.theCircle} />
        </Animatable.View>
      </Animatable.View>
    </View>
  );
}

export default GameScreen;
