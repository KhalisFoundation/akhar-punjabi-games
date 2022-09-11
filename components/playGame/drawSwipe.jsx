import React, {useEffect, useRef, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, View, StyleSheet, PanResponder, Text, Dimensions } from 'react-native';
import Svg, {Polyline, Circle, Path} from 'react-native-svg';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];

export const PanRes = ({ visited, setVisited, points }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [startXY, setStartXY] = useState({x: 0, y: 0});
  const [endXY, setEndXY] = useState({x: 0, y: 0});
  const [word, setWord] = useState('');

  const pathMaker = (start, passed, end) => {
    let path;
    if (passed.length > 0) {
      path = `${start.x},${start.y} `;
      passed.forEach(point => {
        path += `${point} `
      });
      path += `${end.x},${end.y}`;
    } else {
      path = `${start.x},${start.y} ${end.x},${end.y}`;
    }
    return path;
  }

  function checkIfFound(xTouch, yTouch) {
    let foundCoordinates = '';
    let foundWord = '';
    points.map(({x,y,letter}) => {
      if((x - 20 <= xTouch && xTouch <= x + 20) && (y - 20 <= yTouch && yTouch<= y + 20)) {
        foundCoordinates = `${x},${y}`;
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
        //setPassed([]);
      },
    
      onPanResponderMove: (event, gestureState) => {
        console.log('here you are => ', gestureState.moveX, gestureState.moveY);
        pan.setValue({x: 0, y: 0});
        // setting start point if location is right
        const [res, firstLetter] = checkIfFound(gestureState.x0, gestureState.y0);
        if (!!res) {
          const [x, y] = res.split(",").map(value => parseInt(value));
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
          setVisited((v) => {
            if(!v.includes(foundCoordinate)) {
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
      }
    })
  ).current;

  return (
    <View style={styles.container}>
        <Animated.View style={{
            width: width,
            height: height,
        }}
        {...panResponder.panHandlers}
        >
        <Svg  height="100%" width="100%" style={{zIndex:-2, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        {
            points.map(({x, y, letter}) => {
              return (
              <Circle 
                cx={x}
                cy={y}
                r="20"
                stroke="black"
                strokeWidth="3"
                fill="black"
                style={{zIndex: -3}}
                key={`${x}${y}${letter}`}
              />);
            })
          }
          <Polyline
            points={pathMaker(startXY, visited, endXY)} //"M100,250 Q200,150 260,250"
            fill="none"
            stroke="black"
            strokeWidth="10"
          />
        </Svg>
        </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    width: "100%",
  },
  text: {
    color: '#fff',
  }
});
