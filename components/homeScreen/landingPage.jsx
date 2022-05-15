/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
  ImageBackground, 
  SafeAreaView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { setTheState } from '../../redux/actions';
import LoadingModal from './loadingScreen';

import { initialState } from '../../redux/reducers';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  // const state = useSelector((theState) => theState.theGameReducer);
  const [fontLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
    Nasa: require('../../assets/fonts/Nasalization.otf'),
  });
  const state = useSelector((theState) => theState.theGameReducer);
  const [loadingScreenStatus, setLoadingScreen] = React.useState(true);
  const [loadingScreenText, setLoadingScreenText] = React.useState('Loading');
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
  // console.log(theColors[state.darkMode]);
  // console.log(state.darkMode);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      backgroundColor: "#274C7C",
    },
    logo: {
      height: '30%', alignSelf: 'center'
    },
    playTouchableOpacity: {
      height: '20%',
      width: '100%',
    },
    play: {
      fontSize: 70,
      fontFamily: 'Nasa',
      color: '#cdff',
      textAlign: 'center',
      textShadowOffset: {width: 2, height: 2},
      textShadowRadius: 10,
      textShadowColor: 'darkblue',
    },
    otherScreens: {
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
    back: {
      backgroundColor: '#035',
      padding: 10,
      borderRadius: 50,
      alignSelf: 'flex-start',
      margin: 0, marginTop: '5%'
    },
    bold: {
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <LoadingModal visible={loadingScreenStatus} theText={loadingScreenText} />
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}
      >
      <MaskedView
          style={{ width: 35, height: 35 }}
          maskElement={(
            <View
              style={{
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IonIcons name="arrow-back" size={35} color={state.darkMode ? '#fff' : '#464646'} style={styles.shadow} />
            </View>
        )}
        >
          <LinearGradient
            colors={['#ff8008', '#ffc837']}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </TouchableOpacity>  
      <Image style={styles.logo} source={require('../../assets/logo.png')} resizeMode="contain" />
      <TouchableOpacity
        style={styles.playTouchableOpacity}
        onPress={() => {
          navigation.navigate('play');
        }}
      >
        <Text style={styles.play}>Play</Text>
      </TouchableOpacity>
      <View style={styles.otherScreens}>
        <TouchableOpacity
          style={styles.otherScreenTouchableOpacity}
          onPress={() => {
            navigation.navigate('settings');
          }}
        >
          <Icon name="cog" size={85} color="#aaa" style={styles.bold} />
          <Text style={{ ...styles.bold, fontFamily: 'Muli', fontWeight: 'normal', color: 'white' }}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.otherScreenTouchableOpacity}
          onPress={() => {
            navigation.navigate('correctWords'); // how to pass params to other screen. We probaly won't need but there just for refrence
          }}
        >
          <Icon name="check-circle" size={85} color="#00aa00" style={styles.bold} />
          <Text style={{ ...styles.bold, fontFamily: 'Muli', fontWeight: 'normal', color: 'white', textAlign:'center' }}>Completed Levels</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherScreenTouchableOpacity}
          onPress={() => {
            navigation.navigate('giveUps'); // how to pass params to other screen. We probaly won't need but there just for refrence
          }}
        >

          <Icon name="heart" size={85} color="#f00" style={styles.bold} />
          <Text style={{ ...styles.bold, fontFamily: 'Muli', fontWeight: 'normal', color: 'white' }}>Get Lives</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.khalisTouchableOpacity}
        onPress={() => Linking.openURL('https://khalisfoundation.org')}
      >
        <Image
          source={require('../../assets/khalislogo150white.png')}
          style={{ width: 150, alignSelf: 'center' }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;
