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
  SafeAreaView, 
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// import resultModal which is handled if user won or lost
// refer to the use of nextLevelModal to understand how it works

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { setTheState, setBoard, resetBoard, setPunjabiNums, setNewBoardOnComplete } from '../../redux/actions';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingModal from './loadingScreen';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { moveUp, moveDown, moveLeft, moveRight, checkWin, isOver, generateRandom, getEmptyBoard } from './slideLogic';
import * as Anvaad from 'anvaad-js';
import YouWonModal from './resultModal';
import { useState } from 'react';

function Game2048({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);
  const [fontLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
    Nasa: require('../../assets/fonts/Nasalization.otf'),
  });
  
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  // console.log(theColors[state.darkMode]);
  // console.log(state.darkMode);

  const data = state.board;
  const colorCodes = {
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
  }

  //swipe gestures
  const [swipeWay, setSwipeWay] = React.useState({
    myText: 'I\'m ready to get swiped!',
    gestureName: 'none',
    backgroundColor: '#fff'
  });
  function onSwipeUp(gestureState) {
    setSwipeWay({myText: 'You swiped up!'});
    let newData = moveUp(state.board);
    dispatch(setBoard(newData));
  }
  function onSwipeDown(gestureState) {
    setSwipeWay({myText: 'You swiped down!'});
    let newData = moveDown(state.board);
    dispatch(setBoard(newData));
  }
  function onSwipeLeft(gestureState) {
    setSwipeWay({myText: 'You swiped left!'});
    let newData = moveLeft(state.board);
    dispatch(setBoard(newData));
  }
  function onSwipeRight(gestureState) {
    setSwipeWay({myText: 'You swiped right!'});
    let newData = moveRight(state.board);
    dispatch(setBoard(newData));
  }
  function onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setSwipeWay({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        setSwipeWay({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        setSwipeWay({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        setSwipeWay({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        setSwipeWay({backgroundColor: 'yellow'});
        break;
    }
  }
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  }; 


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 10, 
      backgroundColor: "#274C7C",
    },
    bgSquare: {
      margin: 15,
      width: screenWidth * 0.8,
      height: screenWidth * 0.8,
      borderRadius: 10,
      padding: 10,
      backgroundColor: '#FFB846',
    },
    gridRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    gridColumn: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    gridSquare: {
      width: screenWidth * 0.7 / 4,
      height: screenWidth * 0.7 / 4,
      marginBottom: 5,
      marginRight: 5,
      borderRadius: 10,
      textAlign: 'center',
      justifyContent: 'center',      
      backgroundColor: '#0005',
    },
    numText: {
      textAlign: 'center',
      color: '#000',
      fontSize: (state.punjabiNums) ? 30 : 20,
      fontFamily: (state.punjabiNums) ? 'GurbaniHeavy' : 'Muli',
    },
    otherScreens: {
      flexDirection: 'row',
      // backgroundColor: "yellow",
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width:'80%',
      backgroundColor: state.darkMode ? '#035': '#fff',
      padding: 10,
      borderRadius: 50,
      margin:10
    },
    optText: {
      textAlign: 'center',
      color: state.darkMode ? '#fff' : '#000',
      fontFamily: 'Muli',
      alignSelf: 'center',
      fontSize: 18,
      textShadowColor: (state.darkMode) ? 'white' : 'black',
      textShadowOffset: {
        width: 0.5,
        height: 0.5
      },
      textShadowRadius: 1,
    },
    back: {
      backgroundColor: state.darkMode ? '#035' : '#fff',
      padding: 10,
      borderRadius: 50,
      alignSelf: 'flex-start',
      marginTop: 20,
    },
  });

  let happen = false;
  const [won, setWon] = useState(false);
  if (!checkWin(state.board) && isOver(state.board)) {
    setWon(false);
    happen = true;
  }
  if (checkWin(state.board)) {
    setWon(true);
    happen = true;
  }
  if (happen) { dispatch(setNewBoardOnComplete()); happen = false; }
  if (!fontLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {state.resultShow ? <YouWonModal won={won} /> : null}
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
                alignItems: 'center',
              }}
            >
              <IonIcons name="arrow-back" size={35} color={state.darkMode ? '#fff' : '#464646'} style={styles.shadow} />
            </View>
        )}
        >
          <LinearGradient
            colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </TouchableOpacity>
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        onSwipeUp={(state) => onSwipeUp(state)}
        onSwipeDown={(state) => onSwipeDown(state)}
        onSwipeLeft={(state) => onSwipeLeft(state)}
        onSwipeRight={(state) => onSwipeRight(state)}
        config={config}
        getureEnabled={false}
        >
      <View style={styles.bgSquare}>
        <View style={styles.gridColumn}>
        {data.map((row, rowIndex) => (
          <View style={styles.gridRow} key={rowIndex}>
            {row.map((num, numIndex) => {
              if (num!==0) {
              return (
                <View style={{...styles.gridSquare, backgroundColor: colorCodes[num], borderColor: '#0005', borderWidth: 1,}} key={numIndex}>
                  <Text style={{...styles.numText, fontSize: (num>=128) ? 25 : 30}}>{(state.punjabiNums) ? Anvaad.unicode(num) : num}</Text>
                </View>
              )} else {
                return (<View style={styles.gridSquare} key={numIndex}></View>)
              }
            }
            )}
          </View>
          ))}
        </View>
      </View>
      </GestureRecognizer>
      <View style={styles.otherScreens}>
        <TouchableOpacity style={{width:'50%', flexDirection:'row'}} onPress={()=>{console.log("Board refreshed!"); dispatch(resetBoard())}}>
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
              <IonIcons name="reload" size={30} color={state.darkMode ? '#fff' : '#464646'} style={styles.shadow} />
            </View>
        )}
        >
          <LinearGradient
            colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
            style={{ flex: 1 }}
          />
        </MaskedView>
        <Text style={styles.optText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width:'50%', flexDirection:'row'}} onPress={()=>{console.log("Language changed to %s!", (!state.punjabiNums)?"Punjabi":"English"); dispatch(setPunjabiNums(!state.punjabiNums))}}>
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
              <IonIcons name="language" size={30} color={state.darkMode ? '#fff' : '#464646'} style={styles.shadow} />
            </View>
        )}
        >
          <LinearGradient
            colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
            style={{ flex: 1 }}
          />
        </MaskedView>
        <Text style={styles.optText}>Language</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Game2048;
