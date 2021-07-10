/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from './loadingScreen';
import { setTheState } from '../../redux/actions';

import { initialState } from '../../redux/reducers';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [loadingScreenStatus, setLoadingScreen] = React.useState(true);
  const [loadingScreenText, setLoadingScreenText] = React.useState('Loading');

  React.useEffect(() => {
    async function getData() {
      setLoadingScreenText(
        'Getting previously stored Data from Async Storage!!!'
      );
      try {
        const theStringState = await AsyncStorage.getItem('state');
        let theState;
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

  return (
    <ImageBackground
      source={require('../../images/background.png')}
      style={styles.container}
    >
      <LoadingModal visible={loadingScreenStatus} theText={loadingScreenText} />

      <Text style={styles.mangal}>ੴਸਤਿਗੁਰਪ੍ਰਸਾਦਿ॥</Text>
      <Image style={styles.logo} source={require('../../images/logo.png')} />
      <TouchableOpacity
        style={styles.playTouchableOpacity}
        onPress={() => {
          navigation.navigate('play');
        }}
      >
        <Image style={styles.play} source={require('../../images/Play.png')} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsTouchableOpacity}
        onPress={() => {
          // console.log("Settings");
          navigation.navigate('settings');
        }}
      >
        <Image
          style={styles.settings}
          source={require('../../images/settings.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.levelsTouchableOpacity}
        onPress={() => {
          navigation.navigate('correctWords'); // how to pass params to other screen. We probaly won't need but there just for refrence
        }}
      >
        <Image
          style={styles.levels}
          source={require('../../images/levels.png')}
        />
      </TouchableOpacity>
      <View style={styles.by}>
        <Text style={styles.byText}>ਪ੍ਰਕਾਸ਼ਕ:</Text>
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

// TODO - Move all colors to separate file and import as variables.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '5%',
  },
  mangal: {
    fontSize: 20,
    paddingTop: '3%',
  },
  logo: {
    width: '100%',
    height: '70%',
    // top: 50,
  },
  playTouchableOpacity: {
    width: '50%',
    height: '10%',
    // right: "40%",
    backgroundColor: 'black',
    borderRadius: 10,
    bottom: '23.5%',
  },
  play: {
    width: '100%',
    height: '100%',
  },
  settingsTouchableOpacity: {
    height: '10%',
    width: '20%',
    right: '25%',
    bottom: '12%',
  },
  settings: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  levelsTouchableOpacity: {
    height: '10%',
    width: '20%',
    left: '25%',
    bottom: '22%',
  },
  levels: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  by: {
    bottom: '18%',
  },
  byText: {
    fontSize: 20,
  },
  khalisTouchableOpacity: {
    height: '8%',
    width: '45%',
    // left: "25%",
    bottom: '17%',
  },
  khalis: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default HomeScreen;
