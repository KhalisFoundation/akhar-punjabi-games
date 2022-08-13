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
import Dimensions from '../utils/dimensions'

export const BelowGame = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);
  const styles = StyleSheet.create({   
    otherScreens: {
        flexDirection: 'row',
        // backgroundColor: "yellow",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width:'80%',
        backgroundColor: state.darkMode ? '#035': '#fff',
        padding: Dimensions.size["4"],
        borderRadius: Dimensions.size["10"],
        margin: Dimensions.size["4"]
      },
      optText: {
        textAlign: 'center',
        color: state.darkMode ? '#fff' : '#000',
        fontFamily: 'Muli',
        alignSelf: 'center',
        fontSize: Dimensions.size["7"],
        textShadowColor: (state.darkMode) ? 'white' : 'black',
        textShadowOffset: {
          width: 0.5,
          height: 0.5
        },
        textShadowRadius: Dimensions.size["1"],
      },
    })
    
    return (
        <View style={styles.otherScreens}>
        <TouchableOpacity onPress={props.onRestart} style={{width:'50%', flexDirection:'row'}} >
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
            colors={['#274CCC', (state.darkMode)?'#00E9FE':'#274C77']}
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
            colors={['#274CCC', (state.darkMode)?'#00E9FE':'#274C77']}
            style={{ flex: 1 }}
          />
        </MaskedView>
        <Text style={styles.optText}>Language</Text>
        </TouchableOpacity>
      </View>
    )
}