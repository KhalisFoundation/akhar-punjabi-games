import * as React from 'react';
import {
    View, TouchableOpacity, StyleSheet, Text, ScrollView, Animated, Dimensions
} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import * as Anvaad from 'anvaad-js';
import { useFonts } from 'expo-font';
import { HintButton } from '.';
import dimensions from "../../util/dimensions";
import { setBottomHint, setGivenUpWords, setNewWords, setTopHint, setTopWord, setCorrectWords, setLevelProgress, setBottomWord, setAttempt, setGiveUpLives } from './../../redux/actions';


export const WordBox = ({ wordType }) => {
    const state = useSelector((theState) => theState.theGameReducer);
    const dispatch = useDispatch();
    const screenWidth = Dimensions.get('window').width;
    
    const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
    const [fontsLoaded] = useFonts({
      Arial: require('../../assets/fonts/Arial.ttf'),
      GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
      Bookish: require('../../assets/fonts/Bookish.ttf'),
      Mochy: require('../../assets/fonts/Mochy.ttf'),
      Muli: require('../../assets/fonts/Muli.ttf'),
      Prabhki: require('../../assets/fonts/Prabhki.ttf')
    });

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
        width: screenWidth,
        marginBottom: 25
    };

    const styles = StyleSheet.create({
        wordBox: {
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          width:'100%', 
          alignSelf: 'center',
          margin: 5,
          padding:5
        },
        answerText: {
          textAlign: 'center',
          color: '#7a3e00',
          fontSize: dimensions.size['12'],
          borderRadius: 20,
          height: dimensions.size['20'],
          fontFamily: 'Prabhki'
        },
        answerTouchOpacity: {
          justifyContent: 'center',
          height: dimensions.size['20'],
          width: "100%",
          marginBottom: dimensions.size['2'],
        },
        definitionText: {
          fontFamily: 'Muli',
          fontSize: dimensions.size['6'],
          marginBottom: 5,
          textShadowColor: 'black',
          textShadowOffset: {
            width: 0.5,
            height: 0.5
          },
          textShadowRadius: 1,
          color: "#fff",
        },
        giveUp: {
          marginRight: 5,
          marginTop: 5,
          alignSelf: 'center',
          backgroundColor: "orange",
          opacity: 1,
          width: 40,
          height: 40,
          borderColor: 'black',
          borderRadius: 20,
        },
        giveUpTxt: {
          textAlign: 'center',
          alignItems: 'center',
          fontSize: (state.giveUpsLeft === 0 || state.topWord !== '') ? 30 : 35,
          width: '100%',
          height: '100%',
        },
    
    });

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
    
      const awayOrTogether = (which) => {
        let printed = '';
        if (which === 'top') {
          printed = (state.topWord === '') ? state.topHint : state.topWord;
        } else {
          printed = (state.bottomWord === '') ? state.bottomHint : state.bottomWord;
        }
        printed = divByMatra(printed);
        let newArray = divByMatra((which === 'top') ? state.firstWord.engText : state.secondWord.engText);
        let numOfLetters = newArray.length;
        let fontsize = (numOfLetters > 5) ? 25 : 35;
        let newsize = (numOfLetters > 5) ? 40 : 50;
        return (
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {Array.from(newArray , (e, i) => {
              return (
                <View style={{borderRadius: 10, backgroundColor: '#ffe0bf', textAlign: 'center', justifyContent:'center', marginHorizontal:5}}>
                  <Text style={{ ...styles.answerText, width: newsize, height: newsize, fontSize: fontsize }} >
                    {Anvaad.unicode(printed[i])}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      };
    
    if (wordType === 'top') {
    return (<View
              style={styles.wordBox}>
        <View style={{flexDirection: 'column', width: "100%"}}>
        <TouchableOpacity onPress={() => { dispatch(setAttempt((state.topWord === '') ? state.topHint : state.topWord)); }} style={styles.answerTouchOpacity}>
            {awayOrTogether('top')}
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.definitionText}>
            {state.firstWord.meaning}
            </Text>
            </View>
        </View>
    </View>
    )
    } else if (wordType === 'bottom') {
        return (<View style={styles.wordBox}>
          <View style={{flexDirection: 'column', width: "100%"}}>
              {/* {Array.from(Array(state.secondWord.engText.length), (e,i) => {
                  return {<Text style={styles.answerText}>
                  {Anvaad.unicode(state.bottomWord[i])}
                  </Text>}
                })} */}
              <TouchableOpacity onPress={() => { dispatch(setAttempt((state.bottomWord === '') ? state.bottomHint : state.bottomWord)); }} style={styles.answerTouchOpacity}>
                {awayOrTogether('bottom')}
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.definitionText}>
                {state.secondWord.meaning}
              </Text>
              </View>
          </View>
        </View>
        );
    }

};
