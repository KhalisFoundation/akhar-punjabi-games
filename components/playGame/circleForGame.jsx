/* eslint-disable react-native/no-color-literals */
import * as Anvaad from 'anvaad-js';
import * as React from 'react';

import {
  View, Text, StyleSheet, TouchableOpacity
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

import theColors from '../../util/colors';

function TheCircle() {
  // there can only be from 2-18 characters as input
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
  const colors = theColors[state.darkMode];

  const commonChar = {
    width: '10%',
    height: '10%',
    backgroundColor: colors.circleForGame.commanChar,
    borderRadius: 10,
  };

  const commonStyles = StyleSheet.create({
    lettersCircle: {
      width: '85%',
      height: '45%',
      borderRadius: 200,
      backgroundColor: colors.circleForGame.lettersCircle,
    },
    characterText: {
      bottom: '15%',
      fontSize: 25,
      textAlign: 'center',
    },
    character1: {
      ...commonChar,
      left: '45%',
      top: '0%',
    },
    character2: {
      ...commonChar,
      left: '45%',
      top: '80%',
    },
  });

  const threeCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '85%',
      top: '25%',
    },
  });
  const fourCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '85%',
      top: '25%',
    },
    character4: {
      ...commonChar,
      left: '5%',
      top: '15%',
    },
  });

  const fiveCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '80%',
      top: '0%',
    },
    character4: {
      ...commonChar,
      left: '15%',
      top: '35%',
    },
    character5: {
      ...commonChar,
      left: '15%',
      top: '-20%',
    },
    characterText: {
      bottom: '15%',
      fontSize: 35,
      textAlign: 'center',
    },
  });

  const sixCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '80%',
      top: '0%',
    },
    character4: {
      ...commonChar,
      left: '15%',
      top: '35%',
    },
    character5: {
      ...commonChar,
      left: '15%',
      top: '-20%',
    },
    character6: {
      ...commonChar,
      left: '80%',
      top: '15%',
    },
    characterText: {
      bottom: '15%',
      fontSize: 35,
      textAlign: 'center',
    },
  });

  const sevenCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '80%',
      top: '0%',
    },
    character4: {
      ...commonChar,
      left: '15%',
      top: '35%',
    },
    character5: {
      ...commonChar,
      left: '15%',
      top: '-20%',
    },
    character6: {
      ...commonChar,
      left: '80%',
      top: '15%',
    },
    character7: {
      ...commonChar,
      left: '80%',
      top: '-16%',
    },
  });

  const eightCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '80%',
      top: '0%',
    },
    character4: {
      ...commonChar,
      left: '15%',
      top: '35%',
    },
    character5: {
      ...commonChar,
      left: '15%',
      top: '-20%',
    },
    character6: {
      ...commonChar,
      left: '80%',
      top: '15%',
    },
    character7: {
      ...commonChar,
      left: '80%',
      top: '-16%',
    },
    character8: {
      ...commonChar,
      left: '5%',
      top: '-25%',
    },
  });

  const nineCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '65%',
      top: '-15%',
    },
    character4: {
      ...commonChar,
      left: '10%',
      top: '40%',
    },
    character5: {
      ...commonChar,
      left: '25%',
      top: '-35%',
    },
    character6: {
      ...commonChar,
      left: '80%',
      top: '20%',
    },
    character7: {
      ...commonChar,
      left: '80%',
      top: '-40%',
    },
    character8: {
      ...commonChar,
      left: '10%',
      top: '-50%',
    },
    character9: {
      ...commonChar,
      left: '65%',
      top: '5%',
    },
  });

  const tenCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '65%',
      top: '-15%',
    },
    character4: {
      ...commonChar,
      left: '10%',
      top: '40%',
    },
    character5: {
      ...commonChar,
      left: '25%',
      top: '-35%',
    },
    character6: {
      ...commonChar,
      left: '80%',
      top: '20%',
    },
    character7: {
      ...commonChar,
      left: '80%',
      top: '-40%',
    },
    character8: {
      ...commonChar,
      left: '10%',
      top: '-50%',
    },
    character9: {
      ...commonChar,
      left: '65%',
      top: '5%',
    },
    character10: {
      ...commonChar,
      left: '25%',
      top: '-5%',
    },
  });

  const elevenCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '65%',
      top: '-15%',
    },
    character4: {
      ...commonChar,
      left: '10%',
      top: '40%',
    },
    character5: {
      ...commonChar,
      left: '25%',
      top: '-35%',
    },
    character6: {
      ...commonChar,
      left: '80%',
      top: '20%',
    },
    character7: {
      ...commonChar,
      left: '80%',
      top: '-40%',
    },
    character8: {
      ...commonChar,
      left: '10%',
      top: '-50%',
    },
    character9: {
      ...commonChar,
      left: '65%',
      top: '5%',
    },
    character10: {
      ...commonChar,
      left: '25%',
      top: '-5%',
    },
    character11: {
      ...commonChar,
      left: '0%',
      top: '-55%',
    },
  });

  const twelveCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '65%',
      top: '-15%',
    },
    character4: {
      ...commonChar,
      left: '10%',
      top: '40%',
    },
    character5: {
      ...commonChar,
      left: '25%',
      top: '-35%',
    },
    character6: {
      ...commonChar,
      left: '80%',
      top: '20%',
    },
    character7: {
      ...commonChar,
      left: '80%',
      top: '-40%',
    },
    character8: {
      ...commonChar,
      left: '10%',
      top: '-50%',
    },
    character9: {
      ...commonChar,
      left: '65%',
      top: '5%',
    },
    character10: {
      ...commonChar,
      left: '25%',
      top: '-5%',
    },
    character11: {
      ...commonChar,
      left: '0%',
      top: '-55%',
    },
    character12: {
      ...commonChar,
      left: '90%',
      top: '-65%',
    },
  });

  const thirteenCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '65%',
      top: '-15%',
    },
    character4: {
      ...commonChar,
      left: '10%',
      top: '40%',
    },
    character5: {
      ...commonChar,
      left: '25%',
      top: '-35%',
    },
    character6: {
      ...commonChar,
      left: '80%',
      top: '20%',
    },
    character7: {
      ...commonChar,
      left: '80%',
      top: '-40%',
    },
    character8: {
      ...commonChar,
      left: '10%',
      top: '-50%',
    },
    character9: {
      ...commonChar,
      left: '65%',
      top: '5%',
    },
    character10: {
      ...commonChar,
      left: '25%',
      top: '-5%',
    },
    character11: {
      ...commonChar,
      left: '0%',
      top: '-65%',
    },
    character12: {
      ...commonChar,
      left: '90%',
      top: '-75%',
    },
    character13: {
      ...commonChar,
      left: '0%',
      top: '-65%',
    },
  });

  const fourteenCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '65%',
      top: '-15%',
    },
    character4: {
      ...commonChar,
      left: '10%',
      top: '40%',
    },
    character5: {
      ...commonChar,
      left: '25%',
      top: '-35%',
    },
    character6: {
      ...commonChar,
      left: '80%',
      top: '20%',
    },
    character7: {
      ...commonChar,
      left: '80%',
      top: '-40%',
    },
    character8: {
      ...commonChar,
      left: '10%',
      top: '-50%',
    },
    character9: {
      ...commonChar,
      left: '65%',
      top: '5%',
    },
    character10: {
      ...commonChar,
      left: '25%',
      top: '-5%',
    },
    character11: {
      ...commonChar,
      left: '0%',
      top: '-65%',
    },
    character12: {
      ...commonChar,
      left: '90%',
      top: '-75%',
    },
    character13: {
      ...commonChar,
      left: '0%',
      top: '-65%',
    },
    character14: {
      ...commonChar,
      left: '90%',
      top: '-75%',
    },
  });

  const fiveteenCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '65%',
      top: '-15%',
    },
    character4: {
      ...commonChar,
      left: '10%',
      top: '40%',
    },
    character5: {
      ...commonChar,
      left: '27%',
      top: '-35%',
    },
    character6: {
      ...commonChar,
      left: '80%',
      top: '20%',
    },
    character7: {
      ...commonChar,
      left: '78%',
      top: '-42%',
    },
    character8: {
      ...commonChar,
      left: '10%',
      top: '-52%',
    },
    character9: {
      ...commonChar,
      left: '65%',
      top: '5%',
    },
    character10: {
      ...commonChar,
      left: '25%',
      top: '-5%',
    },
    character11: {
      ...commonChar,
      left: '5%',
      top: '-70%',
    },
    character12: {
      ...commonChar,
      left: '86%',
      top: '-80%',
    },
    character13: {
      ...commonChar,
      left: '6%',
      top: '-63%',
    },
    character14: {
      ...commonChar,
      left: '86%',
      top: '-73%',
    },
    character15: {
      ...commonChar,
      left: '0%',
      top: '-95%',
    },
  });

  const sixteenCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '65%',
      top: '-15%',
    },
    character4: {
      ...commonChar,
      left: '10%',
      top: '40%',
    },
    character5: {
      ...commonChar,
      left: '27%',
      top: '-35%',
    },
    character6: {
      ...commonChar,
      left: '80%',
      top: '20%',
    },
    character7: {
      ...commonChar,
      left: '78%',
      top: '-42%',
    },
    character8: {
      ...commonChar,
      left: '10%',
      top: '-52%',
    },
    character9: {
      ...commonChar,
      left: '65%',
      top: '5%',
    },
    character10: {
      ...commonChar,
      left: '25%',
      top: '-5%',
    },
    character11: {
      ...commonChar,
      left: '5%',
      top: '-70%',
    },
    character12: {
      ...commonChar,
      left: '86%',
      top: '-80%',
    },
    character13: {
      ...commonChar,
      left: '6%',
      top: '-63%',
    },
    character14: {
      ...commonChar,
      left: '86%',
      top: '-73%',
    },
    character15: {
      ...commonChar,
      left: '0%',
      top: '-95%',
    },
    character16: {
      ...commonChar,
      left: '90%',
      top: '-105%',
    },
  });

  const seventeenCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '65%',
      top: '-15%',
    },
    character4: {
      ...commonChar,
      left: '10%',
      top: '40%',
    },
    character5: {
      ...commonChar,
      left: '27%',
      top: '-35%',
    },
    character6: {
      ...commonChar,
      left: '80%',
      top: '20%',
    },
    character7: {
      ...commonChar,
      left: '78%',
      top: '-42%',
    },
    character8: {
      ...commonChar,
      left: '10%',
      top: '-52%',
    },
    character9: {
      ...commonChar,
      left: '65%',
      top: '5%',
    },
    character10: {
      ...commonChar,
      left: '25%',
      top: '-5%',
    },
    character11: {
      ...commonChar,
      left: '5%',
      top: '-70%',
    },
    character12: {
      ...commonChar,
      left: '86%',
      top: '-80%',
    },
    character13: {
      ...commonChar,
      left: '6%',
      top: '-63%',
    },
    character14: {
      ...commonChar,
      left: '86%',
      top: '-73%',
    },
    character15: {
      ...commonChar,
      left: '0%',
      top: '-95%',
    },
    character16: {
      ...commonChar,
      left: '90%',
      top: '-105%',
    },
    character17: {
      ...commonChar,
      left: '0%',
      top: '-75%',
    },
  });

  const eighteenCharStyles = StyleSheet.create({
    ...commonStyles,
    character3: {
      ...commonChar,
      left: '65%',
      top: '-15%',
    },
    character4: {
      ...commonChar,
      left: '10%',
      top: '40%',
    },
    character5: {
      ...commonChar,
      left: '27%',
      top: '-35%',
    },
    character6: {
      ...commonChar,
      left: '80%',
      top: '20%',
    },
    character7: {
      ...commonChar,
      left: '78%',
      top: '-42%',
    },
    character8: {
      ...commonChar,
      left: '10%',
      top: '-52%',
    },
    character9: {
      ...commonChar,
      left: '65%',
      top: '5%',
    },
    character10: {
      ...commonChar,
      left: '25%',
      top: '-5%',
    },
    character11: {
      ...commonChar,
      left: '5%',
      top: '-70%',
    },
    character12: {
      ...commonChar,
      left: '86%',
      top: '-80%',
    },
    character13: {
      ...commonChar,
      left: '6%',
      top: '-63%',
    },
    character14: {
      ...commonChar,
      left: '86%',
      top: '-73%',
    },
    character15: {
      ...commonChar,
      left: '0%',
      top: '-95%',
    },
    character16: {
      ...commonChar,
      left: '90%',
      top: '-105%',
    },
    character17: {
      ...commonChar,
      left: '0%',
      top: '-75%',
    },
    character18: {
      ...commonChar,
      left: '90%',
      top: '-85%',
    },
  });

  return charDisplay(
    state,
    dispatch,
    commonStyles,
    threeCharStyles,
    fourCharStyles,
    fiveCharStyles,
    sixCharStyles,
    sevenCharStyles,
    eightCharStyles,
    nineCharStyles,
    tenCharStyles,
    elevenCharStyles,
    twelveCharStyles,
    thirteenCharStyles,
    fourteenCharStyles,
    fiveteenCharStyles,
    sixteenCharStyles,
    seventeenCharStyles,
    eighteenCharStyles
  );
}

