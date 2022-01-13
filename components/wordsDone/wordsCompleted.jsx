/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  ScrollView
} from 'react-native';
import { Header } from "react-native-elements";
import { useSelector } from 'react-redux';
import Level from './levelDisplays';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import GLOBAL from "../../util/globals";
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
      marginTop: '3.5%',
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
      fontFamily: 'Arial',
      flex: 3,
      fontWeight: 'bold',
      right: 20,
    },
    listContainer: {
      // backgroundColor: colors.wordsCompleted.listContainer,
      width: '95%',
      height: '60%',
      padding: 10,
    },
    answerBox: {
      backgroundColor: state.darkMode ? '#ffae00' : colors.wordsCompleted.answerBox,
      width: '95%',
      height: '30%',
      borderRadius: 20,
      padding: 15,
      shadowColor: "#000",
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
    answerText: {
      fontSize: 18,
      color: '#464646',
      fontWeight: 'bold',
    },
    answerForAnswerText: {
      fontSize: 18,
      color: 'green',
      fontWeight: 'bold',
    },
  });
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

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
  for (let i = 0; i < 22; i += 1) {
    levels.push({
      key: String(i + 1),
      text: `Level ${String(i + 1)}`,
      words: levelsWithWords[i + 1],
    });
  }

  function meaningLength(meaning) {
    if (meaning.length < 60) {
      return <Text style={[styles.answerForAnswerText, {color: showAnswer.color}]}>{meaning}</Text>;
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
      <StatusBar
          backgroundColor={
            'black'
          }
          barStyle={"light-content"}
        />
      <Header
          backgroundColor={
            "cyan"
          }
          containerStyle={[
            Platform.OS === "android" && { height: 56, paddingTop: 10 }
          ]}
          leftComponent={
            <Icon
              name="arrow-back"
              color={
                'black'
              }
              size={30}
              onPress={() => {navigation.navigate('Home');}}
            />
          }
          centerComponent={{
            text: "Words Completed",
            style: {
              color: 'black',
              fontSize: 18
            }
          }}
        />
        
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
          <Text style={[styles.answerForAnswerText, {color: showAnswer.color}]}>
            {showAnswer.punjabiText}
          </Text>
        </View>
        <View style={styles.answerRow}>
          <Text style={styles.answerText}>English Text</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={[styles.answerForAnswerText, {color: showAnswer.color}]}>{showAnswer.engText}</Text>
        </View>
        <View style={styles.answerRow}>
          <Text style={styles.answerText}>Meaning</Text>
          <Text style={styles.answerText}> : </Text>
          <ScrollView 
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              horizontal>
                <Text style={[styles.answerForAnswerText, {color: showAnswer.color}]}>{showAnswer.meaning}</Text>
          </ScrollView>
        </View>
        <View style={styles.answerRow}>
          <Text style={styles.answerText}>Level</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={[styles.answerForAnswerText, {color: showAnswer.color}]}>{showAnswer.level}</Text>
        </View>
        <View style={styles.answerRow}>
          <Text style={styles.answerText}>Type</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={[styles.answerForAnswerText, {color: showAnswer.color}]}>{showAnswer.type}</Text>
        </View>
        <View style={styles.answerRow}>
          <Text style={styles.answerText}>Status</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={[styles.answerForAnswerText, {color: showAnswer.color}]}>{showAnswer.status}</Text>
        </View>
      </View>
    </View>
  );
}

export default RightWords;
