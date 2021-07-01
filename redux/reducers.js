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
    { level: 1, wordsNeeded: 2 },
    { level: 2, wordsNeeded: 4 },
    { level: 3, wordsNeeded: 10 },
    { level: 4, wordsNeeded: 10 },
    { level: 5, wordsNeeded: 10 },
    { level: 6, wordsNeeded: 10 },
    { level: 7, wordsNeeded: 10 },
    { level: 8, wordsNeeded: 10 },
    { level: 9, wordsNeeded: 10 },
    { level: 10, wordsNeeded: 10 },
    { level: 11, wordsNeeded: 10 },
    { level: 12, wordsNeeded: 10 },
    { level: 13, wordsNeeded: 10 },
    { level: 14, wordsNeeded: 10 },
    { level: 15, wordsNeeded: 10 },
    { level: 16, wordsNeeded: 10 },
    { level: 17, wordsNeeded: 10 },
    { level: 18, wordsNeeded: 10 },
    { level: 19, wordsNeeded: 10 },
    { level: 20, wordsNeeded: 10 },
    { level: 21, wordsNeeded: 10 },
    { level: 22, wordsNeeded: 10 },
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
    let newWordssNeeded = theLevelProgress[0].wordsNeeded;

    if (action.theWord.level === theLevelProgress[0].level) {
      newWordssNeeded -= 1;
    }
    theLevelProgress[0] = {
      ...theLevelProgress[0],
      wordsNeeded: newWordssNeeded,
    };
    if (newWordssNeeded === 0) {
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
