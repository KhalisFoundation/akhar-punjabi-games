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
import { closeNextLevelModal, reset } from '../../redux/actions';

// importing svg graphics
import Stage1 from '../../assets/stage1.svg';
import Stage2 from '../../assets/stage2.svg';
import Stage3 from '../../assets/stage3.svg';
import Stage4 from '../../assets/stage4.svg';
import Stage5 from '../../assets/stage5.svg';

import Icon1 from '../../assets/Group-1.svg';
import Icon2 from '../../assets/Group-2.svg';
import Icon3 from '../../assets/Group-3.svg';
import Icon4 from '../../assets/Group-4.svg';
import Icon5 from '../../assets/Group-5.svg';
import Icon6 from '../../assets/Group-6.svg';
import Icon7 from '../../assets/Group-7.svg';
import Icon8 from '../../assets/Group-8.svg';
import Icon9 from '../../assets/Group-9.svg';
import Icon10 from '../../assets/Group-10.svg';
import Icon11 from '../../assets/Group-11.svg';
import Icon12 from '../../assets/Group-12.svg';
import Icon13 from '../../assets/Group-13.svg';
import Icon14 from '../../assets/Group-14.svg';

import Win from '../../assets/Win.svg'

function WordsDoneModal() {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
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
      fontSize: 15,
      margin: 'auto',
      fontFamily: 'Muli',
      color: 'white',
    },
    text: {
      textAlign: 'center',
      fontSize: 35,
      color: 'white',
      paddingTop: 25,
      fontFamily: 'Prabhki',
    }
  });
  const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const nowWow = getRandomNum(1, 14);
  console.log(nowWow);
  const wows = {
    1: <Icon1 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
    2: <Icon2 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
    3: <Icon3 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
    4: <Icon4 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
    5: <Icon5 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
    6: <Icon6 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
    7: <Icon7 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
    8: <Icon8 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
    9: <Icon9 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
    10:<Icon10 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
    11:<Icon11 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
    12:<Icon12 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
    13:<Icon13 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
    14:<Icon14 style={{transform:[{ scale: 2 }], marginBottom: 20}}/>,
  };
  const doneYet = Math.floor((10 - state.levelProgress[0].wordsNeeded) / 2);
  const stage = {
    0: <Stage1/>,
    1: <Stage2/>,
    2: <Stage3/>,
    3: <Stage4/>,
    4: <Stage5/>
  };
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Modal
      visible={state.nextLevelModal[0]}
      animationType="fade"
      transparent
      onRequestClose={() => dispatch(closeNextLevelModal())}
    >
      <Animatable.View
        animation="slideInDown"
        iterationCount={1}
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
        }}
      >
        {(state.levelProgress[0].level === 8 && state.levelProgress[0].wordsNeeded === 0)
          ? (
            <View style={{ width: '100%', flexDirection: 'column',alignItems: 'center', borderRadius: 30, backgroundColor:'#274C7C', marginVertical: 50 }}>
              <Animatable.View
                animation="tada"
                iterationCount={2}
                style={{margin: 0, padding: 0}}
              >
                <Win style={{transform:[{ scale: 2 }], marginBottom:50}}/>
              </Animatable.View>
              <Animatable.Text animation="fadeIn" iterationCount={1} style={styles.text}>
                vDweIAwN jI
              </Animatable.Text>
              <Text style={[styles.text, { fontFamily: 'Muli', fontWeight: 'normal', fontSize: 20, padding:0 }]}>
                More levels coming soon!
              </Text>
              <Animatable.View
                animation="slideInDown"
                iterationCount={1}
              >
                <TouchableOpacity
                  style={styles.continue}
                  onPress={() => { dispatch(reset()); dispatch(closeNextLevelModal()); }}
                >
                  <AnimatedLinearGradient
                    colors={['#f0cb35', '#ed8f03']}
                    start={{ x: 0.9, y: 1.5 }}
                    style={styles.wordBox}
                  >
                    <Text style={styles.continueText}>Start Over &rarr;</Text>
                  </AnimatedLinearGradient>
                </TouchableOpacity>
              </Animatable.View>

            </View>
          )
          : (
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'flex-start', borderRadius: 30, backgroundColor:'#21218b' }}>
              <Animatable.View
                animation="tada"
                iterationCount={2}
                style={{ margin: 15 }}
              >
                {wows[nowWow]}
              </Animatable.View>
              <Animatable.View
                animation="bounceIn"
                easing="ease-in"
                iterationCount={1}
                style={{ margin: 15 }}
              >
                {stage[doneYet]}
              </Animatable.View>
              <Animatable.View
                animation="slideInDown"
                iterationCount={1}
              >
                <AnimatedLinearGradient
                  colors={state.darkMode ? ['#000', '#000'] : ['darkblue', 'darkblue']}
                  start={{ x: 1, y: 1 }}
                  style={[styles.container, { bottom: 10 }]}
                >
                  <Animatable.View
                    animation="bounceIn"
                    easing="ease-in"
                    iterationCount={1}
                    style={{ borderBottomWidth: 2, borderBottomColor: 'white', paddingBottom: 10 }}
                  >
                    <Text style={styles.wordDoneText}>
                      {state.nextLevelModal[1].punjabiText}
                    </Text>
                    <Text style={styles.meaningText}>
                      {state.nextLevelModal[1].meaning}
                    </Text>
                  </Animatable.View>
                  <Animatable.View
                    animation="bounceIn"
                    easing="ease-in"
                    iterationCount={1}
                  >
                    <Text style={styles.wordDoneText}>
                      {state.nextLevelModal[2].punjabiText}
                    </Text>
                    <Text style={styles.meaningText}>
                      {state.nextLevelModal[2].meaning}
                    </Text>
                  </Animatable.View>

                  <TouchableOpacity
                    style={styles.continue}
                    onPress={() => { dispatch(closeNextLevelModal()); }}
                  >
                    <View
                      style={styles.wordBox}
                    >
                      <Text style={styles.continueText}>Continue</Text>
                    </View>
                  </TouchableOpacity>
                </AnimatedLinearGradient>
              </Animatable.View>
            </View>
          )}
      </Animatable.View>
    </Modal>
  );
}

export default WordsDoneModal;
