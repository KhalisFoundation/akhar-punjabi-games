/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  StyleSheet, Modal, Text, TouchableOpacity, Animated, View
} from 'react-native';
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import dimensions from '../../util/dimensions';
import Icon from '../../assets/Group-14.svg';
import Win from '../../assets/Win.svg';

function YouWonModal(props) {
  const { width } = dimensions;
  const [fontsLoaded] = useFonts({
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
  });

  const styles = StyleSheet.create({
    container: {
      width,
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
      fontSize: width * 0.075,
      textAlign: 'center',
      fontFamily: 'Bookish',
      color: 'white',
    },
    meaningText: {
      fontFamily: 'Muli',
      fontSize: width * 0.04,
      textAlign: 'center',
      color: 'white',
      marginBottom: 10,
    },
    continue: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    continueText: {
      textAlign: 'center',
      fontSize: width * 0.04,
      margin: 'auto',
      fontFamily: 'Muli',
      color: 'black',
    },
    text: {
      textAlign: 'center',
      fontSize: width * 0.07,
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
      animationType="fade"
      transparent
    >
      <Animatable.View
        animation="slideInDown"
        iterationCount={1}
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center', padding: 25, paddingTop: 100, backgroundColor: 'rgba(0,0,0,0.5)'
        }}
      >

        <View style={{ width: '100%', borderRadius: 30, backgroundColor: '#274C7C' }}>
          <Animatable.View
            animation="tada"
            iterationCount={2}
            style={{
              marginBottom: props.won ? 0 : 25, alignItems: 'center'
            }}
          >
            {props.won ? <Win height={2 * dimensions.size['60']} style={{ marginTop: -75 }} /> : <Icon style={{ transform: [{ scale: 2 }] }} />}
          </Animatable.View>
          <Text style={styles.text}>
            {props.won ? 'vDweIAwN jI!' : 'koeI g~l nhIN!'}
          </Text>
          <Text style={[styles.text, { fontFamily: 'Muli', fontWeight: 'normal', fontSize: width * 0.05 }]}>
            {props.won ? 'You Won!' : 'No Problem!\nBetter Luck Next Time!'}
          </Text>
          <Animatable.View
            animation="slideInDown"
            iterationCount={1}
          >
            <TouchableOpacity
              style={styles.continue}
              onPress={props.onRestart}
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
