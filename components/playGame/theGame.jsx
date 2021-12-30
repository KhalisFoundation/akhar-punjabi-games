/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import * as Anvaad from 'anvaad-js';
import {
  View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, ScrollView, Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TheCircle from './circleForGame';
import WordsDoneModal from './modalNextWord';
import AntIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "react-native-elements";
import { Animated } from "react-native";

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
  let screenHeight = Dimensions.get('window').height;
  let screenWidth = Dimensions.get('window').width;
  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      backgroundColor: colors.theGame.container,
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      marginTop: 5,
    },
    backButton: {
      flex: 1,
    },
    backArrow: {
      width: 50,
      height: 50,
    },
    title: {
      fontSize: 25,
      flex: 1,
      textShadowRadius: 5,
      textShadowColor: 'white',
      fontWeight: 'bold',
      textShadowOffset: {width: 1.5, height: 1},
      bottom: 10,
      // right: 20,
    },

    info: {
      flexDirection: 'row',
    },
    infoRow: {
      marginHorizontal: 10,
      marginVertical: 5,
      padding: 5,
      borderRadius: 20,
      backgroundColor: colors.theGame.levelDisplay,
      flex: 1,
      textAlign: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    wordBoxAnswers: {
      // flexDirection: "column",
      width: 400,
      height: 200,
      backgroundColor: colors.theGame.wordBoxAnswers,
      borderRadius: 20,
      shadowColor: "#000",
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
    hint: {
      flex: 1,
      marginLeft: 10,
      color: 'white',
    },
    wordBoxText: {
      flex: 3,
      flexDirection: 'column',
      width: 250,
      height: 100,
    },
    answerText: {
      justifyContent:'center',
      textAlign: 'center',
      color:'black',
      fontSize: 35,
      backgroundColor: colors.theGame.wordBoxText,
      borderRadius: 20,
      width: 250,
      height: 50
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
      shadowColor: "#000",
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
      borderRadius: 20,
      justifyContent:'center',
      textAlign:'center',
      fontSize: 30,
    },
    clearBox: {
      width: 50,
      height: 50,
      backgroundColor: colors.theGame.clearBox,
      borderRadius: 20,
      justifyContent:'center',
    },
    clearBoxText: {
      textAlignVertical: 'center',
      textAlign:'center',
      justifyContent:'center',
    },
    theCircle: {},
    definitionText: {
      color: 'white',
    },
  });
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

  return (
    <View
      style={styles.container}
    >
      <StatusBar
          backgroundColor={
            'black'
          }
          barStyle={"light-content"}
        />
      <Header
          backgroundColor={
            "cyan"
          }
          containerStyle={[
            Platform.OS === "android" && { height: 56, paddingTop: 10 }
          ]}
          leftComponent={
            <AntIcon
              name="arrow-back"
              color={
                'black'
              }
              size={30}
              onPress={() => {navigation.navigate('Home');}}
            />
          }
          centerComponent={{
            text: "ਅਖਰ ਜੋੜੋ",
            style: styles.title
          }}
        />

      {state.nextLevelModal[0] ? <WordsDoneModal /> : <View />}
      <View style={styles.info}>
        <View style={styles.infoRow}>
          <Text>
          <Text style={{fontWeight: 'bold'}}>Word Type:</Text>
            {' '}
            {state.typesOfWords}
          </Text>
          <Text>
          <Text style={{fontWeight: 'bold'}}>Give Ups left:</Text>
            {' '}
            {state.giveUpsLeft}
          </Text>
          <Text>
          <Text style={{fontWeight: 'bold'}}>Current Level:</Text>
            {' '}
            {state.levelProgress[0].level}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Words Needed for next level:</Text>
            {' '}
            {state.levelProgress[0].wordsNeeded}
          </Text>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Total Points:</Text>
            {' '}
            {state.totalPoints}
          </Text>
        </View>
      </View>

      <AnimatedLinearGradient
        colors={["#9B0000", "#160040"]}
        start={{ x: 0.5, y: 0.0 }}
        style={styles.wordBoxAnswers}>
        <View style={styles.answerRow}>
          <Text style={styles.hint}>
          <Text style={{fontWeight: 'bold'}}>Length of Word:</Text>
          {' '}
          {state.firstWord.engText.length}
          </Text>
          <View style={styles.wordBoxText}>
            <Text style={styles.answerText}>{Anvaad.unicode(state.topWord)}</Text>
            <ScrollView 
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              horizontal>
                <Text style={styles.definitionText}>
                  {state.firstWord.meaning}
                </Text>
            </ScrollView>
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
                dispatch(setNewWords());
              }
            }}
          >
            <Icon name="questioncircleo" size={25} color='black' style={styles.giveUpTxt}/>
          </TouchableOpacity>
        </View>
        <View style={styles.answerRow}>
          <Text style={styles.hint}>
          <Text style={{fontWeight: 'bold'}}>Length of Word:</Text>
          {' '}
          {state.secondWord.engText.length}
          </Text>
          <View style={styles.wordBoxText}>
            <Text style={styles.answerText}>{Anvaad.unicode(state.bottomWord)}</Text>
            <ScrollView 
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              horizontal>
                <Text style={styles.definitionText}>
                  {state.secondWord.meaning}
                </Text>
            </ScrollView>
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
                dispatch(setNewWords());
              }
            }}
          >
            <Icon name="questioncircleo" size={45} color='black' style={styles.giveUpTxt}/>
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
          <Icon name='reload1' size={25} color='black' style={styles.clearBoxText} />
        </TouchableOpacity>
      </View>

      <TheCircle style={styles.theCircle} />
    </View>
  );
}

export default GameScreen;
