// import {
//   SET_TOP_WORD,
//   SET_BOTTOM_WORD,
//   SET_ATTEMPT,
//   SET_NEW_WORDS,
//   SET_CORRECT_WORDS,
// } from "./actions";
import getWords from "../util/generateWords";

const setWords = (level = 1) => {
  const [charArray, firstWord, secondWord] = getWords(level);
  return [charArray, firstWord, secondWord];
};
const generateWords = setWords();

const initialState = {
  topWord: "",
  bottomWord: "",
  attempt: "",
  charArray: generateWords[0],
  firstWord: generateWords[1],
  secondWord: generateWords[2],
  correctWords: [],
  levelProgress: [
    { level: 1, attemptsNeeded: 1 },
    { level: 2, attemptsNeeded: 1 },
    { level: 3, attemptsNeeded: 10 },
    { level: 4, attemptsNeeded: 10 },
    { level: 5, attemptsNeeded: 10 },
    { level: 6, attemptsNeeded: 10 },
    { level: 7, attemptsNeeded: 10 },
    { level: 8, attemptsNeeded: 10 },
    { level: 9, attemptsNeeded: 10 },
    { level: 10, attemptsNeeded: 10 },
    { level: 11, attemptsNeeded: 10 },
    { level: 12, attemptsNeeded: 10 },
    { level: 13, attemptsNeeded: 10 },
    { level: 14, attemptsNeeded: 10 },
    { level: 15, attemptsNeeded: 10 },
    { level: 16, attemptsNeeded: 10 },
    { level: 17, attemptsNeeded: 10 },
    { level: 18, attemptsNeeded: 10 },
    { level: 19, attemptsNeeded: 10 },
    { level: 20, attemptsNeeded: 10 },
    { level: 21, attemptsNeeded: 10 },
    { level: 22, attemptsNeeded: 10 },
  ],
};

function theGameReducer(state = initialState, action) {
  if (action.type === "SET_TOP_WORD") {
    return {
      ...state,
      topWord: state.firstWord.engText,
      attempt: "",
    };
  }
  if (action.type === "SET_BOTTOM_WORD") {
    return {
      ...state,
      bottomWord: state.secondWord.engText,
      attempt: "",
    };
  }
  if (action.type === "SET_ATTEMPT") {
    return {
      ...state,
      attempt: action.theWord,
    };
  }
  if (action.type === "SET_LEVEL_PROGRESS") {
    let theLevelProgress = [...state.levelProgress];
    const newAttemptsNeeded = theLevelProgress[0].attemptsNeeded - 1;
    theLevelProgress[0] = {
      ...theLevelProgress[0],
      attemptsNeeded: newAttemptsNeeded,
    };
    // let theCurrentLevel = state.currentLevel;
    if (newAttemptsNeeded === 0) {
      theLevelProgress = theLevelProgress.slice(1);
    }
    return {
      ...state,
      levelProgress: theLevelProgress,
    };
  }

  if (action.type === "SET_NEW_WORDS") {
    const generateWords = setWords(state.levelProgress[0].level);
    return {
      ...state,
      topWord: "",
      bottomWord: "",
      attempt: "",
      charArray: generateWords[0],
      firstWord: generateWords[1],
      secondWord: generateWords[2],
    };
  }
  if (action.type === "SET_CORRECT_WORDS") {
    const wordsLst = state.correctWords;
    wordsLst.push(action.theWord);
    return {
      ...state,
      correctWords: wordsLst,
    };
  }
  return { ...state }; //default
}

export default theGameReducer;
