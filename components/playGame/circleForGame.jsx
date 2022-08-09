/* eslint-disable react-native/no-color-literals */
import * as Anvaad from 'anvaad-js';
import * as React from 'react';

import {
  Text, StyleSheet, TouchableOpacity, Animated, Easing, View, Dimensions, PanResponder
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useRef,useEffect } from 'react';
import {
  setAttempt
} from '../../redux/actions';
import Svg, {Polyline, Circle, Path} from 'react-native-svg';

export const TheCircle = ({ visited, setVisited, word, setWord }) => {
  // there can only be from 2-18 characters as input
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
  function gurmukhi(text) {
    if (state.romanised) {
      return Anvaad.translit(text);
    }
    return Anvaad.unicode(text);

  }
  function touchedMe(object, final) {
    console.log(`${object} was touched!`);
    dispatch(setAttempt(final));
  }
  const { charArray } = state;
  const prevAttempt = state.attempt;
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const points = [];
  
  //animations
  const animatedValue = new Animated.Value(0);

  const buttonScale = animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.05, 1.1]
  });

  
  useEffect(() => {
    console.log(visited)
  }, [visited])

  // const buttonRotate = animatedValue.interpolate({
  //     inputRange: [0, 0.5, 1],
  //     outputRange: ['0deg', '90deg', '180deg']
  // })

  const onPressIn = () => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
  }

  const onPressOut = () => {
      Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true
        }).start();
  };

  const animatedScaleStyle = {
      transform: [{scale: buttonScale}]
  };

  // // rotation animations
  // const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

  // const handleAnimation = () => {
  //   Animated.timing(rotateAnimation, {
  //     toValue: 1,
  //     duration: 800,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     rotateAnimation.setValue(0);
  //   });
  // };

  // const interpolateRotating = rotateAnimation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '720deg'],
  // });

  // const animatedStyle = {
  //   transform: [
  //     {
  //       rotate: interpolateRotating,
  //     },
  //   ],
  //   width: screenWidth
  // };


  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    lettersCircle: {
      height: width,
      width: width,
    },
    clearBox: {
      width: 0.12*width,
      height: 0.12*width,
      justifyContent: 'center',
      alignItems: 'center'
    },
    characterText: {
      paddingBottom: 5,
      fontSize: state.romanised ? 22.5 : 30,
      color: state.darkMode ? 'darkblue' : '#FF7E00',
      textAlign: 'center',
    },
    commonChar: {
      position: 'absolute',
      width: 0.12*width,
      height: 0.12*width,
      backgroundColor: state.darkMode ? '#FF7E00' : '#274C7C',
      elevation: 5,
      borderRadius: 25,
      justifyContent: 'center',
    }
  });

  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
  let angle = 0;

  const radius =  110;
  const step = (2 * Math.PI) / charArray.length;
  const new_height = width;
  const new_width = width;

  charArray.map((char) => {
    const x = Math.round(radius * Math.cos(angle)) + width/2.5;
    const y = Math.round(radius* Math.sin(angle)) + width/2.5;
    //console.log("height: %d, width: %d, x %d, y %d", new_height, new_width, x, y)
    // let theLetter = String.fromCharCode(char);
    angle += step;
    points.push({ x, y, letter:char });
  })

  // pan responder for swipes
  const pan = useRef(new Animated.ValueXY()).current;
  const [startXY, setStartXY] = useState({x: 0, y: 0});
  const [endXY, setEndXY] = useState({x: 0, y: 0});

  useEffect(() => {
    console.log('word:', word);
  }, [word]);

  const pathMaker = (start, passed, end) => {
    let path;
    if (passed.length > 0) {
      path = `${start.x},${start.y} `;
      passed.forEach(point => {
        path += `${point.x},${point.y} `;
      });
      path += `${end.x},${end.y}`;
    } else {
      path = `${start.x},${start.y} ${end.x},${end.y}`;
    }
    return path;
  }

  function checkIfFound(xTouch, yTouch) {
    let foundCoordinates;
    let foundWord = '';
    points.map(({x,y,letter}) => {
      if((x - 20 <= xTouch && xTouch <= x + 20) && (y - 20 <= yTouch && yTouch<= y + 20)) {
        foundCoordinates = {x, y};
        foundWord = letter;
    }});
    return [foundCoordinates, foundWord];
  }

  const panResponder = useRef(
    PanResponder.create({      
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
      onPanResponderGrant:  (event, gestureState) => {
        setStartXY({x: 0, y: 0});
        setEndXY({x: 0, y: 0});
        console.log('grant');
        //setPassed([]);
      },
    
      onPanResponderMove: (event, gestureState) => {
        console.log('here you are => ', gestureState.moveX, gestureState.moveY);
        pan.setValue({x: 0, y: 0});
        // setting start point if location is right
        const [res, firstLetter] = checkIfFound(gestureState.x0, gestureState.y0);
        if (!!res) {
          const {x, y} = res;
          setStartXY({x, y});
          setWord((w) => {
            if (!w.includes(firstLetter)) {
              return w + firstLetter;
            }
            return w;
          });
        } else {
          setStartXY({x: "", y: ""});
        }

        const [foundCoordinate, foundWord] = checkIfFound(gestureState.x0 + gestureState.dx, gestureState.y0 + gestureState.dy);
        if (!!foundCoordinate) {
          const {x, y} = foundCoordinate;
          setVisited((v) => {
            if(!v.some(foundCoordinate => foundCoordinate.x === x && foundCoordinate.y === y)) {
              return [...v, foundCoordinate]
            }
            return v;
          });
          setWord((w) => {
            if (!w.includes(foundWord)) {
              return w + foundWord;
            }
            return w;
          });
        }
        setEndXY({x: gestureState.moveX, y: gestureState.moveY});
      },
    
      onPanResponderRelease: (event, gestureState) => {
        setStartXY({x: 0, y: 0});
        setEndXY({x: 0, y: 0});
        setVisited([]);
        setWord('');
        console.log('release');
      }
    })
  ).current;


 

  //  const colorCombos = [['#E233FF', '#FF6B00'],
  // ['#FF0076', '#590FB7'], ['#ffc500', '#c21500'], ['#182848', '#4b6cb7'],
  // ['#e43a15', '#e65245'], ['#480048', '#c04848'], ['#dc2424', '#4a569d'], ['#4776e6', '#8e54e9'],
  // ['#16222a', '#3a6073'], ['#ff8008', '#ffc837'], ['#eb3349', '#f45c43'], ['#aa076b', '#61045f'],
  // ['#ff512f', '#dd2476'], ['#e55d87', '#5fc3e4'], ['#c31432', '#240b36']];
  // const colorRandom = Math.floor(Math.random() * colorCombos.length);
  // const [colorCenter] = useState(colorCombos[colorRandom]);;
  return (
    <Animated.View 
      style={[styles.container, {height: width, width: width, position: "relative"}]}
      {...panResponder.panHandlers}
      onPress={() => {
        let final;

        if (prevAttempt === undefined) {
          final = char;
        } else if (char === 'i' && prevAttempt !== '') {
          /* reason for doing this is so you can type ਰਹਿਣ correctly.
          If this if wasn't there you would need to type ਰਹਿਣ as ਰਿਹਣ to get correct answer
          because ਰਹਿਣ changes to ਰਹਣਿ */
          const prevString = prevAttempt.substring(
            0,
            prevAttempt.length - 1
          );
          final = prevString + char + prevAttempt[prevAttempt.length - 1];
        } else {
          final = prevAttempt + char;
        }
        touchedMe(char, final);
      }}>
    <AnimatedLinearGradient
      colors={['transparent', 'transparent']}
      style={styles.lettersCircle}
    >
        <Svg  height={height} width={width} style={{zIndex:-1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
          <Polyline
            points={pathMaker(startXY, visited, endXY)} //"M100,250 Q200,150 260,250"
            fill="none"
            stroke="white"
            strokeWidth="10"
          />
        </Svg>
      
    {points.map(({x, y, letter}) => {
      let char = letter;
      let theLetter = gurmukhi(char);
      return (<TouchableOpacity
        onPress={() => {
          let final;
  
          if (prevAttempt === undefined) {
            final = char;
          } else if (char === 'i' && prevAttempt !== '') {
            /* reason for doing this is so you can type ਰਹਿਣ correctly.
            If this if wasn't there you would need to type ਰਹਿਣ as ਰਿਹਣ to get correct answer
            because ਰਹਿਣ changes to ਰਹਣਿ */
            const prevString = prevAttempt.substring(
              0,
              prevAttempt.length - 1
            );
            final = prevString + char + prevAttempt[prevAttempt.length - 1];
          } else {
            final = prevAttempt + char;
          }
          touchedMe(char, final);
        }}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          key={char}
          style={{
            ...styles.commonChar,
            ...animatedScaleStyle,
            left: x,
            top: y,
            zIndex: -1,
          }}
        >
          <Text key={char} style={{...styles.characterText, zIndex: -1,}}>
            {theLetter}
          </Text>
        </TouchableOpacity>)
    })}
      {(state.attempt == "") ? <View style={{borderRadius: 25,
          height: 40,
          width: 40,alignSelf: 'center'}}></View> :
      <TouchableOpacity
        style={{
          backgroundColor: state.darkMode ? 'black' : 'white',
          borderRadius: 25,
          height: 40,
          width: 40,
          alignSelf: 'center',
          top: new_height,
          elevation: 5, 
          ...animatedScaleStyle
        }}
        onPress={() => {
          dispatch(setAttempt(''));
        }}
      >
        <MaskedView
          style={{
            height: 50,
            width: 50
          }}
          maskElement={(
            <View
              style={{
                backgroundColor: 'transparent',
                padding: 5
              }}
            >
              <IconM name="reload" size={30} color="black" style={styles.clearBox} />
            </View>
        )}
        >
          <LinearGradient
            colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </TouchableOpacity>}

    </AnimatedLinearGradient>
    </Animated.View>
  );
}

