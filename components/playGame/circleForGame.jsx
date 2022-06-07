/* eslint-disable react-native/no-color-literals */
import * as Anvaad from 'anvaad-js';
import * as React from 'react';

import {
  Text, StyleSheet, TouchableOpacity, Animated, View, Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import {
  setAttempt,
  setBottomWord,
  setTopWord,
  setCorrectWords,
  setLevelProgress,
  setNewWords,
} from '../../redux/actions';

function TheCircle() {
  // there can only be from 2-18 characters as input
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  function gurmukhi(text) {
    if (state.romanised) {
      return Anvaad.translit(text);
    }
    return Anvaad.unicode(text);

  }
  function touchedMe(object, final) {
    console.log(`${object} was touched!`);
    dispatch(setAttempt(final));
    ifCorrectWord(final);
  }
  const { charArray } = state;
  const prevAttempt = state.attempt;
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    lettersCircle: {
      height: 300,
      width: '100%',
    },
    clearBox: {
      width: 0.12*width,
      height: 0.12*width,
      justifyContent: 'center',
      alignItems: 'center'
    },
    characterText: {
      paddingBottom: 5,
      fontSize: state.romanised ? 22.5 : 30,
      color: state.darkMode ? 'darkblue' : '#FF7E00',
      textAlign: 'center',
    },
    commonChar: {
      position: 'absolute',
      width: 0.12*width,
      height: 0.12*width,
      backgroundColor: state.darkMode ? '#FF7E00' : '#274C7C',
      elevation: 5,
      borderRadius: 25,
      justifyContent: 'center',
    }
  });

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
  let angle = 0;

  const radius =  110;
  const step = (2 * Math.PI) / charArray.length;
  const new_height = height/(Math.floor(height/100)-1);
  const sub = (width>400)? 1.7 : .75;
  const new_width = width/(Math.floor(width/100)-sub);
  //  const colorCombos = [['#E233FF', '#FF6B00'],
  // ['#FF0076', '#590FB7'], ['#ffc500', '#c21500'], ['#182848', '#4b6cb7'],
  // ['#e43a15', '#e65245'], ['#480048', '#c04848'], ['#dc2424', '#4a569d'], ['#4776e6', '#8e54e9'],
  // ['#16222a', '#3a6073'], ['#ff8008', '#ffc837'], ['#eb3349', '#f45c43'], ['#aa076b', '#61045f'],
  // ['#ff512f', '#dd2476'], ['#e55d87', '#5fc3e4'], ['#c31432', '#240b36']];
  // const colorRandom = Math.floor(Math.random() * colorCombos.length);
  // const [colorCenter] = useState(colorCombos[colorRandom]);;
  return (
    <AnimatedLinearGradient
      colors={['transparent', 'transparent']}
      style={styles.lettersCircle}
    >
      {
      charArray.map((char) => {
        const x = Math.round(new_width + radius * Math.cos(angle));
        const y = Math.round(new_height + radius * Math.sin(angle));
        //console.log("height: %d, width: %d, x %d, y %d", new_height, new_width, x, y)
        // let theLetter = String.fromCharCode(char);
        const theLetter = gurmukhi(char);
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
              touchedMe(char, final);
            }}
            key={char}
            style={{
              ...styles.commonChar,
              left: x,
              top: y,
            }}
          >
            <Text key={char} style={styles.characterText}>
              {theLetter}
            </Text>
          </TouchableOpacity>
        );
      })
}
      {(state.attempt == "") ? <View></View> :
      <TouchableOpacity
        style={{
          backgroundColor: state.darkMode ? 'black' : 'white',
          borderRadius: 25,
          height: 40,
          width: 40,
          alignSelf: 'center',
          top: new_height,
          elevation: 5
        }}
        onPress={() => {
          dispatch(setAttempt(''));
        }}
      >
        <MaskedView
          style={{
            height: 50,
            width: 50
          }}
          maskElement={(
            <View
              style={{
                backgroundColor: 'transparent',
                padding: 5
              }}
            >
              <IconM name="reload" size={30} color="black" style={styles.clearBox} />
            </View>
        )}
        >
          <LinearGradient
            colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </TouchableOpacity>}
    </AnimatedLinearGradient>
  );
}

export default TheCircle;
