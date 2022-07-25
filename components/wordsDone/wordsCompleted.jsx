/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
  Platform,
  Dimensions
} from 'react-native';
import { Header } from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import Level from './levelDisplays';
import { showMeaningPopUp } from '../../redux/actions';
import theColors from '../../util/colors';
import { useEffect } from 'react';

function RightWords({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
  const theCorrectWords = state.correctWords;
  const theGivenUpWords = state.givenUpWords;
  const screenWidth = Dimensions.get('window').width;
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
    Prabhki: require('../../assets/fonts/Prabhki.ttf'),
  });
  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.wordsCompleted.container,
      justifyContent: 'space-between',
      paddingBottom: 25,
      width: '100%',
      height: '100%'
    },
    downStyle: {
    },
    arrow: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: state.darkMode ? '#000' : '#fff',
      borderRadius: 20,
      elevation: 5,
    },
    listContainer: {
      // backgroundColor: colors.wordsCompleted.listContainer,
      height: '70%',
      width: '95%',
      paddingBottom: 5,
      paddingTop: 0
    },
    listContainerFull: {
      height: '88%',
      width: '95%',
      paddingBottom: 10,
      paddingTop: 0
    },
    answerBoxAlt: {
      height: 25,
      width: '95%'
    },
    answerBox: {
      backgroundColor: state.darkMode ? '#ffae00' : colors.wordsCompleted.answerBox,
      width: '95%',
      height: '20%',
      borderRadius: 20,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    answerRow: {
      flexDirection: 'row',
    },
    answerRowAlt: {
      display: 'none'
    },
    answerText: {
      fontSize: (screenWidth<370 ? 13 : 18),
      color: '#464646',fontFamily: 'Muli'
    },
    answerForAnswerText: {
      fontSize: (screenWidth<370 ? 13 : 18),
      color: 'green',
    },
    shadow: {
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
    arrowGradient: { flex: 1 }
  });

  const longestMeaning = {
    engText: '',
    punjabiText: '',
    meaning: '',
    level: '',
    status: '',
  };

  const [showAnswer, setAnswer] = React.useState(longestMeaning);

  const theWords = theCorrectWords.map((word) => {
    return {
      ...word,
      status: 'Answered correctly',
      color: 'green',
    };
  });
  theGivenUpWords.map((word) => {
    theWords.push({
      ...word,
      status: 'Given Up',
      color: 'red',
    });
    return 'nothing';
  });

  const levelsWithWords = {};
  theWords.map((word) => {
    if (levelsWithWords[word.level] === undefined) {
      levelsWithWords[word.level] = [word];
    } else {
      levelsWithWords[word.level].push(word);
    }
    return 'nothing';
  });
  const levels = [];
  for (let i = 0; i < 8; i += 1) { // reference to level number
    levels.push({
      key: String(i + 1),
      text: `Level ${String(i + 1)}`,
      words: levelsWithWords[i + 1],
    });
  }

  useEffect(() => {
    dispatch(showMeaningPopUp(true));
  }, []);

  const renderItem = React.useCallback(({ item }) => {
    return (
      <Level title={item.text} theWords={item.words} setAnswer={setAnswer} />
    );
  }, []);
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="black"
        barStyle={state.darkMode ? 'light-content' : 'dark-content'}
      />
      <Header
        backgroundColor={state.darkMode ? '#004ba6' : 'cyan'}
        containerStyle={[
          Platform.OS === 'android' && { height: 75, paddingTop: 0 },
          (!state.meaningPopup) ? styles.downStyle : null
        ]}
        leftComponent={(
          <Icon
            name="arrow-back"
            color={
                state.darkMode ? 'white' : 'black'
              }
            size={30}
            onPress={() => { navigation.navigate('Home'); }}
          />
          )}
        centerComponent={{
          text: 'Completed Levels',
          style: {
            color: state.darkMode ? 'white' : 'black',
            fontSize: (screenWidth<370 ? 16 : 20),
            fontFamily: 'Muli'
          }
        }}
      />

      <View style={state.meaningPopup ? styles.listContainerFull : styles.listContainer}>
        <FlatList
          // style={styles.listContainer}
          data={levels}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={state.meaningPopup ? styles.answerBoxAlt : styles.answerBox}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => { dispatch(showMeaningPopUp(!state.meaningPopup)); }}
        >
          <Icon name={state.meaningPopup ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={40} color="#274C7C" style={styles.shadow} />
        </TouchableOpacity>
        <View style={state.meaningPopup ? styles.answerRowAlt : styles.answerRow}>
          <Text style={[styles.answerForAnswerText, { color: showAnswer.color, fontSize:(screenWidth<370 ? 25 : 35), fontFamily: 'Prabhki' }]}>
            {showAnswer.engText}
          </Text>
        </View>
        <View style={state.meaningPopup ? styles.answerRowAlt : styles.answerRow}>
          <ScrollView
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            <Text style={[styles.answerForAnswerText, { color: showAnswer.color, fontFamily: 'Muli' }]}>
              {showAnswer.meaning}
            </Text>
          </ScrollView>
        </View>
        <View style={state.meaningPopup ? styles.answerRowAlt : styles.answerRow}>
          <Text style={styles.answerText}>Status</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={[styles.answerForAnswerText, { color: showAnswer.color, fontFamily: 'Muli' }]}>
            {showAnswer.status}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default RightWords;
