/* eslint-disable react-native/no-color-literals */
import * as Anvaad from 'anvaad-js';
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions
} from 'react-native';
import * as Speech from 'expo-speech';

import { useSelector, useDispatch } from 'react-redux';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import theColors from '../../util/colors';
import { showMeaningPopUp } from '../../redux/actions';

function Level({ title, theWords, setAnswer }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
  const [up, setUp] = useState(false);

  const colors = theColors[state.darkMode];
  const screenWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
    },
    wordsStyle: {
      width: '90%',
      alignSelf: 'center',
      borderBottomWidth: 1,
      borderColor: 'black'
    },
    title: {
      padding: 5,
      paddingBottom: 10,
      fontWeight: 'bold',
      height: 50,
      fontSize: (screenWidth<370 ? 24 : 30),
      textAlign: 'center',
    },
    flatList: {},
    flatListAlt: { display: 'none' },
    wordEven: {
      backgroundColor: colors.levelDisplay.wordEven,
    },
    wordOdd: {
      backgroundColor: colors.levelDisplay.wordOdd,
    },
    wordText: {
      fontSize: (screenWidth<370 ? 33 : 40),
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: '#ffbb00'
    },
    levels: { backgroundColor: state.darkMode ? 'black' : 'white', elevation: 5, borderRadius: 15 }
  });

  let words = theWords;
  if (words === undefined) {
    words = [];
  }
  const renderItem = React.useCallback(({ item }) => {
    let a = 0;
    a += 1;
    let wordStyle;
    if (a % 2 === 0) {
      wordStyle = styles.wordEven;
    } else {
      wordStyle = styles.wordOdd;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          // console.log(item.meaning);
          setAnswer(item);
          dispatch(showMeaningPopUp(false));
          // Speech.speak(Anvaad.translit(item.engText));
        }}
      >
        <View style={[wordStyle, styles.wordsStyle]}>
          <Text style={styles.wordText}>{Anvaad.unicode(item.engText)}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.levels}>
        <TouchableOpacity onPress={() => { setUp(!up); }}>
          <MaskedView
            style={{ ...styles.title, width: '100%' }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                }}
              >
                <Text style={styles.title}>{title}</Text>
              </View>
          )}
          >
            <LinearGradient
              colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </TouchableOpacity>
      </View>
      <FlatList
        style={up ? styles.flatListAlt : styles.flatList}
        keyExtractor={(word) => word.engText}
        data={words}
        scrollEnabled
        renderItem={renderItem}
      />
    </View>
  );
}

export default Level;
