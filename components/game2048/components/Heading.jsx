import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
}  from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { NumText } from './NumText';
import Dimensions, { width } from '../../../util/dimensions';
import { openHelpModal } from '../../../redux/actions';
import Help from './help';


function Heading(props) {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);

const styles = StyleSheet.create({
    headingTitle:{
      fontSize:Dimensions.size["12"],
      color: '#776E65'
    },
    upBox: {
      backgroundColor: '#035',
      padding: Dimensions.size["4"],
      borderRadius: 50,
      alignSelf: 'center',
      alignItems: 'center'
    },
    upText: {
      color: 'white',
      fontSize: 15,
      fontFamily: 'Muli'
    }
  })

  return (
      <View
        style={{justifyContent: 'space-around', flexDirection: 'row', width: width}}>  
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
  )
}

export default Heading;
