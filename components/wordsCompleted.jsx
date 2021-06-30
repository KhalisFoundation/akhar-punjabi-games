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

function RightWords({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  // const theWords=state.correctWords
  console.log(state.correctWords);
  const theWords = [
    /* this is just here for testing purposous. To mess around with the levels display.
    state.correctWords has all the correct words completed
    */
    {
      engText: 'topI',
      punjabiText: 'ਟੋਪੀ',
      meaning: 'hat',
      type: 'Punjabi',
      level: 16,
    },
    {
      engText: 'vycx',
      punjabiText: 'ਵੇਚਣ',
      meaning: 'sell',
      type: 'Punjabi',
      level: 11,
    },
    {
      engText: 'GtwE',
      punjabiText: 'ਘਟਾਓ',
      meaning: 'subtract',
      type: 'Punjabi',
      level: 2,
    },
    {
      engText: 'Gtnw',
      punjabiText: 'ਘਟਨਾ',
      meaning: 'event',
      type: 'Punjabi',
      level: 2,
    },
    {
      engText: 'Kws',
      punjabiText: 'ਖਾਸ',
      meaning: 'particular',
      type: 'Punjabi',
      level: 2,
    },
    {
      engText: 'sOdw',
      punjabiText: 'ਸੌਦਾ',
      meaning: 'deal',
      type: 'Punjabi',
      level: 18,
    },
  ];

  const levelsWithWords = {};
  theWords.map((word) => {
    if (levelsWithWords[word.level] === undefined) {
      levelsWithWords[word.level] = [word];
    } else {
      levelsWithWords[word.level].push(word);
    }
    return 'nothing';
  });
  // const levels = [
  //   { key: "1", text: "LEVEL 1", words: level1Words },
  //   { key: "2", text: "LEVEL 2", words: level2Words },
  //   { key: "3", text: "LEVEL 3", words: level3Words },
  //   { key: "4", text: "LEVEL 4", words: level4Words },
  //   { key: "5", text: "LEVEL 5", words: level5Words },
  // ];
  const levels = [];
  for (let i = 0; i < 22; i += 1) {
    levels.push({
      key: String(i + 1),
      text: `Level ${String(i + 1)}`,
      words: levelsWithWords[i + 1],
    });
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        title="Home"
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Image
          source={require('../images/left_arrow.png')}
          style={styles.backArrow}
        />
      </TouchableOpacity>
      <FlatList
        style={styles.listContainer}
        data={levels}
        // scrollEnabled={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.list}>
              <Level title={item.text} words={item.words} />
              <Text>NEXT LEVEL</Text>
            </View>
          );
        }}
      />
      <Text>HII</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#5F909C',
    paddingTop: '9%',
    justifyContent: 'center',
  },
  backButton: {
    width: '10%',
    height: '7%',
    right: '40%',
  },
  backArrow: {
    width: '90%',
    height: '90%',
  },
  // title: {
  //   fontSize: 60,
  //   bottom: "10%",
  // },
  listContainer: {
    width: '95%',
    // backgroundColor: "yellow",
  },
  list: {
    width: '90%',
    // backgroundColor: "blue",
    alignItems: 'center',
  },
});

export default RightWords;
