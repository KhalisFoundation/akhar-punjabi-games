/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import IonIcons from 'react-native-vector-icons/Ionicons';
import EnIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { setTheState, openHelpModal, setTheWords } from '../../redux/actions';
import Help from '../playGame/help';
import Khalis from '../../assets/khalis_incubator_dark.svg';
import { initialState } from '../../redux/reducers';

import dimensions from '../../util/dimensions';
import { useData } from '../../data';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  // const state = useSelector((theState) => theState.theGameReducer);
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Prabhki: require('../../assets/fonts/Prabhki.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
    Nasa: require('../../assets/fonts/Nasalization.otf'),
  });
  const state = useSelector((theState) => theState.theGameReducer);
  // let resDB;
  // const data = async () => {
  //   const q = await AsyncStorage.getItem('data');
  //   const res = Promise.all([q]).then(() => {
  //     console.log('Data from Firebase DB inner: ', JSON.parse(q)); // this one is working
  //     resDB = JSON.parse(q);
  //   });
  //   return res;
  // };
  // const theData = data();
  // console.log('Data from Firebase DB: ', theData);
  // console.log('ResDB outer:', resDB);
  const { width } = dimensions;
  // const [loadingScreenStatus, setLoadingScreen] = React.useState(true);
  let theState;
  React.useEffect(() => {
    async function getData() {
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
        // setLoadingScreen(false);
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    }
    getData();
  }, [dispatch]);
  React.useEffect(() => {
    async function setWordsData() {
      try {
        const theWordsData = await AsyncStorage.getItem('data');
        let theWords;
        if (theWordsData !== null) {
          theWords = JSON.parse(theWordsData);
          console.log('got words data that was previously saved');
          // console.log(theState);
        } else {
          console.log('there is nothing is state');
          theWords = await useData();
        }
        Promise.all([theWords]).then(() => {
          dispatch(setTheWords(theWords));
          console.log('Set Words!');
        });
        // setLoadingScreen(false);
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    }
    setWordsData();
  }, [dispatch]);
  // console.log(theColors[state.darkMode]);
  // console.log(state.darkMode);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#162b5e',
      padding: 10,
      paddingHorizontal: 20,
    },
    playTouchableOpacity: {
      width: '50%',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 15,
      marginBottom: 15,
      elevation: 5,
      backgroundColor: '#FF7E00',
    },
    play: {
      fontSize: width * 0.07,
      fontFamily: 'Nasa',
      color: '#fff',
      textAlign: 'center',
      marginVertical: 10,
      // textShadowOffset: {width: 2, height: 2},
      // textShadowRadius: 10,
      // textShadowColor: 'darkblue',
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
      width: '100%',
      alignItems: 'center',
    },
    center: {
      alignSelf: 'center',
    },
    menuText: {
      fontSize: width * 0.045,
      alignSelf: 'center',
    }
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      { state.helpPage ? <Help /> : null }
      {/* <LoadingModal visible={loadingScreenStatus} /> */}
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 5, marginTop: 5
      }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 5 }}
        >

          <IonIcons name="chevron-back" size={width * 0.07} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('settings');
          }}
          style={{ padding: 5 }}
        >
          <Icon name="cog" size={width * 0.07} color="#ccc" style={styles.center} />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent:'space-evenly', height: "100%", width: "100%"}}>
        <View
          style={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{
            fontFamily: 'Bookish',
            fontSize: width * 0.14,
            color: '#cdff',
          }}
          >
            AKr joV
          </Text>
          <Text style={{ fontFamily: 'Nasa', fontSize: width * 0.07, color: '#cdff' }}>
            {Platform.OS === "ios" ? "Akhar Jor" : "Gurmukhi Wordlink"}
          </Text>
        </View>
        <View style={{ width: '100%' }}>
          {/* PLay transition */}
          <TouchableOpacity
            style={styles.playTouchableOpacity}
            onPress={() => {
              navigation.navigate('play');
            }}
          >
            <Text style={styles.play}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(openHelpModal()); // console.log(state.helpPage);
            }}
          >
            <Text style={{
              ...styles.play, fontFamily: 'Muli', fontSize: width * 0.05, textDecorationStyle: 'solid', textDecorationColor: '#fff', textDecorationLine: 'underline'
            }}
            >
              How do I play?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherScreens}>

          <TouchableOpacity
            style={styles.otherScreenTouchableOpacity}
            onPress={() => {
              navigation.navigate('correctWords'); // how to pass params to other screen. We probaly won't need but there just for refrence
            }}
          >
            <EnIcon name="shield" size={width * 0.15} color="yellow" style={styles.center} />
            <Text style={{
              ...styles.menuText, fontFamily: 'Muli', fontWeight: 'normal', color: 'white', textAlign: 'center'
            }}
            >
              Levels
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.otherScreenTouchableOpacity}
            onPress={() => {
              navigation.navigate('giveUps'); // how to pass params to other screen. We probaly won't need but there just for refrence
            }}
          >

            <Icon name="heart" size={width * 0.15} color="#f55aff" style={styles.center} />
            <Text style={{
              ...styles.menuText, fontFamily: 'Muli', fontWeight: 'normal', color: 'white'
            }}
            >
              Credits
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
