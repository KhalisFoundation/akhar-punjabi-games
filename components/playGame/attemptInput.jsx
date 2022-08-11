import * as React from 'react';
import {
    View, TouchableOpacity, StyleSheet, Text, ScrollView, Animated, Dimensions
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import * as Anvaad from 'anvaad-js';
import dimensions from '../game2048/utils/dimensions';
import { setAttempt, setVisited } from '../../redux/actions';

export const AttemptInput = () => {
    const state = useSelector((theState) => theState.theGameReducer);
    const dispatch = useDispatch();
    // Animated gradient
    const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
    
    const styles = StyleSheet.create({
        wordAttemptView: {
          flexDirection: 'row',
          marginTop: 10,
          padding: 5,
          backgroundColor: "#f8f",
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        },
        wordAttempt: {
          width: "75%",
          height: "100%",
          opacity: 0.8,
          color: state.darkMode ? 'darkblue' : 'white',
          borderRadius: 100,
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 30,
        },
    });

    return (
        <AnimatedLinearGradient
        colors={state.darkMode ? ['#dca104', '#ff8a00'] : ['#274C7C', '#274C7C']}
        style={styles.wordAttemptView}
      >
        <Text style={styles.wordAttempt} placeHolder="Word">
          {Anvaad.unicode(state.attempt)}
        </Text>
        
      {(state.attempt == "") ? 
        <View style={{borderRadius: 25,
            height: 40,
            width: 40,alignSelf: 'center'}}></View> : 
      <TouchableOpacity
      style={{
        backgroundColor: state.darkMode ? 'black' : 'white',
        borderRadius: 25, 
        height: 40, 
        width: 40, 
        justifyContent: 'center',
        }}
        onPress={() => {
          dispatch(setVisited([]));
          dispatch(setAttempt(''));
        }}
      >
        <MaskedView
          style={{
            height: (dimensions.size["14"]+dimensions.size["16"])/2.02,
            width: (dimensions.size["14"]+dimensions.size["16"])/2.02
          }}
          maskElement={(
            <View
              style={{
                backgroundColor: 'transparent',
                alignItems: 'center',
                padding: 5
              }}
            >
              <IconM name="reload" size={dimensions.size["10"]} />
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
    )
};