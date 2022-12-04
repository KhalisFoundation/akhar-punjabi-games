/* eslint-disable no-param-reassign */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable consistent-return */
import * as React from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import dimensions from '../../util/dimensions';
import { setAttempt } from '../../redux/actions';

export const WordBox = ({ wordType }) => {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
  const {width} = dimensions;

  // const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    GurbaniAkharSG: require('../../assets/fonts/GurbaniAkharSG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
    Prabhki: require('../../assets/fonts/Prabhki.ttf')
  });

  const styles = StyleSheet.create({
    wordBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: width*0.2,
      alignSelf: 'center',
      padding: 5
    },
    answerText: {
      textAlign: 'center',
      color: '#7a3e00',
      borderRadius: 20,
      height: width*0.01,
      fontFamily: 'GurbaniAkharSG',
    },
    answerTouchOpacity: {
      justifyContent: 'center',
      width: '100%',
    },
    definitionText: {
      fontFamily: 'Muli',
      fontSize: width*0.04,
      marginBottom: 5,
      textShadowColor: 'black',
      textShadowOffset: {
        width: 0.5,
        height: 0.5
      },
      textShadowRadius: 1,
      color: '#fff',
    },
    // giveUp: {
    //   marginRight: 5,
    //   marginTop: 5,
    //   alignSelf: 'center',
    //   backgroundColor: 'orange',
    //   opacity: 1,
    //   width: 40,
    //   height: 40,
    //   borderColor: 'black',
    //   borderRadius: 20,
    // },
    // giveUpTxt: {
    //   textAlign: 'center',
    //   alignItems: 'center',
    //   fontSize: (state.giveUpsLeft === 0 || state.topWord !== '') ? 30 : 35,
    //   width: '100%',
    //   height: '100%',
    // },

  });

  // find out how divByMatra should work
  const matras = ['w', 'i', 'I', 'u', 'U', 'y', 'Y', 'o', 'O', 'M', 'N', '`', '~', 'Í', 'R', 'H'];
  const divByMatra = (word) => {
    let newWord = '';
    // while loop for the following logic
    // if the word has a matra, then split the word at the matra and add a space after the matra
    // if the word does not have a matra, then add a space after the word
    while (word.length > 0) {
      if (matras.includes(word[0])) {
        newWord += word[0];
        if (word.length > 1 && matras.includes(word[1])) {
          newWord += word[1];
          word = word.slice(1);
        }
        if (word[0] !== 'i') {
          newWord += ',';
        }
      } else {
        newWord += word[0];
        if (word.length > 1 && (!matras.includes(word[1]) || word[1] === 'i')) {
          newWord += ',';
        }
      }
      word = word.slice(1);
    }

    // for (let i = 0; i < (word.length); i += 0) {
    //   console.log(i,word[i]);
    //   if (!matras.includes(word[i])) {
    //     if (i + 1 !== word.length && matras.includes(word[i + 1]) && word[i + 1] !== 'i') {
    //       newWord += `${word[i]}${word[i + 1]},`;
    //       i += 2;
    //     } else {
    //       newWord += `${word[i]}`;
    //       if (i+1 !== word.length) {
    //         newWord += ',';
    //       }
    //       i+=1;
    //     }
    //   } else {
    //     if (word[i]=='i') {
    //       if (i+1 < word.length) {
    //         newWord += `${word[i]}${word[i + 1]},`;
    //         i += 2;
    //       } else {
    //         newWord += `${word[i]}`;
    //         i += 1;
    //       }
    //     }
    //   }
    // }
    if (newWord[newWord.length - 1] === ',') {
      newWord = newWord.slice(0, -1);
    }
    newWord = newWord.replace(',undefined', '');
    return newWord.split(',');
  };

  const awayOrTogether = (which) => {
    let printed = '';
    if (which === 'top') {
      printed = (state.topWord === '') ? state.topHint : state.topWord;
    } else {
      printed = (state.bottomWord === '') ? state.bottomHint : state.bottomWord;
    }
    printed = divByMatra(printed);
    const newArray = divByMatra((which === 'top') ? state.firstWord.engText : state.secondWord.engText);
    const numOfLetters = newArray.length;
    const fontsize = (numOfLetters > 5) ? width*0.05 : width*0.07;
    const newsize = (numOfLetters > 5) ? width*0.075 : width*0.095;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {Array.from(newArray, (e, i) => {
          return (
            <View
              key={`${printed[i]}-${which}${i}}`}
              style={{
                borderRadius: 10, backgroundColor: '#ffe0bf', textAlign: 'center', justifyContent: 'center', marginHorizontal: 5
              }}
            >
              <Text style={{
                ...styles.answerText, width: newsize, height: newsize, fontSize: fontsize
              }}
              >
                {printed[i]}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (wordType === 'top') {
    return (
      <View
        style={styles.wordBox}
      >
        <View style={{ flexDirection: 'column', width: '100%', justifyContent:'space-evenly' }}>
          <TouchableOpacity onPress={() => { dispatch(setAttempt((state.topWord === '') ? state.topHint : state.topWord)); }} style={styles.answerTouchOpacity}>
            {awayOrTogether('top')}
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.definitionText}>
              {state.firstWord.meaning}
            </Text>
          </View>
        </View>
      </View>
    );
  } if (wordType === 'bottom') {
    return (
      <View style={styles.wordBox}>
        <View style={{ flexDirection: 'column', width: '100%', justifyContent:'space-evenly' }}>
          {/* {Array.from(Array(state.secondWord.engText.length), (e,i) => {
                  return {<Text style={styles.answerText}>
                  {Anvaad.unicode(state.bottomWord[i])}
                  </Text>}
                })} */}
          <TouchableOpacity onPress={() => { dispatch(setAttempt((state.bottomWord === '') ? state.bottomHint : state.bottomWord)); }} style={styles.answerTouchOpacity}>
            {awayOrTogether('bottom')}
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.definitionText}>
              {state.secondWord.meaning}
            </Text>
          </View>
        </View>
      </View>
    );
  }

};
