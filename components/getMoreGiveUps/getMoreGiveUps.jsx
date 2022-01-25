/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  Animated,
  Platform
} from 'react-native';
import { Header } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import GLOBAL from '../../util/globals';
import { setGiveUpLives } from '../../redux/actions';
import theColors from '../../util/colors';

function MoreGiveUps({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
  });

  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.getMoreGiveUps.container,
      height: '100%',
      width: '100%',
    },
    instructionsText: {
      backgroundColor: 'white',
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 1,
      marginHorizontal: 5,
      fontSize: 18,
      padding: 5,
      textAlign: 'center',
      marginVertical: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    infoText: {
      marginHorizontal: 5,
      fontSize: 15,
      color: state.darkMode ? '#fff' : '#000',
      padding: 5,
      textAlign: 'center',
      marginVertical: 5,
    },
    DHANcover: {
      height: 70,
      width: '100%',
      elevation: 5,
      justifyContent: 'center',
      backgroundColor: state.darkMode ? '#000' : '#fff',
      borderRadius: 20,
    },
    DHAN: {
      height: 100,
      textAlign: 'center',
      padding: 5,
      fontSize: 30,
      textShadowRadius: 10,
      fontFamily: 'Bookish'
    },
    inputBox: {
      padding: 10,
      width: '100%',
    },
    textInput: {
      marginTop: 10,
      marginBottom: 5,
      marginHorizontal: 10,
      fontSize: 15,
      backgroundColor: colors.getMoreGiveUps.textInput,
      borderRadius: 20,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    submitButton: {
      alignItems: 'center',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    submit: {
      fontSize: 16,
      alignSelf: 'center',
      padding: 10,
      color: state.darkMode ? 'black' : 'white',
    },
    upBox: {
      backgroundColor: '#072227',
      flexDirection: 'row',
      height: 40,
      width: 100,
      alignItems: 'center',
      borderRadius: 30,
      margin: 10,
      elevation: 5,
      justifyContent: 'space-between',
      paddingHorizontal: 10
    },
    upText: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold'
    }
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
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
      />
      <Header
        backgroundColor={
            GLOBAL.COLOR.TOOLBAR_COLOR_ALT
          }
        containerStyle={[
          Platform.OS === 'android' && { height: 56, paddingTop: 10 }
        ]}
        leftComponent={(
          <Icon
            name="arrow-back"
            color="black"
            size={30}
            onPress={() => { navigation.goBack(null); }}
          />
          )}
        centerComponent={{
          text: 'Get More Lives',
          style: {
            color: 'black',
            fontSize: 18,
            fontFamily: 'Arial'
          }
        }}
      />
      <View
        style={styles.upBox}
      >
        <IconM
          name="lightbulb-on"
          size={25}
          color="orange"
        />
        <Text style={[styles.upText, { color: 'cyan' }]}>{state.giveUpsLeft}</Text>
      </View>
      <Text style={styles.instructionsText}>
        Try to type the following to get more Lives.
      </Text>
      <Text style={[{ fontSize: 10 }, styles.infoText]}>
        {'{'}
        You will have to figure out which english letters correspond to the
        respective Gurmukhi characters
        {'}'}
      </Text>
      <View style={styles.DHANcover}>
        <MaskedView
          style={{ height: 50, width: '100%' }}
          maskElement={(
            <View
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <Text style={styles.DHAN}>{theWord}</Text>
            </View>
          )}
        >
          <LinearGradient
            colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </View>
      <View style={styles.inputBox}>
        <View style={{ ...styles.DHANcover, backgroundColor: state.darkMode ? '#fff' : '#000' }}>
          <MaskedView
            style={{ height: 50, width: '100%' }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                }}
              >
                <Text style={{ ...styles.DHAN, fontFamily: 'GurbaniHeavy' }}>
                  {textEntry}
                </Text>
              </View>
          )}
          >
            <LinearGradient
              colors={state.darkMode ? ['#FF0076', '#590FB7'] : ['#ff8008', '#ffc837']}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </View>
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
            dispatch(setGiveUpLives('+'));
            setWord(getRandomWord());
            setTextEntry('');
          }
        }}
      >
        <AnimatedLinearGradient colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']} style={styles.submitButton}>
          <Text style={{ ...styles.submit, fontFamily: 'Mochy' }}>Submit</Text>
        </AnimatedLinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default MoreGiveUps;
