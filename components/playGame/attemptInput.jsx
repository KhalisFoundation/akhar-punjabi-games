import * as React from 'react';
import {
    View, TouchableOpacity, StyleSheet, Text, ScrollView, Animated, Dimensions
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import * as Anvaad from 'anvaad-js';
import * as Animatable from 'react-native-animatable';
import dimensions from '../../util/dimensions';
import { setAttempt, setVisited } from '../../redux/actions';

export const AttemptInput = ({setWord}) => {
    const state = useSelector((theState) => theState.theGameReducer);
    const dispatch = useDispatch();
    // Animated gradient
    const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
    const [fontsLoaded] = useFonts({
      Arial: require('../../assets/fonts/Arial.ttf'),
      GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
      Bookish: require('../../assets/fonts/Bookish.ttf'),
      Mochy: require('../../assets/fonts/Mochy.ttf'),
      Muli: require('../../assets/fonts/Muli.ttf'),
    });

    const maxLength= () => {
      if (state.firstLength > state.secondLength) {
        return state.firstLength;
      }
      return state.secondLength;
    }

    const styles = StyleSheet.create({
      container: {
        height: 60,
        width:'100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: "#transparent",
        elevation: 5,
      },
      wordAttemptView: {
          height: 60,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 20,
          backgroundColor: (maxLength() < state.attempt.length) ? "#dd4444" : "#b34e00",
          borderWidth: 1,
          borderColor: (maxLength() < state.attempt.length) ? "#bb0000" : "#ff882c",
          borderRadius: 15,
          elevation: 5,
        },
        wordAttempt: {
          height: "100%",
          opacity: 0.8,
          color: 'white',
          borderRadius: 100,
          justifyContent: 'center',
          textAlign: 'center',
          fontSize:  dimensions.size['12'],
        },
    });

    const refresh = () => {
      dispatch(setAttempt(""));
    };

    const FlashView = () => {
      return (
        <Animatable.View animation="flash" duration={1000} iterationCount={3} onAnimationEnd={()=> {refresh()}}>
          <View style={styles.wordAttemptView}>
            <Text style={styles.wordAttempt}>{Anvaad.unicode(state.attempt)}</Text>
          </View>
        </Animatable.View>
      );
    }

    const NormalView = () => {
      return (
        <View
            style={styles.wordAttemptView}
          >
            {/* flash for a sec if letter is worng and length greater than longest word */}

          <Text style={styles.wordAttempt}>
            {Anvaad.unicode(state.attempt)}
          </Text>
          <TouchableOpacity
            style={{
                marginStart: 10,
                marginTop: 3,
                alignSelf:'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                dispatch(setAttempt(state.attempt.slice(0,-1)));
              }}
            >
            <IconM name="backspace" style={{alignSelf: 'center'}} color={"white"} size={dimensions.size['8']} />
            
          </TouchableOpacity>
          
        </View>
      );
    };

    return (
      <View style={styles.container}>
        { (state.attempt !== "") ? ((maxLength() < state.attempt.length) ? <FlashView /> :  <NormalView />) : null }
      </View>
    );
};