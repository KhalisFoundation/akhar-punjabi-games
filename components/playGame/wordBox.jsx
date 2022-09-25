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
import * as Analytics from 'expo-firebase-analytics';
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
          borderRadius: 100,
          margin: 5,
          padding:5
        },
        answerText: {
          textAlign: 'center',
          color: state.showNumOfLetters ? 'black' : state.darkMode ? 'white' : 'black',
          fontSize: dimensions.size['12'],
          borderRadius: 50,
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
          textShadowColor: (state.darkMode) ? 'white' : 'black',
          textShadowOffset: {
            width: 0.5,
            height: 0.5
          },
          textShadowRadius: 1,
          color: (state.darkMode) ? 'white' : 'black',
        },
        giveUp: {
          marginRight: 5,
          marginTop: 5,
          alignSelf: 'center',
          backgroundColor: state.darkMode ? "#ff7b00" : "orange",
          opacity: 1,
          width: 40,
          height: 40,
          borderColor: state.darkMode ? 'white' : 'black',
          borderRadius: 50,
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
        if (state.includeMatra) {
          printed = divByMatra(printed);
        }
        if (state.showNumOfLetters) {
          let newArray = state.includeMatra ? 
            divByMatra((which === 'top') ? state.firstWord.engText : state.secondWord.engText)
          : Array((which === 'top') ? state.firstWord.engText.length : state.secondWord.engText.length);
          let numOfLetters = newArray.length;
          let fontsize = (numOfLetters > 5) ? 25 : 35;
          let newsize = (numOfLetters > 5) ? 40 : 50;
          return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {Array.from(newArray , (e, i) => {
                return (
                  <View style={{borderRadius: 100, backgroundColor: '#fff', textAlign: 'center', justifyContent:'center',}}>
                    <Text style={{ ...styles.answerText, width: newsize, height: newsize, fontSize: fontsize }} >
                      {Anvaad.unicode(printed[i])}
                    </Text>
                  </View>
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
    
    if (wordType === 'top') {
    return (<LinearGradient
              colors={state.darkMode ? ['transparent', '#fff9'] : ['#fff1', '#5fdeff', '#00bcff']} 
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.wordBox}>
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
        <HintButton wordType={wordType} />
    </LinearGradient>
    )
    } else if (wordType === 'bottom') {
        return (<LinearGradient
                colors={state.darkMode ? ['transparent', '#fff9'] : ['#fff1', '#5fdeff', '#00bcff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.wordBox}>
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
          <HintButton wordType={wordType} />
        </LinearGradient>
        );
    }

};
