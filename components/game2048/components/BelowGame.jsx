/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-native/no-color-literals */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { setPunjabiNums } from '../../../redux/actions';
import Dimensions, { width } from '../../../util/dimensions';

export const BelowGame = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);
  const styles = StyleSheet.create({
    container: { flexDirection: 'row', justifyContent: 'space-around', width },
    otherScreens: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: Dimensions.size['2'],
      paddingRight: 10,
      borderRadius: 15,
    },
    optText: {
      textAlign: 'center',
      color: '#002f63',
      fontFamily: 'Muli',
      alignSelf: 'center',
      fontSize: width * 0.05,
      paddingStart: Dimensions.size['2'],
      // textShadowColor: (state.darkMode) ? 'white' : 'black',
      // textShadowOffset: {
      //   width: 0.5,
      //   height: 0.5
      // },
      // textShadowRadius: Dimensions.size["1"],
    },
    icon: {
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: { flexDirection: 'row' },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onRestart} style={styles.box}>
        <View style={styles.otherScreens}>
          <View style={styles.icon}>
            <IonIcons name="reload" size={width*0.055} color="#274C77" style={styles.shadow} />
          </View>
          <Text style={styles.optText}>Reset</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          console.log('Language changed to %s!', (!state.punjabiNums) ? 'Punjabi' : 'English');
          dispatch(setPunjabiNums(!state.punjabiNums));
        }}
      >
        <View style={styles.otherScreens}>
          <View
            style={styles.icon}
          >
            <IonIcons name="globe-outline" size={width*0.055} color="#274C77" style={styles.shadow} />
          </View>
          <Text style={styles.optText}>Language</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
