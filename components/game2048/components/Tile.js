/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/sort-comp */
/* eslint-disable react-native/no-color-literals */
import {
  StyleSheet,
  Animated,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { NumText } from './NumText';
import Dimensions from '../../../util/dimensions';

const { width } = Dimensions.get('window');

const MARGIN_WIDTH = width*0.01;
const ITEM_WIDTH = (width - width*0.2 - MARGIN_WIDTH * 10) / 4;

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    borderRadius: width*0.02,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: MARGIN_WIDTH,
    borderColor: '#0005',
    borderWidth: Dimensions.size['1'] / 2,
  },
  tileText: {
    fontSize: width*0.5,
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1
  }
});

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
};

export default class Tile extends React.Component {
  mate = () => {
    return useSelector((theState) => theState.theGameReducer);
  }

  componentWillMount() {
    this.aimatedScale = new Animated.Value(0.1);
  }

  componentDidMount() {
    Animated.spring(this.aimatedScale, {
      // tension: 80,
      // friction: 15,
      velocity: 30,
      // bounciness: 16,
      toValue: 1,
      useNativeDriver: false
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps');
    this.isHorizontalMove = nextProps.x !== this.props.x;
    const fromVal = (this.isHorizontalMove
      ? this.props.x
      : this.props.y) * (ITEM_WIDTH + MARGIN_WIDTH * 2) + MARGIN_WIDTH * 2;
    this.aimationValue = new Animated.Value(fromVal);
  }

  componentDidUpdate() {
    Animated.timing(this.aimationValue, {
      // easing: Easing.back(),
      duration: 150,
      useNativeDriver: false,
      toValue: (this.isHorizontalMove
        ? this.props.x
        : this.props.y) * (ITEM_WIDTH + MARGIN_WIDTH * 2) + MARGIN_WIDTH * 2,
    }).start();
  }

  render() {
    const tilePositionStyle = {
      left: this.props.previousPosition && this.isHorizontalMove
        ? this.aimationValue
        : this.props.x * (ITEM_WIDTH + MARGIN_WIDTH * 2) + MARGIN_WIDTH * 2,
      top: this.props.previousPosition && !this.isHorizontalMove
        ? this.aimationValue
        : this.props.y * (ITEM_WIDTH + MARGIN_WIDTH * 2) + MARGIN_WIDTH * 2,
      width: ITEM_WIDTH,
      height: ITEM_WIDTH,
    };

    const animatedScaleStyle = {
      transform: [{ scale: this.aimatedScale }],
      ...styles.tileText
    };

    return (
      <Animated.View style={[styles.tile,
        { backgroundColor: colorCodes[this.props.value] }, tilePositionStyle]}
      >
        <Animated.Text style={animatedScaleStyle}><NumText num={this.props.value} /></Animated.Text>
      </Animated.View>
    );
  }
}
