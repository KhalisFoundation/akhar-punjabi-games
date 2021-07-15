/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import Level from './levelDisplays';

import theColors from '../../util/colors';

function RightWords({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const theCorrectWords = state.correctWords;
  const theGivenUpWords = state.givenUpWords;

  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.wordsCompleted.container,
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      paddingTop: '10%',
    },
    header: {
      flexDirection: 'row',
    },
    backButton: {
      flex: 1,
    },
    backArrow: {
      width: 50,
      height: 50,
    },
    title: {
      fontSize: 32,
      flex: 3,
      right: 20,
    },
    listContainer: {
      // backgroundColor: colors.wordsCompleted.listContainer,
      width: '95%',
      height: '60%',
      padding: 10,
    },
    answerBox: {
      backgroundColor: colors.wordsCompleted.answerBox,
      width: '95%',
      height: '30%',
      borderRadius: 20,
    },
    answerRow: {
      flexDirection: 'row',
    },
    answerText: {
      fontSize: 20,
      color: colors.wordsCompleted.answerText,
    },
    answerForAnswerText: {
      fontSize: 20,

      color: colors.wordsCompleted.answerForAnswerText,
    },
  });

  const longestMeaning = {
    engText: '',
    punjabiText: '',
    meaning: '',
    type: '',
    level: '',
    status: '',
  };

  const [showAnswer, setAnswer] = React.useState(longestMeaning);

  const theWords = theCorrectWords.map((word) => {
    return {
      ...word,
      status: 'Answered correctly',
    };
  });
  theGivenUpWords.map((word) => {
    theWords.push({
      ...word,
      status: 'Given Up',
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
  for (let i = 0; i < 22; i += 1) {
    levels.push({
      key: String(i + 1),
      text: `Level ${String(i + 1)}`,
      words: levelsWithWords[i + 1],
    });
  }

  function meaningLength(meaning) {
    if (meaning.length < 60) {
      return <Text style={styles.answerForAnswerText}>{meaning}</Text>;
    }
    let theMeaning = [];
    for (let i = 0; i < meaning.length; i += 1) {
      if (i % 50 === 0 && i !== 0) {
        theMeaning.push('-');
        theMeaning.push('\n');
      }
      theMeaning.push(meaning[i]);
    }
    theMeaning = theMeaning.join('');
    return (
      <Text style={{ ...styles.answerForAnswerText, fontSize: 12 }}>
        {theMeaning}
      </Text>
    );
  }

  const renderItem = React.useCallback(({ item }) => {
    return (
      <Level title={item.text} theWords={item.words} setAnswer={setAnswer} />
    );
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          title="Home"
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Image
            source={require('../../images/left_arrow.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Words Completed</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          // style={styles.listContainer}
          data={levels}
          renderItem={renderItem}
        />
      </View>

      <View style={styles.answerBox}>
        <View style={styles.answerRow}>
          <Text style={styles.answerText}>Gurmukhi Text</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={styles.answerForAnswerText}>
            {showAnswer.punjabiText}
          </Text>
        </View>
        <View style={styles.answerRow}>
          <Text style={styles.answerText}>English Text</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={styles.answerForAnswerText}>{showAnswer.engText}</Text>
        </View>
        <View style={styles.answerRow}>
          <Text style={styles.answerText}>Meaning</Text>
          <Text style={styles.answerText}> : </Text>
          {meaningLength(showAnswer.meaning)}
        </View>
        <View style={styles.answerRow}>
          <Text style={styles.answerText}>Level</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={styles.answerForAnswerText}>{showAnswer.level}</Text>
        </View>
        <View style={styles.answerRow}>
          <Text style={styles.answerText}>Type</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={styles.answerForAnswerText}>{showAnswer.type}</Text>
        </View>
        <View style={styles.answerRow}>
          <Text style={styles.answerText}>Status</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={styles.answerForAnswerText}>{showAnswer.status}</Text>
        </View>
      </View>
    </View>
  );
}

export default RightWords;
