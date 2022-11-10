import * as React from 'react';
import {
    View, TouchableOpacity, StyleSheet, Text, ScrollView, Animated
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import * as Anvaad from 'anvaad-js';
import * as Analytics from 'expo-firebase-analytics';
import dimensions from '../../util/dimensions';
import { setBottomHint, setGivenUpWords, setNewWords, setTopHint, setTopWord, setCorrectWords, setLevelProgress, setBottomWord, setAttempt, setGiveUpLives, setConfetti } from './../../redux/actions';


export const HintButton = ({wordType}) => {
    const state = useSelector((theState) => theState.theGameReducer);
    const dispatch = useDispatch();
    const width = dimensions.width;

    const styles = StyleSheet.create({
        giveUp: {
            marginRight: 5,
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: "orange",
            opacity: 1,
            width: width*0.1,
            height: width*0.1,
            borderRadius: 10,
          },
          giveUpTxt: {
            textAlign: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            fontSize: width*0.08,
            width: '100%',
            margin: 'auto'
          },
    });
    
    async function hint_used(the_word, eng_text) {
        await Analytics.logEvent('hint_used', { the_word: the_word, eng_text: eng_text });
    }

    async function given_up_word(the_word, eng_text) {
        await Analytics.logEvent('given_up_word', { the_word: the_word, eng_text: eng_text });
    }
    const hintBtn = (word) => {
      let bgColor;
      let iconColor;
      let iconName;
      if (state.giveUpsLeft === 0) {
        bgColor = '#919191';
        iconColor = 'white';
        iconName = 'lightbulb-on';
        if (word !== '') {
          bgColor = '#06FF00';
          iconColor = 'black';
          iconName = 'check';
        }
      } else if (word !== '') {
          bgColor = '#06FF00';
          iconColor = 'black';
          iconName = 'check';
      } else {
        bgColor = 'transparent';
        iconColor = 'orange';
        iconName = 'lightbulb-on';
      }
  
      return (
        {
          backgroundColor: bgColor,
          color: iconColor,
          name: iconName,
        }
      );
    };

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    // pulse the bulb icon every 30 seconds to get the user's attention
    if (state.topWord != "" && state.bottomWord != "") {
      return null;
    }
    if (wordType === "top") {
        return (<TouchableOpacity
        disabled={state.giveUpsLeft === 0 || state.topWord !== ''}
        style={{ ...styles.giveUp, backgroundColor: hintBtn(state.topWord).backgroundColor }}
        onPress={async () => {
        const newTopLength = state.topHint.length;
        const hT = (state.topHint + state.firstWord.engText[newTopLength]).toString();
        dispatch(setTopHint(hT));
        dispatch(setGiveUpLives('-'));
        if (newTopLength === (state.firstLength - 1)) {
            given_up_word(state.firstWord.punjabiText, state.firstWord.engText);
            dispatch(setTopWord());
            dispatch(setGivenUpWords(state.firstWord));
            if (state.bottomWord !== '') {
              // time delay for 1500 seconds
              dispatch(setConfetti(true));
              await delay(3000);
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
          color={hintBtn(state.topWord).color}
          style={styles.giveUpTxt}
        />
    </TouchableOpacity>)
    } else if (wordType === 'bottom') {
        return (<TouchableOpacity
            disabled={state.giveUpsLeft === 0 || state.bottomWord !== ''}
            style={{ ...styles.giveUp, backgroundColor: hintBtn(state.bottomWord).backgroundColor }}
            onPress={async () => {
              const newBottomLength = state.bottomHint.length;
              const hB = (state.bottomHint + state.secondWord.engText[newBottomLength]).toString();
              dispatch(setBottomHint(hB));
              dispatch(setGiveUpLives('-'));
              if (newBottomLength === (state.secondLength - 1)) {
                given_up_word(state.secondWord.punjabiText, state.secondWord.engText);
                dispatch(setBottomWord());
                dispatch(setGivenUpWords(state.secondWord));
                if (state.topWord !== '') {
                  // time delay for 1500 seconds
                  dispatch(setConfetti(true));
                  await delay(3000);
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
              color={hintBtn(state.bottomWord).color}
              style={styles.giveUpTxt}
            />
          </TouchableOpacity>)
    }
}