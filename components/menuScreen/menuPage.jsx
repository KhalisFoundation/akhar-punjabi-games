/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  StatusBar,
  Image,
  ImageBackground,
  BackHandler, 
  Alert, AppState
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { setTheState, showIntroModal } from '../../redux/actions';
import * as Anvaad from 'anvaad-js';
import Khalis from '../../assets/khalis_logo.svg';
import Logo from '../../assets/sikh_games_logo_with_text.svg';
import { initialState } from '../../redux/reducers';
import { Audio } from 'expo-av';
import * as Analytics from 'expo-firebase-analytics';
import AppIntro from './../about/appIntro';
import { closeIntroModal } from './../../redux/actions';
import { SafeAreaView } from 'react-native-safe-area-context';

const audioPlayer = new Audio.Sound();

function MenuScreen({ navigation }) {

  // code for menu page
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);
  const [fontLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
  });
  
  // async function playSound() {
  //   try {
  //     console.log('Playing sound');
  //     await audioPlayer.loadAsync(require("../../assets/simran.mp3"));
  //     await audioPlayer.playAsync();
  //     await audioPlayer.setIsLoopingAsync(true);
  //   } catch (err) {
  //     console.warn("Couldn't Play audio", err)
  //   }
  // }
  // async function stopSound() {
  //   try {
  //     if (audioPlayer) {
  //       console.log('Stopping Sound');
  //       await audioPlayer.stopAsync();
  //       await audioPlayer.unloadAsync();
  //     }
  //   } catch (err) {
  //     console.warn("Couldn't Stop audio", err)
  //   }
  // }

  // // useEffect(() => {
  // //     playSound();
  // // }, []);
  
  //handling app state change
  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);
  
  // const _handleAppStateChange = nextAppState => {
  //   if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
  //     console.log('App has come to the foreground!');
  //   } else {
  //     console.log('App is in the background!');
  //     if (audioPlayer._loaded) {stopSound()};
  //   }

  //   appState.current = nextAppState;
  //   setAppStateVisible(appState.current);
  // };

  // useEffect(() => {
  //   const subscription = AppState.addEventListener("change", _handleAppStateChange);
  //   return () => {
  //     if (subscription) {
  //       subscription.remove();
  //     }
  //   };
  // }, []);
  
  // console.log(theColors[state.darkMode]);
  // console.log(state.darkMode);
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 10,
      backgroundColor: "#274C7C",
    },
    header: {
      width:'100%',
      textAlign: 'center',
    },
    mainmenu: {
      color: '#fff',
      fontSize: 25,
      fontFamily: 'Muli',
      textAlign: 'center',
      justifyContent: 'center',
    },
    mainMenuContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#00E9FE', 
      borderBottomWidth: 1
    },
    text: {color:'#fff', fontSize: 20, fontFamily: 'Muli', alignSelf:'center', margin: 10},
    item: {backgroundColor: '#FF7E00', borderRadius: 10, margin: 10, width: '75%'},
    menulogo: {
      width: '80%',
      resizeMode: 'contain',
      alignSelf: 'center', 
      height: '50%',
    },
    columns: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    rows: {
      flexDirection: 'row',
      // backgroundColor: "yellow",
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    otherScreenTouchableOpacity: {
      flex: 1,
      margin: 10,
    },
    khalisTouchableOpacity: {
      height: '8%',
      width: '45%',
    },
    khalis: {
      height: '100%',
      width: '100%',
      borderRadius: 5,
      alignItems: 'center',
    },
    logo: {
        height: 70,
        width: 70,
        alignSelf: 'center',
    },
    title: {
        fontFamily: 'Mochy', fontWeight: 'normal', fontSize: 20, alignSelf: 'center'
    }
  });
  async function whichGame(game_name) {
    await Analytics.logEvent('game_chosen', { game_name: game_name });
  }

  if (!fontLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {state.showIntroModal ? <AppIntro /> : null}
      <StatusBar
        hidden />
      <View style={styles.header}>
        <Logo style={styles.menulogo}/>
        <View style={styles.mainMenuContainer}>
        <Text style={styles.mainmenu}>MAIN MENU</Text>
        <TouchableOpacity onPress={()=> {dispatch(showIntroModal())}} style={{margin: 5}}>
          <Icon name='info-circle' color={"#7FC8DE"} size={22} />
        </TouchableOpacity></View>
        <Text style={styles.text}>Select a game to Play</Text>
        <View style={styles.columns}>
          <TouchableOpacity 
            style={styles.item}
            onPress={() => {
              // if (audioPlayer._loaded) {stopSound()};
              whichGame('akhar_jor');
              navigation.navigate('AkharJor');
            }}
          >
            <Text style={[styles.text]}>Gurmukhi Wordlink</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.columns}>
          <TouchableOpacity 
            style={styles.item}
            onPress={() => {
              //if (audioPlayer._loaded) {stopSound()};
              whichGame('2048');
              navigation.navigate('2048');              
            }}
          >
            <Text style={[styles.text, {fontFamily: 'Muli'}]}>2048</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.khalisTouchableOpacity}
        onPress={() => Linking.openURL('https://khalisfoundation.org')}
      >
        <Khalis/>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default MenuScreen;
