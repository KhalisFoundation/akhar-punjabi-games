/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View, StyleSheet, Modal, Text, TouchableOpacity, Animated, ImageBackground, Image
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';

import { closeNextLevelModal } from '../../redux/actions';

import { LinearGradient } from "expo-linear-gradient";

import theColors from '../../util/colors';

function WordsDoneModal() {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();

  let colors;
  if (state === undefined) {
    colors = theColors.false;
  } else {
    colors = theColors[state.darkMode];
  }

  const styles = StyleSheet.create({
    container: {
      width: 300,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      padding: 10,
    },
    wordBox: {
      backgroundColor: colors.modalNextWord.wordBox,
      borderRadius: 14,
      margin: 10,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    wordDoneText: {
      fontSize: 18,
      textAlign: 'left',
      fontWeight: 'bold',
    },
    meaningText: {
      fontSize: 16,
      fontStyle: 'italic',
      textAlign:'right',
    },
    continue: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    continueText: {
      textAlign: 'center',
      fontSize: 15,
      margin: 'auto',
      textAlign: 'left',
      fontStyle: 'italic',
      fontWeight: 'bold'
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
  });
  const getRandomNum = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const nowWow = getRandomNum(0,4);
  console.log(nowWow);
  const wows = {
    0: require('../../images/wow1.png'),
    1: require('../../images/wow2.png'),
    2: require('../../images/wow3.png'),
    3: require('../../images/wow4.png'),
    4: require('../../images/wow5.png'),
  }
  const doneYet = Math.floor((10-state.levelProgress[0].wordsNeeded)/2);
  const stage = {
    0: require('../../images/stage1.png'),
    1: require('../../images/stage2.png'),
    2: require('../../images/stage3.png'),
    3: require('../../images/stage4.png'),
    4: require('../../images/stage5.png')
  }
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
  return (
    <Modal
      visible={state.nextLevelModal[0]}
      animationType="slide"
      transparent
      onRequestClose={() => dispatch(closeNextLevelModal())}
    >
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <ImageBackground source={require('../../images/word_modal.png')} resizeMode='cover' imageStyle={{ borderRadius: 30}} style={{width:"100%", alignItems: 'center', justifyContent: 'flex-start'}}>
        <Image source={wows[nowWow]} style={{transform: [{ scale: 0.55 }], height:150}}/>
        <Image source={stage[doneYet]} style={{margin:5, transform: [{ scale: 0.75 }], top: -50}}/>
        <AnimatedLinearGradient
          colors={state.darkMode ? ["#2F0743","#6f0000"] : ["#cb3066", "#F2994A"]}
          start={{ x: 1, y: 1 }}
          style={[styles.container, {bottom:10}]}>
            <AnimatedLinearGradient
            colors={state.darkMode ? ["#F7971E", "#FFD200"] : ["#904e95","#e96443"]}
            start={{ x: 1, y: 1 }}
            style={styles.wordBox}>
              <Text style={styles.wordDoneText}>
                {state.nextLevelModal[1].punjabiText}
              </Text>
              <Text style={styles.meaningText}>
                {state.nextLevelModal[1].meaning}
              </Text>
            </AnimatedLinearGradient>
            <AnimatedLinearGradient
            colors={state.darkMode ? ["#F7971E", "#FFD200"] : ["#904e95","#e96443"]}
            start={{ x: 1, y: 1 }}
            style={styles.wordBox}>
              <Text style={styles.wordDoneText}>
                {state.nextLevelModal[2].punjabiText}
              </Text>
              <Text style={styles.meaningText}>
                {state.nextLevelModal[2].meaning}
              </Text>
            </AnimatedLinearGradient>
          <TouchableOpacity
            style={styles.continue}
            onPress={() => dispatch(closeNextLevelModal())}
          >
            <AnimatedLinearGradient
              colors={["#f0cb35","#ed8f03"]}
              start={{ x: .9, y: 1.5 }}
              style={styles.wordBox}>
              <Text style={styles.continueText}>Continue &rarr;</Text>
            </AnimatedLinearGradient>
          </TouchableOpacity>
        </AnimatedLinearGradient>
        </ImageBackground>
      </View>
    </Modal>
  );
}

export default WordsDoneModal;
