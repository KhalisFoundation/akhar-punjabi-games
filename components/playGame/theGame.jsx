/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import { useRef, useEffect } from 'react';
import * as Anvaad from 'anvaad-js';
import {
  View, Text, TouchableOpacity, StyleSheet, StatusBar,Dimensions, ScrollView, Platform, Animated
} from 'react-native';
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
// import Animated, { FadeIn,AnimatedLayout, Layout, FadeOut } from 'react-native-reanimated';
import theColors from '../../util/colors';
import TheCircle from './circleForGame';
import WordsDoneModal from './modalNextWord';
import {
  setTopWord,
  setBottomWord,
  setCorrectWords,
  setLevelProgress,
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
    Muli: require('../../assets/fonts/Muli.ttf'),
  });
  
  const screenWidth = Dimensions.get('window').width;
  const colors = theColors[state.darkMode];
  const [prevAttempt, setPrevAttempt] = useState("");
  const [colorCenter] = useState(['#274C7C', '#274C7C']);
  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      backgroundColor: colors.theGame.container,
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      paddingTop: '3.5%',
      paddingBottom: '3.5%',
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
      height: "25%",
      marginBottom: 5,
      backgroundColor: 'transparent',
      paddingHorizontal: 10,
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
      width: "100%",
      height: 50,
    },
    answerTouchOpacity: {
      justifyContent: 'center',
      paddingTop: 10,
      height: 50,
      width: "100%",
    },
    giveUp: {
      margin: 5,
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
      width: '100%',
    },
    definitionText: {
      fontFamily: 'Muli',
      fontSize: 16,
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
  const awayOrTogether = (which) => {
    let printed = '';
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {Array.from(state.includeMatra 
            ? divByMatra((which === 'top') ? state.firstWord.engText : state.secondWord.engText)
            : Array((which === 'top') ? state.firstWord.engText.length : state.secondWord.engText.length), (e, i) => {
            return (
              <Text style={{ ...styles.answerText, borderRadius: 15 }} key={i}>
                {Anvaad.unicode(printed[i])}
              </Text>
            );
          })}
        </View>
      );
    }
    return (
      <Text style={{ ...styles.answerText, width: '95%', backgroundColor: 'transparent'}}>
        {Anvaad.unicode((which === 'top')
          ? func('top')
          : func('bottom'))}
      </Text>
    );
  };

  // animations
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

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
    width: screenWidth
  };

  // checking if the word is correct
  useEffect(() => {
    if (state.topWord === state.firstWord.engText && state.bottomWord === state.secondWord.engText) {
      setTimeout(() => {
        setState({
          ...state,
          giveUpsLeft: state.giveUpsLeft - 1,
          topWord: '',
          bottomWord: '',
          topHint: '',
          bottomHint: '',
          firstWord: {
            ...state.firstWord,
            isCorrect: true,
            isAnswered: true,
          },
          secondWord: {
            ...state.secondWord,
            isCorrect: true,
            isAnswered: true,
          },
        });
        handleAnimation();
      }
      , 1000);
    }
  }, [state.topWord, state.bottomWord]);
  let word = state.attempt;
  if (word === state.firstWord.engText && state.topWord === '') {
    handleAnimation();
    if (!state.correctWords.includes(state.firstWord)) {
      dispatch(setTopWord());
      dispatch(setCorrectWords(state.firstWord));
      dispatch(setLevelProgress(state.firstWord));
    }
    // if bottomWord is filled that means both are now answered so will get new words
    if (state.bottomWord !== '') {
      dispatch(setNewWords());
    }
  }
  if (word === state.secondWord.engText && state.bottomWord === '') {
    handleAnimation();
    if (!state.correctWords.includes(state.secondWord)) {
      dispatch(setBottomWord());
      dispatch(setCorrectWords(state.secondWord));
      dispatch(setLevelProgress(state.secondWord));
    }
    // if topWord is filled that means both are now answered so will get new words
    if (state.topWord !== '') {
      dispatch(setNewWords());
    }
  };

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
    <AnimatedLinearGradient
      colors={state.darkMode ? ['#180188', '#00194f', '#2022fd'] : ['#5fdeff', '#9eebff', '#00bcff']}
      style={styles.container}
    >
      {state.nextLevelModal[0] ? <WordsDoneModal /> : <View />}
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
      />
      <Header
        backgroundColor="transparent"
        containerStyle={[
          Platform.OS === 'android' && { height: 100, paddingTop: 0, justifyContent: 'center' },
        ]}
        leftComponent={(
          <IconH
            name="arrow-back"
            color={state.darkMode ? 'white' : 'black'}
            size={30}
            onPress={() => { navigation.navigate('Home'); }}
          />
          )}
        centerComponent={{
          text: 'ਅਖਰ ਜੋੜ',
          style: {
            color: state.darkMode ? '#ff6e00' : 'black',
            fontSize: 30,
            fontFamily: 'Bookish',
            
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
            color="#FF7E00"
          />
          <Text style={[styles.upText, { color: 'cyan' }]}>{state.giveUpsLeft}</Text>
          <TouchableOpacity
            onPress={() => { navigation.navigate('giveUps', { prevScreen: 1 }); }}
          >
            <IconM name="plus-circle" size={25} color="#06FF00" />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{...styles.wordBoxAnswers, justifyContent: 'space-evenly'}}
      >
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width:'100%'}}>
            <View style={{flexDirection: 'column', width: "80%"}}>
              <TouchableOpacity onPress={() => { dispatch(setAttempt((state.topWord === '') ? state.topHint : state.topWord)); }} style={styles.answerTouchOpacity}>
                {awayOrTogether('top')}
              </TouchableOpacity>
              <ScrollView
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ marginStart:15, width: '90%', ...styles.definitionText }}
              >
                <Text style={styles.definitionText}>
                  {state.firstWord.meaning}
                </Text>
              </ScrollView>
            </View>
          <TouchableOpacity
            disabled={state.giveUpsLeft === 0 || state.topWord !== ''}
            style={{ ...styles.giveUp, backgroundColor: hintBtn(state.topWord).backgroundColor }}
            onPress={() => {
              dispatch(setGiveUpLives('-'));
              const newTopLength = state.topHint.length;
              const hT = (state.topHint + state.firstWord.engText[newTopLength]).toString();
              dispatch(setTopHint(hT));
              if (newTopLength === (state.firstLength - 1)) {
                dispatch(setTopWord());
                handleAnimation();
                dispatch(setGivenUpWords(state.firstWord));
                if (state.bottomWord !== '') {
                  dispatch(setNewWords());
                }
              }
              console.log(`topHint from state: ${state.topHint}`);
              console.log(`first word from state: ${state.firstWord.engText}`);
            }}
          >
            <IconM
              name={hintBtn(state.topWord).name}
              size={25}
              color={hintBtn(state.topWord).color}
              style={styles.giveUpTxt}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width:'100%'}}>
          <View style={{flexDirection: 'column', width: "80%"}}>
              {/* {Array.from(Array(state.secondWord.engText.length), (e,i) => {
                  return {<Text style={styles.answerText}>
                  {Anvaad.unicode(state.bottomWord[i])}
                  </Text>}
                })} */}
              <TouchableOpacity onPress={() => { dispatch(setAttempt((state.bottomWord === '') ? state.bottomHint : state.bottomWord)); }} style={styles.answerTouchOpacity}>
                {awayOrTogether('bottom')}
              </TouchableOpacity>
            <ScrollView
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{ marginStart:15, width: '90%', ...styles.definitionText }}
            >
              <Text style={styles.definitionText}>
                {state.secondWord.meaning}
              </Text>
            </ScrollView>
          </View>
          <TouchableOpacity
            disabled={state.giveUpsLeft === 0 || state.bottomWord !== ''}
            style={{ ...styles.giveUp, backgroundColor: hintBtn(state.bottomWord).backgroundColor }}
            onPress={() => {
              dispatch(setGiveUpLives('-'));
              const newBottomLength = state.bottomHint.length;
              const hB = (state.bottomHint + state.secondWord.engText[newBottomLength]).toString();
              dispatch(setBottomHint(hB));
              if (newBottomLength === (state.secondLength - 1)) {
                dispatch(setBottomWord());
                handleAnimation();
                dispatch(setGivenUpWords(state.secondWord));
                if (state.topWord !== '') {
                  dispatch(setNewWords());
                }
              }
              console.log(`bottomHint from state: ${state.bottomHint}`);
              console.log(`second word from state: ${state.secondWord.engText}`);
            }}
          >
            <IconM
              name={hintBtn(state.bottomWord).name}
              size={25}
              color={hintBtn(state.bottomWord).color}
              style={styles.giveUpTxt}
            />
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
      </View>
      
      <AnimatedLinearGradient
        colors={state.darkMode ? ['#dca104', '#ff8a00'] : colorCenter}
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
      <Animated.View style={animatedStyle}>
        <TheCircle />
      </Animated.View>
    </AnimatedLinearGradient>
  );
}

export default GameScreen;
