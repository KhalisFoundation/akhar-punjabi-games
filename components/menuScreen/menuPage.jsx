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
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { setTheState } from '../../redux/actions';
import LoadingModal from '../homeScreen/loadingScreen';

import { initialState } from '../../redux/reducers';

function MenuScreen({ navigation }) {
  const dispatch = useDispatch();
  // const state = useSelector((theState) => theState.theGameReducer);
  const [fontLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
  });
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
      height: '100%',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: '5%',
      padding: 10,
      backgroundColor: "#274C7C",
    },
    header: {
      width:'100%',
      margin: '10%',
      textAlign: 'center',
    },
    mainmenu: {
      color: '#fff',
      fontSize: 25,
      fontFamily: 'Muli',
      textAlign: 'center',
      borderBottomColor: '#00E9FE', 
      borderBottomWidth: 1
    },
    text: {color:'#fff', fontSize: 20, fontFamily: 'Muli', alignSelf:'center', margin: 10},
    item: {backgroundColor: '#FF7E00', borderRadius: 10, margin: 10},
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

  if (!fontLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.menulogo} source={require('../../assets/sikh_games_logo_with_text.png')} />
        <Text style={styles.mainmenu}>MAIN MENU</Text>
        <Text style={styles.text}>Select a game to Play</Text>
        <View style={styles.columns}>
          <TouchableOpacity 
            style={styles.item}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={[styles.text]}>Gurmukhi Wordlink</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.khalisTouchableOpacity}
        onPress={() => {
          console.log('Khalis Foundation');
        }}
      >
        <Image
          style={styles.khalis}
          source={require('../../assets/khalislogo150white.png')}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default MenuScreen;
