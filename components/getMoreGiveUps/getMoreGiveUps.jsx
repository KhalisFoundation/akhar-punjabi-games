/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as anvaad from 'anvaad-js';
import { setGiveUpLives } from '../../redux/actions';

import theColors from '../../util/colors';

function MoreGiveUps({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();

  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: "center",
      backgroundColor: colors.getMoreGiveUps.container,
      width: '100%',
      height: '100%',
      paddingTop: '10%',
    },
    header: {
      flexDirection: 'row',
    },
    backButton: {
      flex: 1,
    },
    backArrow: {
      width: 50,
      height: 50,
    },
    title: {
      fontSize: 30,
      flex: 3,
      right: 20,
    },
    giveUpLivesText: {
      backgroundColor: 'white',
      fontSize: 20,
      borderRadius: 100,
    },
    instructionsText: {
      backgroundColor: 'yellow',
      fontSize: 25,
      textAlign: 'center',
    },
    DHAN: {
      padding: 20,
      fontSize: 30,
      backgroundColor: 'blue',
    },
    inputBox: {
      padding: 20,
    },
    textInputGurmukhi: {
      fontSize: 25,
      // backgroundColor: colors.getMoreGiveUps.textInputGurmukhi,
      backgroundColor: 'yellow',
    },
    textInput: {
      fontSize: 15,
      backgroundColor: colors.getMoreGiveUps.textInput,
    },
    submitButton: {
      backgroundColor: 'yellow',
    },
  });

  const wordsToType = [
    'vwhigurU',
    'DMn gurU nwnk dyv swihb jI',
    'DMn gurU AMgd swihb jI',
    'DMn gurU Amr dws swihb jI',
    'DMn gurU rwm dws swihb jI',
    'DMn gurU ArjMn dyv swihb jI',
    'DMn gurU hrgoibMd swihb jI',
    'DMn gurU hrrwie swihb jI',
    'DMn gurU hrikRSn swihb jI',
    'DMn gurU qygbhwdr swihb jI',
    'DMn gurU goibMd isMG swihb jI',
    'DMn gurU DMn gurU ipAwry',
  ];
  const getRandomWord = () => {
    return wordsToType[Math.floor(Math.random() * wordsToType.length)];
  };
  const [textEntry, setTextEntry] = React.useState('');
  const [theWord, setWord] = React.useState(getRandomWord());
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          title="Home"
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Image
            source={require('../../images/left_arrow.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Get More Give Ups</Text>
      </View>
      <Text style={styles.giveUpLivesText}>
        Give Up Lives:
        {' '}
        {state.giveUpsLeft}
      </Text>
      <Text style={styles.instructionsText}>
        Try to type the following to get more Give Lives. You will have to
        figure out which english letters correspond to the respective Gurmukhi
        characters
      </Text>
      <Text style={styles.DHAN}>{anvaad.unicode(theWord)}</Text>
      <View style={styles.inputBox}>
        <Text style={styles.textInputGurmukhi}>
          {anvaad.unicode(textEntry)}
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="type here"
          value={textEntry}
          onChangeText={(text) => {
            setTextEntry(text);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          if (textEntry === theWord) {
            console.log('GOood job');
            dispatch(setGiveUpLives());
            setWord(getRandomWord());
            setTextEntry('');
          }
        }}
      >
        <Text>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MoreGiveUps;
