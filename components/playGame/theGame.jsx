/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import * as Anvaad from 'anvaad-js';
import {
  View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView,
  Animated, Platform
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import IconH from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from 'react-native-elements';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import WordsDoneModal from './modalNextWord';
import TheCircle from './circleForGame';
import theColors from '../../util/colors';
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
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
  });
  const colors = theColors[state.darkMode];
  const colorCombos = [['#E233FF', '#FF6B00'], ['#FF0076', '#590FB7'], ['#ffc500', '#c21500'], ['#182848', '#4b6cb7'], ['#e43a15', '#e65245'], ['#480048', '#c04848'], ['#dc2424', '#4a569d'], ['#4776e6', '#8e54e9'], ['#16222a', '#3a6073'], ['#ff8008', '#ffc837'], ['#eb3349', '#f45c43'], ['#aa076b', '#61045f'], ['#ff512f', '#dd2476'], ['#e55d87', '#5fc3e4'], ['#c31432', '#240b36']];
  const colorRandom = Math.floor(Math.random() * colorCombos.length);
  const colorCenter = colorCombos[colorRandom];
  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      backgroundColor: colors.theGame.container,
      width: '100%',
      height: '100%',
      marginTop: '3.5%',
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
      backgroundColor: colors.theGame.giveUp,
      width: 35,
      height: 35,
      borderRadius: 20,
    },
    giveUpTxt: {
      textAlign: 'center',
      alignItems: 'center',
      fontSize: 35,
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
      opacity: 0.77,
      borderRadius: 25,
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 30,
    },
    clearBox: {
      width: 40,
      height: 40,
      backgroundColor: colors.theGame.clearBox,
      opacity: 0.8,
      borderRadius: 20,
      justifyContent: 'center',
      alignSelf: 'center',
      elevation: 5,
      margin: 2
    },
    clearBoxText: {
      textAlignVertical: 'center',
      textAlign: 'center',
      justifyContent: 'center',
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
            color="#ffaa00"
          />
          <Text style={styles.upText}>{state.totalPoints}</Text>
        </View>
        <View
          style={styles.upBox}
        >
          <IconM
            name="heart-circle-outline"
            size={25}
            color="#FF5959"
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
              {/* {Array.from(Array(state.firstWord.engText.length), (e,i) => {
                  return <Text style={styles.answerText}>{Anvaad.unicode(state.topWord[i])}</Text>
                })} */}
              <TouchableOpacity onPress={() => { dispatch(setAttempt(Anvaad.unicode(state.topHint))); }} style={{ width: '100%' }}>
                <Text style={{ ...styles.answerText, width: '95%' }}>
                  {Anvaad.unicode((state.topWord === '') ? state.topHint : state.topWord)}
                </Text>
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
                ? { ...styles.giveUp, backgroundColor: '#909090' }
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
            <Icon name="questioncircleo" size={25} color="black" style={styles.giveUpTxt} />
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
              <TouchableOpacity onPress={() => { dispatch(setAttempt(Anvaad.unicode(state.bottomHint))); }} style={{ width: '100%' }}>
                <Text style={{ ...styles.answerText, width: '95%' }}>
                  {Anvaad.unicode((state.bottomWord === '') ? state.bottomHint : state.bottomWord)}
                </Text>
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
                ? { ...styles.giveUp, backgroundColor: '#909090' }
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
            <Icon name="questioncircleo" size={25} color="black" style={styles.giveUpTxt} />
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
          style={styles.clearBox}
          onPress={() => {
            dispatch(setAttempt(''));
          }}
        >
          <Icon name="reload1" size={25} color="black" style={styles.clearBoxText} />
        </TouchableOpacity>
      </AnimatedLinearGradient>

      <TheCircle style={styles.theCircle} />
    </View>
  );
}

export default GameScreen;
