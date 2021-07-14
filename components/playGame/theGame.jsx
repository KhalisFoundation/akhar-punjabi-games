/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import * as Anvaad from 'anvaad-js';
import {
  View, Text, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TheCircle from './circleForGame';

import {
  setTopWord,
  setBottomWord,
  setAttempt,
  setNewWords,
  setGivenUpWords,
} from '../../redux/actions';

import theColors from '../../util/colors';

function GameScreen({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();

  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      backgroundColor: colors.theGame.container,
      paddingTop: '10%',
    },
    header: {
      flexDirection: 'row',
      // backgroundColor: "yellow",
    },
    backButton: {
      flex: 1,
    },
    backArrow: {
      width: 50,
      height: 50,
    },
    title: {
      fontSize: 32,
      flex: 2,
      // right: 20,
    },

    levelDisplay: {
      backgroundColor: colors.theGame.levelDisplay,
    },
    wordBoxAnswers: {
      // flexDirection: "column",
      width: 400,
      height: 250,
      backgroundColor: colors.theGame.wordBoxAnswers,
      borderRadius: 20,
    },
    answerRow: {
      // flex: 1,
      flexDirection: 'row',
      marginTop: 40,
    },
    hint: {
      flex: 1,
      marginLeft: 10,
    },
    wordBoxText: {
      flex: 3,
      width: 250,
      height: 50,
      backgroundColor: colors.theGame.wordBoxText,
      borderRadius: 20,
    },
    answers: {
      textAlign: 'center',
      fontSize: 35,
    },
    giveUp: {
      flex: 1,
      backgroundColor: colors.theGame.giveUp,
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    giveUpTxt: {
      textAlign: 'center',
      alignItems: 'center',
    },
    wordAttemptView: {
      flexDirection: 'row',
      padding: 10,
    },
    wordAttempt: {
      width: 200,
      height: 50,
      backgroundColor: colors.theGame.wordAttempt,
      borderRadius: 20,
      fontSize: 30,
    },
    clearBox: {
      width: 50,
      height: 30,
      backgroundColor: colors.theGame.clearBox,
      borderRadius: 20,
    },
    // newWord: {
    //   left: 265,
    //   borderRadius: 20,
    //   width: 90,
    //   backgroundColor: colors.theGame.newWord,
    //   alignItems: "center",
    // },
    theCircle: {},
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          title="Home"
          onPress={() => {
            navigation.navigate('Home', { correctWords: state.correctWords });
          }}
        >
          <Image
            source={require('../../images/left_arrow.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.title}>ਅਖਰ ਜੋੜੋ </Text>
      </View>
      <View style={styles.levelDisplay}>
        <Text>
          Give Ups left:
          {state.giveUpsLeft}
        </Text>
        <Text>
          Current Level:
          {state.levelProgress[0].level}
        </Text>
        <Text>
          Words Needed for next level:
          {' '}
          {state.levelProgress[0].wordsNeeded}
        </Text>
      </View>

      <View style={styles.wordBoxAnswers}>
        <View style={styles.answerRow}>
          <Text style={styles.hint}>
            {`Length of Word: ${state.firstWord.engText.length}`}
          </Text>
          <View style={styles.wordBoxText}>
            <Text style={styles.answers}>{Anvaad.unicode(state.topWord)}</Text>
            <View style={styles.definition}>
              <Text style={styles.definitionText}>
                {state.firstWord.meaning}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            disabled={state.giveUpsLeft === 0}
            style={
              state.giveUpsLeft === 0
                ? { ...styles.giveUp, backgroundColor: '#909090' }
                : styles.giveUp
            }
            onPress={() => {
              dispatch(setTopWord());
              dispatch(setGivenUpWords(state.firstWord));
              if (state.bottomWord !== '') {
                setTimeout(() => dispatch(setNewWords()), 1000);
              }
            }}
          >
            <Text style={styles.giveUpTxt}>GIVE UP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.answerRow}>
          <Text style={styles.hint}>
            {`Length of Word: ${state.secondWord.engText.length}`}
          </Text>
          <View style={styles.wordBoxText}>
            <Text style={styles.answers}>
              {Anvaad.unicode(state.bottomWord)}
            </Text>
            <View style={styles.definition}>
              <Text style={styles.definitionText}>
                {state.secondWord.meaning}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            disabled={state.giveUpsLeft === 0}
            style={
              state.giveUpsLeft === 0
                ? { ...styles.giveUp, backgroundColor: '#909090' }
                : styles.giveUp
            }
            onPress={() => {
              dispatch(setBottomWord());
              dispatch(setGivenUpWords(state.secondWord));
              if (state.topWord !== '') {
                setTimeout(() => dispatch(setNewWords()), 1000);
              }
            }}
          >
            <Text style={styles.giveUpTxt}>GIVE UP</Text>
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

      <View style={styles.wordAttemptView}>
        <Text style={styles.wordAttempt} placeHolder="Word">
          {Anvaad.unicode(state.attempt)}
        </Text>
        <TouchableOpacity
          style={styles.clearBox}
          onPress={() => {
            dispatch(setAttempt(''));
          }}
        >
          <Text style={styles.clearBoxText}>CLEAR</Text>
        </TouchableOpacity>
      </View>

      <TheCircle style={styles.theCircle} />
    </View>
  );
}

export default GameScreen;
