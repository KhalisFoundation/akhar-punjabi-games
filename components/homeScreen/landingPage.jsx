/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from './loadingScreen';
import { setTheState } from '../../redux/actions';
import { 
  IMFellEnglish_400Regular,
  IMFellEnglish_400Regular_Italic 
} from '@expo-google-fonts/im-fell-english';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';


import { initialState } from '../../redux/reducers';

import theColors from '../../util/colors';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);
  let [fontLoaded] = useFonts({
    'Arial': require('../../assets/fonts/Arial.ttf'),
    'GurbaniHeavy': require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    'Bookish': require('../../assets/fonts/Bookish.ttf'),
    'Mochy': require('../../assets/fonts/Mochy.ttf'),
  });
  const [loadingScreenStatus, setLoadingScreen] = React.useState(true);
  const [loadingScreenText, setLoadingScreenText] = React.useState('Loading');
  {/*let [fontsLoaded] = useFonts({
    'anmol-lipi': require('../../assets/fonts/AnmolLipiSG.ttf'),
    'arial': require('../../assets/fonts/Arial.ttf'),
    'gurbani-akhar-heavy': require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    'gurbani-akhar': require('../../assets/fonts/GurbaniAkharSG.ttf'),
    'gurbani-akhar-thick': require('../../assets/fonts/GurbaniAkharThickSG.ttf'),
    imfell: require('../../assets/fonts/IMFellEnglish-Regular.ttf'),
  });*/}
  let theState;
  React.useEffect(() => {
    async function getData() {
      setLoadingScreenText(
        'Getting previously stored Data from Async Storage!!!'
      );
      try {
        const theStringState = await AsyncStorage.getItem('state');
        if (theStringState !== null) {
          theState = JSON.parse(theStringState);
          console.log('got state that was previously saved');
          // console.log(theState);
        } else {
          console.log('there is nothing is state');
          theState = initialState;
        }
        dispatch(setTheState(theState));
        setLoadingScreen(false);
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    }
    getData();
  }, [dispatch]);
  // for styles
  const colors = state ? theColors[state.darkMode] : theColors.false;
  // console.log(theColors[state.darkMode]);
  // console.log(state.darkMode);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: '5%',
    },
    mangal: {
      fontSize: 20,
      paddingTop: '3%',
      fontWeight: "bold",
    },
    logo: {
      width: '100%',
      height: '70%',
    },
    playTouchableOpacity: {
      width: '50%',
      height: '10%',
      borderRadius: 10,
      bottom: '23.5%',
    },
    play: {
      width: '100%',
      height: '100%',
    },
    otherScreens: {
      flexDirection: 'row',
      // backgroundColor: "yellow",
      bottom: '43.5%',
      alignItems: "center",
      justifyContent: 'space-between',
    },
    otherScreenTouchableOpacity: {
      flex: 1,
      margin: 10,
    },
    otherScreensImg: {
      height: 75,
      width: 75,
      borderRadius: 5,
      alignItems: 'center', // only here for the giveUp because no img
    },
    by: {
      bottom: '18%',
    },
    byText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    khalisTouchableOpacity: {
      height: '8%',
      width: '45%',
      bottom: '17%',
    },
    khalis: {
      height: '100%',
      width: '100%',
      borderRadius: 5,
      alignItems: 'center',
    },
    bold: {
      fontWeight: "bold",
      alignSelf:"center",
    },
  });

  if (!fontLoaded) {
    return <AppLoading/>
  }
  return (
    <ImageBackground
      source={require('../../images/background.jpg')}
      style={styles.container}
    >
      <LoadingModal visible={loadingScreenStatus} theText={loadingScreenText} />
      <Image style={styles.logo} source={require('../../images/logo.png')} />
      <TouchableOpacity
        style={styles.playTouchableOpacity}
        onPress={() => {
          navigation.navigate('play');
        }}
      >
        <Image style={styles.play} source={require('../../images/Play.png')} />
      </TouchableOpacity>
      <View style={styles.otherScreens}>
        <TouchableOpacity
          style={styles.otherScreenTouchableOpacity}
          onPress={() => {
            navigation.navigate('settings');
          }}
        >
          <Icon name="cog" size={85} color="#555" style={styles.bold}/>
          <Text style={{...styles.bold, fontFamily:'Arial', fontWeight:'normal'}}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.otherScreenTouchableOpacity}
          onPress={() => {
            navigation.navigate('correctWords'); // how to pass params to other screen. We probaly won't need but there just for refrence
          }}
        >
          <Icon name="check-circle" size={85} color="#080" style={styles.bold}/>
          <Text style={{...styles.bold, fontFamily:'Arial', fontWeight:'normal'}}>Words Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherScreenTouchableOpacity}
          onPress={() => {
            navigation.navigate('giveUps'); // how to pass params to other screen. We probaly won't need but there just for refrence
          }}
        >
          
          <Icon name="heart" size={85} color="#900" style={styles.bold} />
          <Text style={{...styles.bold, fontFamily:'Arial', fontWeight:'normal'}}>Get Lives</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.khalisTouchableOpacity}
        onPress={() => {
          console.log('Khalis Foundation');
        }}
      >
        <Image
          style={styles.khalis}
          source={require('../../images/khalislogo150.png')}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}

export default HomeScreen;
