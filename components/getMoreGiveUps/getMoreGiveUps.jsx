/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
} from 'react-native';
import { Header } from "react-native-elements";
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as anvaad from 'anvaad-js';
import { setGiveUpLives } from '../../redux/actions';
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import GLOBAL from '../../util/globals';
import theColors from '../../util/colors';
import { Button } from 'react-native-elements';

function MoreGiveUps({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();

  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.getMoreGiveUps.container,
      height: '100%',
      width:'100%',
      marginTop: '3.5%',
    },
    backButton: {
      flex: 1,
    },
    backArrow: {
      width: 50,
      height: 50,
    },
    title: {
      fontSize: 32,
      flex: 3,
      fontWeight: 'bold',
      right: 20,
    },
    giveUpLivesText: {
      backgroundColor: colors.getMoreGiveUps.giveUpLivesText,
      fontSize: 16,
      borderRadius: 15,
      padding: 10,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    instructionsText: {
      backgroundColor: 'white',
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 1,
      marginHorizontal: 5,
      fontSize: 18,
      padding:5,
      textAlign: 'center',
      marginVertical: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    infoText:{
      marginHorizontal: 5,
      fontSize: 15,
      padding:5,
      textAlign: 'center',
      marginVertical: 5,
    },
    DHAN: {
      margin: 5,
      padding: 10,
      fontSize: 30,
      textAlign: 'center',
      backgroundColor: 'cyan',
      borderRadius: 20,
      textShadowRadius: 10,
      textShadowColor: 'white',
      fontWeight: 'bold',
      textShadowOffset: {width: 1, height: 1},
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    inputBox: {
      padding: 10,
      width: '100%',
    },
    textInputGurmukhi: {
      fontSize: 25,
      textAlign: 'center',
      backgroundColor: colors.getMoreGiveUps.textInputGurmukhi,
      borderColor: 'black',
      borderWidth: .5,
      borderRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    textInput: {
      marginTop: 10,
      marginBottom: 5,
      marginHorizontal: 10,
      fontSize: 15,
      backgroundColor: colors.getMoreGiveUps.textInput,
      borderRadius: 20,
      padding: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    submitButton: { 
      backgroundColor: colors.getMoreGiveUps.submitButton,
      alignItems:'center',
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    submit:{
      fontSize: 16,
      fontWeight: 'bold',
      alignSelf:'center',
      padding: 10,
      color: state.darkMode ? "white" : "black",
    },
  });
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

  const wordsToType = [
    'vwihgurU',
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
    'DMn SRI gurU gRMQ swihb jI',
    'DMn gurU DMn gurU ipAwry',
  ];
  const getRandomWord = () => {
    return wordsToType[Math.floor(Math.random() * wordsToType.length)];
  };
  const [textEntry, setTextEntry] = React.useState('');
  const [theWord, setWord] = React.useState(getRandomWord());
  return (
    <View style={styles.container}>
      <StatusBar
          backgroundColor={
            'black'
          }
          barStyle={"light-content"}
        />
      <Header
          backgroundColor={
            GLOBAL.COLOR.TOOLBAR_COLOR_ALT
          }
          containerStyle={[
            Platform.OS === "android" && { height: 56, paddingTop: 10 }
          ]}
          leftComponent={
            <Icon
              name="arrow-back"
              color={
                'black'
              }
              size={30}
              onPress={() => {navigation.navigate('Home');}}
            />
          }
          centerComponent={{
            text: "Get More Lives",
            style: {
              color: 'black',
              fontSize: 18
            }
          }}
        />
      
      <Text style={styles.giveUpLivesText}>
        Lives:
        {' '}
        {state.giveUpsLeft}
      </Text>
      <Text style={styles.instructionsText}>
        Try to type the following to get more Lives.
      </Text>
      <Text style={[{fontSize:10}, styles.infoText]}>
        {'{'}You will have to figure out which english letters correspond to the respective Gurmukhi characters{'}'}
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
            console.log('Good job');
            dispatch(setGiveUpLives());
            setWord(getRandomWord());
            setTextEntry('');
          }
        }}
      >
        
        <Text style={styles.submit}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MoreGiveUps;
