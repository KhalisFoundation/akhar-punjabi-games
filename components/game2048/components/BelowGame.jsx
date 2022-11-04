import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback
}  from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { setPunjabiNums } from '../../../redux/actions';
import React from 'react'
import { NumText } from './NumText'	
import Dimensions, { width } from '../../../util/dimensions';

export const BelowGame = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);
  const styles = StyleSheet.create({   
    otherScreens: {
        // backgroundColor: "yellow",
        //width: 100*Dimensions.scale,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: Dimensions.size["2"],
        paddingRight: 10,
        borderRadius: 15,
      },
      optText: {
        textAlign: 'center',
        color: '#002f63',
        fontFamily: 'Muli',
        alignSelf: 'center',
        fontSize: Dimensions.size["7"],
        paddingStart: Dimensions.size["2"],
        // textShadowColor: (state.darkMode) ? 'white' : 'black',
        // textShadowOffset: {
        //   width: 0.5,
        //   height: 0.5
        // },
        // textShadowRadius: Dimensions.size["1"],
      },
    })
    
    return (
      <View style={{
        flexDirection: 'row', justifyContent: 'space-around', width: width}}>
      <TouchableOpacity onPress={props.onRestart} style={{flexDirection:'row'}} >
        <View style={styles.otherScreens}>
        <View
          style={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IonIcons name="reload" size={Dimensions.size['8']} color={'#274C77'} style={styles.shadow} />
        </View>
        <Text style={styles.optText}>Reset</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection:'row'}} onPress={()=>{console.log("Language changed to %s!", (!state.punjabiNums)?"Punjabi":"English"); dispatch(setPunjabiNums(!state.punjabiNums))}}>
        <View style={styles.otherScreens}>
          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IonIcons name="globe-outline" size={Dimensions.size['8']} color={'#274C77'} style={styles.shadow} />
          </View>
        <Text style={styles.optText}>Language</Text>
        </View>
        </TouchableOpacity>
      </View>
    )
}