function charDisplay(
  state,
  dispatch,
  commonStyles,
  threeCharStyles,
  fourCharStyles,
  fiveCharStyles,
  sixCharStyles,
  sevenCharStyles,
  eightCharStyles,
  nineCharStyles,
  tenCharStyles,
  elevenCharStyles,
  twelveCharStyles,
  thirteenCharStyles,
  fourteenCharStyles,
  fiveteenCharStyles,
  sixteenCharStyles,
  seventeenCharStyles,
  eighteenCharStyles
) {
  const { charArray } = state;
  const prevAttempt = state.attempt;

  const charatersCount = charArray.length;

  const numToWord = {
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fiveteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
  };
  const getStyles = {
    twoCharStyles: commonStyles,
    threeCharStyles,
    fourCharStyles,
    fiveCharStyles,
    sixCharStyles,
    sevenCharStyles,
    eightCharStyles,
    nineCharStyles,
    tenCharStyles,
    elevenCharStyles,
    twelveCharStyles,
    thirteenCharStyles,
    fourteenCharStyles,
    fiveteenCharStyles,
    sixteenCharStyles,
    seventeenCharStyles,
    eighteenCharStyles,
  };
  const totalCharInWord = numToWord[charatersCount];
  let styleSheet = `${totalCharInWord}CharStyles`; // a string name of styleSheet
  styleSheet = getStyles[styleSheet]; // the actual styleSheet object

  const getStylesAttributes = {
    character1: styleSheet.character1,
    character2: styleSheet.character2,
    character3: styleSheet.character3,
    character4: styleSheet.character4,
    character5: styleSheet.character5,
    character6: styleSheet.character6,
    character7: styleSheet.character7,
    character8: styleSheet.character8,
    character9: styleSheet.character9,
    character10: styleSheet.character10,
    character11: styleSheet.character11,
    character12: styleSheet.character12,
    character13: styleSheet.character13,
    character14: styleSheet.character14,
    character15: styleSheet.character15,
    character16: styleSheet.character16,
    character17: styleSheet.character17,
    character18: styleSheet.character18,
  };

  const ifCorrectWord = (word) => {
    if (word === state.firstWord.engText && state.topWord === '') {
      if (!state.correctWords.includes(state.firstWord)) {
        dispatch(setTopWord());
        dispatch(setCorrectWords(state.firstWord));
        dispatch(setLevelProgress(state.firstWord));
      }
      // if bottomWord is filled that means both are now answered so will get new words
      if (state.bottomWord !== '') {
        setTimeout(() => dispatch(setNewWords()), 500);
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
        setTimeout(() => dispatch(setNewWords()), 500);
      }
    }
  };

  return (
    <View style={styleSheet.lettersCircle}>
      {charArray.map((char) => {
        const charNum = `character${(charArray.indexOf(char) + 1).toString()}`;
        // let theLetter = String.fromCharCode(char);
        const theLetter = Anvaad.unicode(char);
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
            style={getStylesAttributes[charNum]}
          >
            <Text key={char} style={styleSheet.characterText}>
              {theLetter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TheCircle;
