/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-native/no-color-literals */
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Dimensions, { width } from '../../../util/dimensions';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useSelector } from 'react-redux';

function Heading(props) {
  const state = useSelector((theState) => theState.theGameReducer);
  const [fontsLoaded] = useFonts({
    Muli: require('../../../assets/fonts/Muli.ttf'),
    GurbaniAkhar: require('../../../assets/fonts/GurbaniAkharSG.ttf')
  });
  const styles = StyleSheet.create({
    container: { justifyContent: 'space-around', flexDirection: 'row', width },
    upBox: {
      backgroundColor: '#035',
      padding: Dimensions.size['4'],
      borderRadius: 50,
      alignSelf: 'center',
      alignItems: 'center'
    },
    upText: {
      color: 'white',
      fontSize: width*0.04,
      fontFamily: 'Muli'
    },
    numText: {
      fontFamily: state.punjabiNums ? 'GurbaniAkhar': 'Muli',
    }
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.upBox}>
        <Text style={styles.upText}>
          Best: <Text style={styles.numText}>{props.best}</Text>
        </Text>
      </View>
      <View style={styles.upBox}>
        <Text style={styles.upText}>
          Score: <Text style={styles.numText}>{props.score}</Text>
        </Text>
      </View>
    </View>
  );
}

export default Heading;
