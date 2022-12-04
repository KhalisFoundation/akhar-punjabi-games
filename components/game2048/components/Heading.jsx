/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-native/no-color-literals */
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Dimensions, { width } from '../../../util/dimensions';

function Heading(props) {
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
    }
  });

  return (
    <View
      style={styles.container}
    >
      <View style={styles.upBox}>
        <Text style={styles.upText}>
          Best
          {': '}
          {props.best}
        </Text>
      </View>
      <View style={styles.upBox}>
        <Text style={styles.upText}>
          Score
          {': '}
          {props.score}
        </Text>
      </View>
    </View>
  );
}

export default Heading;
