import * as React from 'react';
import {
    View, TouchableOpacity, StyleSheet, Text, ScrollView, Animated, Dimensions
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import * as Anvaad from 'anvaad-js';
import * as Analytics from 'expo-firebase-analytics';
import { setBottomHint, setGivenUpWords, setNewWords, setTopHint, setTopWord, setCorrectWords, setLevelProgress, setBottomWord, setAttempt, setGiveUpLives } from './../../redux/actions';


export const HintButton = ({wordType}) => {
    const state = useSelector((theState) => theState.theGameReducer);
    const dispatch = useDispatch();
    const screenWidth = Dimensions.get('window').width;

    const styles = StyleSheet.create({
        giveUp: {
            marginRight: 5,
            marginTop: 5,
            alignSelf: 'center',
            backgroundColor: state.darkMode ? "#ff7b00" : "orange",
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
    
    async function hint_used(the_word, eng_text) {
        await Analytics.logEvent('hint_used', { word: the_word, eng: eng_text });
    }

    async function given_up_word(the_word, eng_text) {
        await Analytics.logEvent('given_up_word', { word: the_word, eng: eng_text });
    }

    async function ran_out_of_lives(level) {
        await Analytics.logEvent('ran_out_of_lives', { level_at: level });
    }
    
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

    if (wordType === "top") {
        return (<TouchableOpacity
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
            given_up_word(state.firstWord.punjabiText, state.firstWord.engText);
            if (state.bottomWord !== '') {
            dispatch(setNewWords());
            }
        } else {
            hint_used(state.firstWord.punjabiText, state.firstWord.engText);
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
    </TouchableOpacity>)
    } else if (wordType === 'bottom') {
        return (<TouchableOpacity
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
                given_up_word(state.secondWord.punjabiText, state.secondWord.engText);
                if (state.topWord !== '') {
                  dispatch(setNewWords());
                }
              } else {
                hint_used(state.secondWord.punjabiText, state.secondWord.engText);
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
          </TouchableOpacity>)
    }
}