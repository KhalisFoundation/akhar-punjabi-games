/* eslint-disable react-native/no-color-literals */
import * as Anvaad from 'anvaad-js';
import * as React from 'react';

import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAttempt,
  setBottomWord,
  setTopWord,
  setCorrectWords,
  setLevelProgress,
  setNewWords,
} from '../../redux/actions';
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";

import theColors from '../../util/colors';

function TheCircle() {
  // there can only be from 2-18 characters as input
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
  const colors = theColors[state.darkMode];
  const { charArray } = state;
  const prevAttempt = state.attempt;

  const styles = StyleSheet.create({
    lettersCircle: {
      bottom: 0,
      height: 200,
      width: 200,
      top: "10%",
    },
    characterText: {
      bottom: '15%',
      fontSize: 35,
      textAlign: 'center',
    },
    commonChar: {
      position:'absolute',
      width: 50,
      height: 50,
      backgroundColor: 'gold',
      elevation: 5,
      borderColor: 'maroon',
      borderWidth: 5,
      borderRadius: 10,
    }}
    )

  const ifCorrectWord = (word) => {
    if (word === state.firstWord.engText && state.topWord === '') {
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
      if (!state.correctWords.includes(state.secondWord)) {
        dispatch(setBottomWord());
        dispatch(setCorrectWords(state.secondWord));
        dispatch(setLevelProgress(state.secondWord));
      }
      // if topWord is filled that means both are now answered so will get new words
      if (state.topWord !== '') {
        dispatch(setNewWords());
      }
    }
  };
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
  var angle = 0;
  var width = 200;
  var height = 200;
  var radius = 125;
  var step = (2*Math.PI) / charArray.length;
  return (
    <View
      style={styles.lettersCircle}
    >
    {
      charArray.map((char) => {
        
        var x = Math.round(width/2 + radius * Math.cos(angle) - width/8);
        var y = Math.round(height/2 + radius * Math.sin(angle) - height/8);
        // let theLetter = String.fromCharCode(char);
        const theLetter = Anvaad.unicode(char);
        angle += step;
        return (
          <TouchableOpacity
            onPress={() => {
              let final;

              if (prevAttempt === undefined) {
                final = char;
              } else if (char === 'i' && prevAttempt !== '') {
                /* reason for doing this is so you can type ਰਹਿਣ correctly.
                If this if wasn't there you would need to type ਰਹਿਣ as ਰਿਹਣ to get correct answer
                because ਰਹਿਣ changes to ਰਹਣਿ */
                const prevString = prevAttempt.substring(
                  0,
                  prevAttempt.length - 1
                );
                final = prevString + char + prevAttempt[prevAttempt.length - 1];
              } else {
                final = prevAttempt + char;
              }
              dispatch(setAttempt(final));
              ifCorrectWord(final);
            }}
            key={char}
            style={{
              ...styles.commonChar,
              left: x,
              top: y,}}
          >
            <Text key={char} style={styles.characterText}>
              {theLetter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TheCircle;
