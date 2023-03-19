/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  StatusBar,
  Platform
} from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
// import { Audio } from 'expo-av';
import * as Analytics from 'expo-firebase-analytics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Khalis from '../../assets/khalis_incubator_dark.svg';
import Logo from '../../assets/akhar_logo.svg';

import dimensions from '../../util/dimensions';
import { fetchData } from '../../redux/actions';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const audioPlayer = new Audio.Sound();

function MenuScreen({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);
  const { width } = dimensions;
  const [fontsLoaded] = useFonts({
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

  // handling app state change
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

  useEffect(() => {
    dispatch(fetchData());
    // read data from firebase database
    // const dbRef = firebase.database().ref('/levels');
    // dbRef.on('value', (snapshot) => {
    //   const data = snapshot.val();
    //   if (data != null) {
    //     setLocalWords(data);
    //     Promise.all([data]).then(() => {
    //       // console.log('Data loaded from firebase: ', data);
    //       AsyncStorage.setItem('data', JSON.stringify(data));
    //       setLocalWords(data);
    //       // resolve promise of data before dispatching
    //       dispatch(setWords({levels: data}));
    //     });
    //   }
    // });
  }, []);
  // useEffect(() => {
  //   const data = AsyncStorage.getItem('data');
  //   dispatch(setWords({levels: data}));
  // }, [dispatch])

  // useEffect(() => {
  //   console.log('All words: ', state.allWords);
  // }, [dispatch]);

  // const runLoader = () => {
  //   // read data from firebase database
  //   const dbRef = ref();
  //   dbRef.on('value', (snapshot) => {
  //     const data = snapshot.val();
  //     if (data != null) {
  //       console.log('Data loaded from firebase: ', data);
  //       setLocalWords(data);
  //       AsyncStorage.setItem('data', JSON.stringify(data));
  //       dispatch(setWords(data));
  //     }
  //   });
  // };
  // const addData = async () => {
  //   try {
  //     if (AsyncStorage.getItem('data') != null) {
  //       console.log('Data already exists', AsyncStorage.getItem('data'));
  //       return;
  //     }
  //     await loadData();
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     console.log('Data loaded');
  //   }
  // };

  // console.log(theColors[state.darkMode]);
  // console.log(state.darkMode);
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 10,
      backgroundColor: '#274C7C',
    },
    header: {
      width: '100%',
      textAlign: 'center',
    },
    mainmenu: {
      color: '#fff',
      fontSize: width * 0.06,
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
    text: {
      color: '#fff', fontSize: width * 0.045, fontFamily: 'Muli', alignSelf: 'center', margin: 10
    },
    text2048: {
      color: '#fff', fontSize: width * 0.045, fontFamily: 'Bookish', alignSelf: 'center', margin: 10
    },
    item: {
      backgroundColor: '#FF7E00', borderRadius: 10, margin: 10, width: '75%'
    },
    menulogo: {
      resizeMode: 'contain',
      alignSelf: 'center',
      margin: 15
    },
    columns: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    khalisTouchableOpacity: {
      width: '100%',
      alignItems: 'center',
      marginVertical: 10
    },
  });
  async function whichGame(gameName) {
    await Analytics.logEvent('game_chosen', { gameName });
  }

  if (!fontsLoaded) { // || localWords === null || localWords === undefined) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden
      />
      <View style={styles.header}>
        <Logo height={width * 0.6} width={width * 0.6} style={styles.menulogo} />
        <View style={styles.mainMenuContainer}>
          <Text style={styles.mainmenu}>MAIN MENU</Text>
          {/* <TouchableOpacity onPress={()=> {dispatch(showIntroModal())}} style={{margin: 5}}>
          <Icon name='info-circle' color={"#7FC8DE"} size={22} />
        </TouchableOpacity> */}
        </View>
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
            <Text style={styles.text}>{Platform.OS === 'ios' ? 'Akhar Jor' : 'Gurmukhi Wordlink'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.columns}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              // if (audioPlayer._loaded) {stopSound()};
              whichGame('2048');
              navigation.navigate('2048');
            }}
          >
            <Text style={styles.text2048}>2048</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.columns}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              // if (audioPlayer._loaded) {stopSound()};
              whichGame('wordle');
              navigation.navigate('Wordle');
            }}
          >
            <Text style={styles.text}>Wordle</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <TouchableOpacity
        style={styles.khalisTouchableOpacity}
        onPress={() => Linking.openURL('https://khalis.dev')}
      >
        <Khalis width={width * 0.5} height={width * 0.2} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default MenuScreen;
