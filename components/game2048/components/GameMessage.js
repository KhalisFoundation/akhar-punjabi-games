import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import YouWonModal from '../resultModal';

const { height, width } = Dimensions.get('window');

const GameMessage = (props) => {
  const containerStyle = (props.won || props.over)
    ? { width: width , height: height }
    : { width: 0, height: 0 };
  if (props.won) {
    return <YouWonModal style={containerStyle} won={props.won} onRestart={props.onTryAgain}/>;
  }
  if (props.over) {
    return <YouWonModal style={containerStyle} won={props.won} onRestart={props.onTryAgain}/>;
  }
  return (<View></View>)
}

export default GameMessage;
