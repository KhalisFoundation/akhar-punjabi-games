/* eslint-disable no-nested-ternary */
/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View, StyleSheet, Text
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import * as Animatable from 'react-native-animatable';
import AppLoading from 'expo-app-loading';
import dimensions from '../../util/dimensions';
import { setAttempt } from '../../redux/actions';

export const AttemptInput = () => {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    GurbaniAkharSG: require('../../assets/fonts/GurbaniAkharSG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
  });

  const { width } = dimensions;
  const maxLength = () => {
    if (state.firstLength > state.secondLength) {
      return state.firstLength;
    }
    return state.secondLength;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 10,
      backgroundColor: '#transparent',
      elevation: 5,
    },
    wordAttemptView: {
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      backgroundColor: (maxLength() < state.attempt.length) ? '#dd4444' : '#b34e00',
      borderWidth: 1,
      borderColor: (maxLength() < state.attempt.length) ? '#bb0000' : '#ff882c',
      borderRadius: 15,
      elevation: 5,
    },
    wordAttempt: {
      opacity: 0.8,
      color: 'white',
      borderRadius: 100,
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: width > 500 ? width * 0.06 : width * 0.08,
      fontFamily: 'GurbaniAkharSG'
    },
    backspace: {
      textAlign: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      fontSize: width > 500 ? width * 0.035 : width * 0.05,
      padding: 8,
    }
  });
  const matras = ['I', 'u', 'U', 'y', 'Y', 'o', 'O', 'M', 'N', '`', '~', 'Í', 'R', 'H'];
  function gurmukhi(text) {
    if (matras.includes(text)) {
      return ` ${text}`;
    }
    return text;
  }

  const refresh = () => {
    dispatch(setAttempt(''));
  };

  const FlashView = () => {
    return (
      <Animatable.View animation="flash" duration={1000} iterationCount={3} onAnimationEnd={() => { refresh(); }} style={styles.wordAttemptView}>
        <Text style={styles.wordAttempt}>{gurmukhi(state.attempt)}</Text>
      </Animatable.View>
    );
  };

  const NormalView = () => {
    return (
      <View
        style={{ ...styles.wordAttemptView }}
      >
        {/* flash for a sec if letter is worng and length greater than longest word */}
        <Text
          style={styles.wordAttempt}
          selectable
        >
          {gurmukhi(state.attempt)}
        </Text>
        <IconM
          name="backspace"
          color="white"
          style={styles.backspace}
          onPress={() => {
            dispatch(setAttempt(state.attempt.slice(0, -1)));
          }}
        />
        {/* <TouchableOpacity
                style={{ padding: 10}}
                onPress={() => {dispatch(setAttempt(state.attempt.slice(0,-1)))}}
              >
              <Icon
                name="backspace"
                color={'white'}
                size={width*0.05}/>
              </TouchableOpacity> */}
        {/* <Text style={{...styles.wordAttempt, paddingEnd:75*(width/height)}}>
              {Anvaad.unicode(state.attempt)}
            </Text>
            <IconM name="backspace"
              color={"white"}
              size={width*0.055}
              style={{
                  position: 'absolute',
                  right:0, alignSelf:'center',
                  justifyContent:'flex-end',
                  padding: 10
              }}
              onPress={() => {dispatch(setAttempt(state.attempt.slice(0,-1)))}} /> */}
      </View>
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      { (state.attempt !== '')
        ? ((maxLength() < state.attempt.length) ? <FlashView /> : <NormalView />)
        : null }
    </View>
  );
};
