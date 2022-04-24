/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
  ImageBackground
} from 'react-native';
import { useDispatch } from 'react-redux';
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
      flex: 1,
      alignItems: 'center',
      paddingTop: '5%',
    },
    logo: { height: 250, alignSelf: 'center', marginTop: '10%', marginBottom: '50%' },
    playTouchableOpacity: {
      width: '50%',
      height: '10%',
      borderRadius: 10,
      bottom: '15%',
    },
    play: {
      width: '100%',
      height: '100%',
    },
    otherScreens: {
      flexDirection: 'row',
      // backgroundColor: "yellow",
      bottom: '25%',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    bold: {
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }
  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.container}
    >
      <LoadingModal visible={loadingScreenStatus} theText={loadingScreenText} />
      <Image style={styles.logo} source={require('../../assets/blogo.png')} resizeMode="contain" />
      <TouchableOpacity
        style={styles.playTouchableOpacity}
        onPress={() => {
          navigation.navigate('play');
        }}
      >
        <Image style={styles.play} source={require('../../assets/Play.png')} />
      </TouchableOpacity>
      <View style={styles.otherScreens}>
        <TouchableOpacity
          style={styles.otherScreenTouchableOpacity}
          onPress={() => {
            navigation.navigate('settings');
          }}
        >
          <Icon name="cog" size={85} color="#555" style={styles.bold} />
          <Text style={{ ...styles.bold, fontFamily: 'Arial', fontWeight: 'normal' }}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.otherScreenTouchableOpacity}
          onPress={() => {
            navigation.navigate('correctWords'); // how to pass params to other screen. We probaly won't need but there just for refrence
          }}
        >
          <Icon name="check-circle" size={85} color="#080" style={styles.bold} />
          <Text style={{ ...styles.bold, fontFamily: 'Arial', fontWeight: 'normal' }}>Words Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherScreenTouchableOpacity}
          onPress={() => {
            navigation.navigate('giveUps'); // how to pass params to other screen. We probaly won't need but there just for refrence
          }}
        >

          <Icon name="heart" size={85} color="#900" style={styles.bold} />
          <Text style={{ ...styles.bold, fontFamily: 'Arial', fontWeight: 'normal' }}>Get Lives</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.khalisTouchableOpacity}
        onPress={() => Linking.openURL('https://khalisfoundation.org')}
      >
        <Image
          source={require('../../assets/khalislogo150.png')}
          style={{ width: 150, alignSelf: 'center' }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}

export default HomeScreen;
