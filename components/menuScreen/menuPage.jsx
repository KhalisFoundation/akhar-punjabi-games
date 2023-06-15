/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  StatusBar,
  Dimensions
} from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
// import { Audio } from 'expo-av';
import * as Analytics from 'expo-firebase-analytics';
import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Platform from '../../util/orientation';
import Khalis from '../../assets/khalis_incubator_dark.svg';
import Logo from '../../assets/akhar_logo.svg';

import dimensions from '../../util/dimensions';
// import { fetchData, setData } from '../../redux/actions';

// const audioPlayer = new Audio.Sound();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function MenuScreen({ navigation }) {
  // const dispatch = useDispatch();
  // const state = useSelector((theState) => theState.theGameReducer);
  const { width, height } = dimensions;
  // const [isLoaded, setIsLoaded] = React.useState(false);
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
  });

  const [localState, setLocalState] = React.useState({
    orientation: Platform.isPortrait() ? 'portrait' : 'landscape',
    devicetype: Platform.isTablet() ? 'tablet' : 'phone'
  });

  // Event Listener for orientation changes

  Dimensions.addEventListener('change', () => {
    setLocalState({
      orientation: Platform.isPortrait() ? 'portrait' : 'landscape'
    });
  });

  const dime = Math.min(width, height);

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [dispatch]);

  // const [data, setLocalData] = React.useState(null);

  // const getDataFromAsyncStorage = React.useCallback(async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('data');
  //     setLocalData(value);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   getDataFromAsyncStorage();
  // }, [getDataFromAsyncStorage]);

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
      width: localState.orientation === 'portrait' ? '100%' : '50%',
      textAlign: 'center',
      flexDirection: localState.orientation === 'portrait' ? 'column' : 'row',
      justifyContent: localState.orientation === 'portrait' ? 'space-between' : 'center'
    },
    upper: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    lower: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    mainmenu: {
      color: '#fff',
      fontSize: dime * 0.06,
      fontFamily: 'Muli',
      textAlign: 'center',
      justifyContent: 'center',
    },
    mainMenuContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: localState.orientation === 'portrait' ? '#00E9FE' : 'transparent',
      borderBottomWidth: 1
    },
    text: {
      color: '#fff', fontSize: dime * 0.045, fontFamily: 'Muli', alignSelf: 'center', margin: 10
    },
    text2048: {
      color: '#fff', fontSize: dime * 0.045, fontFamily: 'Bookish', alignSelf: 'center', margin: 10
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
      flexDirection: localState.orientation === 'portrait' ? 'column' : 'row',
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

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView
      style={styles.container}
      // onLayout={() => {
      //   if (data) {
      //     console.log('Levels updated!');
      //     dispatch(setData(data));
      //   }
      // }}
    >
      <StatusBar
        hidden
      />
      <View
        style={styles.header}
      >
        <View style={styles.upper}>
          <Logo
            height={dime * 0.6}
            width={dime * 0.6}
            style={styles.menulogo}
          />
          <View style={styles.mainMenuContainer}>
            <Text style={styles.mainmenu}>MAIN MENU</Text>
            {/* <TouchableOpacity onPress={()=> {dispatch(showIntroModal())}} style={{margin: 5}}>
            <Icon name='info-circle' color={"#7FC8DE"} size={22} />
          </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.lower}>
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
              <Text style={styles.text2048}>
                2048
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.columns}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                // if (audioPlayer._loaded) {stopSound()};
                whichGame('wordle');
                navigation.navigate('wordle');
              }}
            >
              <Text style={styles.text}>
                {Platform.OS === 'ios' ? 'Shabadle' : 'Punjabi Wordle'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.khalisTouchableOpacity}
            onPress={() => Linking.openURL('https://khalis.dev')}
          >
            <Khalis width={dime * 0.5} height={dime * 0.2} />
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
    </SafeAreaView>
  );
}

export default MenuScreen;
