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

import { useSelector } from 'react-redux';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from "expo-linear-gradient";
import theColors from '../../util/colors';
import { useState } from 'react';

function Level({ title, theWords, setAnswer }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const [up, setUp] = useState(false);

  const colors = theColors[state.darkMode];

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
    },
    title: {
      padding: 5,
      paddingBottom: 10,
      fontWeight: 'bold',
      fontSize: 15,
      height: 50,
      fontSize: 30,
      textAlign: 'center',
    },
    flatList: {},
    flatListAlt: {display:'none'},
    wordEven: {
      backgroundColor: colors.levelDisplay.wordEven,
    },
    wordOdd: {
      backgroundColor: colors.levelDisplay.wordOdd,
    },
    wordText: {
      fontSize: 40,
      textAlign: 'center',
      fontWeight:'bold',
      backgroundColor:'#e0c14d'
    },
  });

  let words = theWords;
  if (words === undefined) {
    words = [
      {
        engText: 'koeI sæbd nhIN',
        punjabiText: 'ਕੋਈ ਸ਼ਬਦ ਨਹੀਂ',
        meaning: 'There are no words',
        type: 'Punjabi',
        level: 'N/A',
        status: 'N/A',
      },
    ];
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
        }}
      >
        <View style={[wordStyle,{width: "90%", alignSelf:'center', borderBottomWidth:1, borderColor:'black'}]}>
          <Text style={styles.wordText}>{Anvaad.unicode(item.engText)}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);
  return (
    <View style={styles.container}>
      <View style={{backgroundColor:state.darkMode ? 'black' :'white', elevation:5, borderRadius:15}}>
      <TouchableOpacity onPress={() => {setUp(!up)}}>
      <MaskedView
          style={{...styles.title, width:"100%"}}
          maskElement={
            <View
              style={{
                backgroundColor: 'transparent',
              }}>
                <Text style={styles.title}>{title}</Text>
            </View>
          }>
          <LinearGradient
            colors={state.darkMode? ["#ff8008", "#ffc837"]: ["#FF0076", "#590FB7"]}
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
