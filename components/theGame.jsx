/* eslint-disable react-native/no-color-literals */
import * as React from "react";
import * as Anvaad from "anvaad-js";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { initialState, reducer, actions } from "./state";
import TheCircle from "./circleForGame";

function GameScreen({ navigation }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  if (state.attempt === Anvaad.unicode(state.firstWord.text, true)) {
    dispatch(actions.setTopWord(state.attempt));
  }
  if (state.attempt === Anvaad.unicode(state.secondWord.text, true)) {
    dispatch(actions.setBottomWord(state.attempt));
  }
  return (
    <View style={styles.container}>
      {/* BackButton */}
      <TouchableOpacity
        style={styles.backButton}
        title="Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Image
          source={require("../images/left_arrow.png")}
          style={styles.backArrow}
        />
      </TouchableOpacity>
      <Text style={styles.title}>ਅਖਰ ਜੋੜੋ </Text>
      <View style={styles.wordBoxAnswers}>
        <Text style={styles.hint}>{`Len: ${state.firstWord.text.length}`}</Text>
        <View style={styles.wordBoxText}>
          <Text style={styles.answers}>{Anvaad.unicode(state.topWord)}</Text>
          <View style={styles.definition}>
            <Text style={styles.definitionText}>{state.firstWord.meaning}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.giveUp}
          onPress={() => {
            dispatch(actions.setTopWord(state.firstWord.text));
          }}
        >
          <Text style={styles.giveUpTxt}>GIVE UP</Text>
        </TouchableOpacity>
        <Text style={styles.hint}>
          {`Len: ${state.secondWord.text.length}`}
        </Text>
        <View style={styles.wordBoxText}>
          <Text style={styles.answers}>{Anvaad.unicode(state.bottomWord)}</Text>
          <View style={styles.definition}>
            <Text style={styles.definitionText}>
              {state.secondWord.meaning}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.giveUp}
          onPress={() => {
            dispatch(actions.setBottomWord(state.secondWord.text));
          }}
        >
          <Text style={styles.giveUpTxt}>GIVE UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.newWord}
          title="New Words"
          onPress={() => {
            dispatch(actions.setNewWords);
          }}
        >
          <Text>New Word</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.wordAttemptView}>
        <Text style={styles.wordAttempt} placeHolder="Word">
          {Anvaad.unicode(state.attempt)}
        </Text>
        <TouchableOpacity
          style={styles.clearBox}
          onPress={() => {
            // setAttempt("");
            dispatch(actions.setAttempt(""));
          }}
        >
          <Text style={styles.clearBoxText}>CLEAR</Text>
        </TouchableOpacity>
      </View>

      <TheCircle
        charArray={state.charArray}
        setAttempt={actions.setAttempt}
        dispatch={dispatch}
        state={state}
      />
      {/* there can only be from 4-18 characters as input */}
    </View>
  );
}

// TODO - Move all colors to separate file and import as variables.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#5F909C",
    paddingTop: "9%",
  },
  backButton: {
    width: "10%",
    height: "7%",
    right: "40%",
  },
  backArrow: {
    width: "90%",
    height: "90%",
  },
  title: {
    fontSize: 60,
    bottom: "10%",
  },
  wordBoxAnswers: {
    bottom: 65,
    width: 350,
    height: 250,
    backgroundColor: "#9C734F",
    borderRadius: 20,
  },
  hint: {
    width: 50,
    top: 60,
  },
  wordBoxText: {
    width: 250,
    height: 50,
    left: 50,
    top: 30,
    backgroundColor: "white",
    borderRadius: 20,
  },
  answers: {
    fontSize: 35,
    left: 10,
  },
  wordAttemptView: {
    flexDirection: "row",
  },
  wordAttempt: {
    bottom: 58,
    width: 200,
    height: 50,
    backgroundColor: "#CFF6FF",
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: 30,
  },
  clearBox: {
    width: 50,
    height: 30,
    backgroundColor: "red",
    top: -50,
    left: 5,
    borderRadius: 20,
  },
  giveUp: {
    backgroundColor: "red",
    width: 50,
    height: 50,
    borderRadius: 25,
    left: 300,
    top: -20,
  },
  giveUpTxt: {
    textAlign: "center",
  },
  newWord: {
    left: 265,
    borderRadius: 20,
    width: 90,
    backgroundColor: "yellow",
    alignItems: "center",
  },
});

export default GameScreen;
