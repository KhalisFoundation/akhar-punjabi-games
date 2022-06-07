/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  StyleSheet, Modal, Text, TouchableOpacity, Animated, ImageBackground, View
} from 'react-native';
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { closeResultModal } from '../../redux/actions';

function YouWonModal(won) {
  won = won.won
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);
  const [fontsLoaded] = useFonts({
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
  });

  const styles = StyleSheet.create({
    container: {
      width: 300,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      padding: 10,
    },
    wordBox: {
      backgroundColor: '#FF7E00',
      borderRadius: 14,
      margin: 10,
      padding: 10,
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    wordDoneText: {
      fontSize: 30,
      textAlign: 'center',
      fontFamily: 'Bookish',
      color: 'white',
    },
    meaningText: {
      fontFamily: 'Muli',
      fontSize: 16,
      textAlign: 'center',
      color: state.darkMode ? '#ff6e00' : 'white',
      marginBottom: 10,
    },
    continue: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    continueText: {
      textAlign: 'center',
      fontSize: 20,
      margin: 'auto',
      fontFamily: 'Muli',
      color: 'black',
    },
    text: {
      textAlign: 'center',
      fontSize: 35,
      color: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
      paddingTop: 25,
      fontFamily: 'Bookish',
    }
  });
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Modal
      visible={state.resultShow}
      animationType="fade"
      transparent
    >
      <Animatable.View
        animation="slideInDown"
        iterationCount={1}
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
        }}
      >
        
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'flex-start', borderRadius: 30, backgroundColor:'#274C7C' }}>
              <Animatable.Image
                animation="tada"
                iterationCount={2}
                source={won ? require('../../assets/Win.png') : require('../../assets/Group-14.png')}
                style={{
                  margin: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, height: won?250:150, width: won?250:150, resizeMode: 'contain'
                }}
              />
              <Text style={styles.text}>
                {won ? "vDweIAwN jI!" : "koeI g~l nhIN!"}
              </Text>
              <Text style={[styles.text, { fontFamily: 'Muli', fontWeight: 'normal', fontSize: 20 }]}>
                {won ? "You Won!" : "No Problem!\nBetter Luck Next Time!"}
              </Text>
              <Animatable.View
                animation="slideInDown"
                iterationCount={1}
              >
                <TouchableOpacity
                  style={styles.continue}
                  onPress={() => { dispatch(closeResultModal()) }}
                >
                  <AnimatedLinearGradient
                    colors={['#f0cb35', '#ed8f03']}
                    start={{ x: 0.9, y: 1.5 }}
                    style={styles.wordBox}
                  >
                    <Text style={styles.continueText}>Play Again</Text>
                  </AnimatedLinearGradient>
                </TouchableOpacity>
              </Animatable.View>

            </View>
      </Animatable.View>
    </Modal>
  );
}

export default YouWonModal;
