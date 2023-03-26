/* eslint-disable no-nested-ternary */
/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView
} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as Anvaad from 'anvaad-js';
import { SafeAreaView } from 'react-native-safe-area-context';
import Level from './levelDisplays';
import { showMeaningPopUp } from '../../redux/actions';
import dimensions from '../../util/dimensions';

function RightWords({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();
  const theCorrectWords = state.correctWords;
  const theGivenUpWords = state.givenUpWords;
  const { width } = dimensions;
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
    Prabhki: require('../../assets/fonts/Prabhki.ttf'),
  });
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: '#D1FBFF',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
    },
    downStyle: {
    },
    arrow: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      height: width * 0.09,
      width: width * 0.09,
      marginBottom: 20,
      backgroundColor: '#fff',
      borderRadius: width * 0.05,
      elevation: 5,
    },
    listContainer: {
      // backgroundColor: colors.wordsCompleted.listContainer,
      height: '70%',
      width: '95%',
      paddingBottom: 5,
      paddingTop: 10
    },
    listContainerFull: {
      height: '88%',
      width: '95%',
      paddingBottom: 30,
      paddingTop: 10
    },
    answerBoxAlt: {
      height: 25,
      width: '95%',
    },
    answerBox: {
      backgroundColor: '#fff',
      width: '95%',
      height: '20%',
      borderRadius: 20,
      padding: 15,
      elevation: 5,
    },
    answerRow: {
      flexDirection: 'row',
    },
    answerRowAlt: {
      display: 'none'
    },
    answerText: {
      fontSize: width * 0.04,
      color: '#464646',
      fontFamily: 'Muli'
    },
    answerForAnswerText: {
      fontSize: width * 0.04,
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
    }
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
  for (let i = 0; i < state.ALL_WORDS.levels.length - 1; i += 1) {
    if (levelsWithWords[i + 1]) {
      levels.push({
        key: String(i + 1),
        text: `Level ${String(i + 1)}`,
        words: levelsWithWords[i + 1],
      });
    }
  }
  levels.push({
    key: 'end',
    text: `${(state.finalLevel - state.levelProgress[0].level - 1 > 0)
      ? ((state.levelProgress[0].wordsNeeded !== 10 && state.finalLevel !== 8)
        ? state.finalLevel - state.levelProgress[0].level - 1
        : state.finalLevel - state.levelProgress[0].level)
      : 'Building'} more levels to play`,
    words: [],
  });

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
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#00E9FE"
        barStyle="dark-content"
      />
      <View
        style={[(!state.meaningPopup) ? styles.downStyle : null, {
          width: '100%', height: width * 0.175, backgroundColor: '#00E9FE', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 5
        }]}
      >
        <IonIcons
          name="chevron-back"
          color="#000"
          style={{ position: 'absolute', left: 10 }}
          size={width * 0.07}
          onPress={() => { navigation.navigate('AkharJor'); }}
        />
        <Text style={{
          color: '#000',
          fontSize: width * 0.05,
          fontFamily: 'Muli',
          margin: 0,
        }}
        >
          Completed Levels
        </Text>
      </View>
      <View style={state.meaningPopup ? styles.listContainerFull : styles.listContainer}>
        {
          state.x
        }
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
          <Icon name={state.meaningPopup ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={width * 0.09} color="#274C7C" style={styles.shadow} />
        </TouchableOpacity>
        <View style={state.meaningPopup ? styles.answerRowAlt : styles.answerRow}>
          <Text style={[styles.answerForAnswerText, { color: showAnswer.color, fontSize: width * 0.08, fontFamily: 'Prabhki' }]}>
            {showAnswer.engText}
          </Text>
          {/* to be asked */}
          { (showAnswer.engText) ? (
            <Text style={[styles.answerForAnswerText, {
              color: showAnswer.color, fontSize: width * 0.04, fontFamily: 'Muli', marginTop: 5
            }]}
            >
              {' {'}
              {Anvaad.translit(showAnswer.engText)}
              {'}'}
            </Text>
          )
            : (
              <Text style={[styles.answerText, { fontSize: width * 0.04, fontFamily: 'Muli', marginTop: 5 }]}>
                Select any word to know more!
              </Text>
            )}
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
        {showAnswer.status ? (
          <View style={state.meaningPopup ? styles.answerRowAlt : styles.answerRow}>
            <Text style={styles.answerText}>Status</Text>
            <Text style={styles.answerText}> : </Text>
            <Text style={[styles.answerForAnswerText, { color: showAnswer.color, fontFamily: 'Muli' }]}>
              {showAnswer.status}
            </Text>
          </View>
        )
          : null}
      </View>
    </SafeAreaView>
  );
}

export default RightWords;
