/* eslint-disable react-native/no-color-literals */
import * as Anvaad from 'anvaad-js';
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform
} from 'react-native';
// import * as Speech from 'expo-speech';

import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import theColors from '../../util/colors';
import { showMeaningPopUp } from '../../redux/actions';
import dimensions from '../../util/dimensions';

function Level({
  levelId, title, theWords, setAnswer
}) {
  const dispatch = useDispatch();
  const { width } = dimensions;
  const [up, setUp] = useState(false);
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
    Nasa: require('../../assets/fonts/Nasalization.otf'),
  });

  const colors = theColors.false;

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
      fontFamily: 'Muli',
      fontWeight: '400',
      height: width * 0.125,
      fontSize: width * 0.06,
      textAlign: 'center',
    },
    flatList: {
      // set bottom border radius of last child of flatlist
    },
    flatListAlt: { display: 'none' },
    wordEven: {
      backgroundColor: colors.levelDisplay.wordEven,
    },
    wordOdd: {
      backgroundColor: colors.levelDisplay.wordOdd,
    },
    wordText: {
      fontSize: width * 0.08,
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: '#ffbb00'
    },
    levels: {
      backgroundColor: '#def',
      elevation: 5,
      borderRadius: 15,
      borderColor: '#446',
      borderWidth: 0.3,
      marginHorizontal: Platform.OS === 'android' ? 8 : 0,
      marginBottom: (levelId === 'end') ? 15 : 0
    }
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

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.levels}>
        <TouchableOpacity onPress={() => { setUp(!up); }}>
          <View
            style={{
              ...styles.title, width: '100%'
            }}
          >
            <Text style={{
              ...styles.title, color: '#274C7C', textShadowColor: '#274C7C', textShadowRadius: 1
            }}
            >
              {title}
            </Text>
          </View>
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
