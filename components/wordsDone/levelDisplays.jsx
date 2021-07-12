/* eslint-disable react-native/no-color-literals */
import * as Anvaad from "anvaad-js";
import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

import { useSelector } from "react-redux";
import theColors from "../../util/colors";

function Level({ title, theWords, setAnswer }) {
  const state = useSelector((theState) => theState.theGameReducer);

  const colors = theColors[state.darkMode];

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
    },
    title: {
      textAlign: "center",
      fontSize: 30,
      backgroundColor: colors.levelDisplay.title,
      // borderRadius: 20,
    },
    flatList: {
      // width: 200,
      // height: 200,
      // borderRadius: 20,
    },
    wordEven: {
      backgroundColor: colors.levelDisplay.wordEven,
      // borderRadius: 20,
    },
    wordOdd: {
      backgroundColor: colors.levelDisplay.wordOdd,
    },
    wordText: {
      fontSize: 60,
      textAlign: "center",
    },
  });

  let a = 0;
  let words = theWords;
  if (words === undefined) {
    words = [
      {
        engText: "koeI sæbd nhIN",
        punjabiText: "ਕੋਈ ਸ਼ਬਦ ਨਹੀਂ",
        meaning: "There are no words",
        type: "Punjabi",
        level: "N/A",
        status: "N/A",
      },
    ];
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        style={styles.flatList}
        keyExtractor={(word) => word.meaning}
        data={words}
        scrollEnabled
        renderItem={({ item }) => {
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
              }}
            >
              <View style={wordStyle}>
                <Text style={styles.wordText}>
                  {Anvaad.unicode(item.engText)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default Level;
