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
  Platform
} from 'react-native';
import { Header } from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import Level from './levelDisplays';
import theColors from '../../util/colors';

function RightWords({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const theCorrectWords = state.correctWords;
  const theGivenUpWords = state.givenUpWords;
  const [down, setDown] = useState(false);
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
  });
  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      alignItems: 'center',
      backgroundColor: colors.wordsCompleted.container,
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      marginTop: '3.5%',
    },
    downStyle: {
      position: 'absolute',
      top: 0,
    },
    arrow: {
      position: 'absolute',
      alignSelf: 'flex-end',
      backgroundColor: state.darkMode ? '#000' : '#fff',
      borderRadius: 20,
      elevation: 5
    },
    listContainer: {
      // backgroundColor: colors.wordsCompleted.listContainer,
      height: '60%',
      width: '95%',
      padding: 10,
    },
    listContainerFull: {
      width: '95%',
      padding: 10,
      height: '80%'
    },
    answerBoxAlt: {
      height: 25,
      width: '95%'
    },
    answerBox: {
      backgroundColor: state.darkMode ? '#ffae00' : colors.wordsCompleted.answerBox,
      width: '95%',
      height: '30%',
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
      fontSize: 18,
      color: '#464646',
      fontWeight: 'bold',
    },
    answerForAnswerText: {
      fontSize: 18,
      color: 'green',
      fontWeight: 'bold',
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
          down ? styles.downStyle : null
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
            fontSize: 20,
            fontFamily: 'Muli'
          }
        }}
      />

      <View style={down ? styles.listContainerFull : styles.listContainer}>
        <FlatList
          // style={styles.listContainer}
          data={levels}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={down ? styles.answerBoxAlt : styles.answerBox}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => { setDown(!down); }}
        >
          <MaskedView
            style={{ height: 40, width: 40 }}
            maskElement={
              <Icon name={down ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={40} color="black" style={styles.shadow} />
          }
          >
            <LinearGradient
              colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
              style={styles.arrowGradient}
            />
          </MaskedView>
        </TouchableOpacity>
        <View style={down ? styles.answerRowAlt : styles.answerRow}>
          <Text style={styles.answerText}>Gurmukhi Text</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={[styles.answerForAnswerText, { color: showAnswer.color, fontSize: 20 }]}>
            {showAnswer.punjabiText}
          </Text>
        </View>
        <View style={down ? styles.answerRowAlt : styles.answerRow}>
          <Text style={styles.answerText}>English Text</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={[styles.answerForAnswerText, { color: showAnswer.color }]}>
            {showAnswer.engText}
          </Text>
        </View>
        <View style={down ? styles.answerRowAlt : styles.answerRow}>
          <Text style={styles.answerText}>Meaning</Text>
          <Text style={styles.answerText}> : </Text>
          <ScrollView
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            <Text style={[styles.answerForAnswerText, { color: showAnswer.color }]}>
              {showAnswer.meaning}
            </Text>
          </ScrollView>
        </View>
        <View style={down ? styles.answerRowAlt : styles.answerRow}>
          <Text style={styles.answerText}>Level</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={[styles.answerForAnswerText, { color: showAnswer.color }]}>
            {showAnswer.level}
          </Text>
        </View>
        <View style={down ? styles.answerRowAlt : styles.answerRow}>
          <Text style={styles.answerText}>Status</Text>
          <Text style={styles.answerText}> : </Text>
          <Text style={[styles.answerForAnswerText, { color: showAnswer.color }]}>
            {showAnswer.status}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default RightWords;
