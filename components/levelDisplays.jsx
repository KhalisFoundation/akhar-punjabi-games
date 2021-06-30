/* eslint-disable react-native/no-color-literals */
import * as Anvaad from 'anvaad-js';
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

function Level({ title, words }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        keyExtractor={(word) => word.text}
        data={words}
        // scrollEnabled={true}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log(item.meaning);
              }}
            >
              <View style={styles.word}>
                <Text style={styles.wordText}>{Anvaad.unicode(item.text)}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    height: '100%',
    // // height: "50%",
    // alignItems: "center",
    // paddingTop: "9%",
    backgroundColor: 'white',
    borderRadius: 20,
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
  title: {
    // fontSize: 60,
    bottom: '10%',
  },
  word: {
    backgroundColor: 'red',
    // top: -200,
    // height: "10%",
    // width: "150%",
  },
  //   wordText: {
  //     fontSize: 20,
  //   },
});

export default Level;
