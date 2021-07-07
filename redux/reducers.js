import { allWords } from "../util/allWords";
import getWords from "../util/generateWords";

import AsyncStorage from "@react-native-async-storage/async-storage";

const setData = async (title, state) => {
  try {
    await AsyncStorage.setItem(title, JSON.stringify(state));
    // console.log(state.firstWord);
  } catch (e) {
    console.log(e);
  }
};

const setWords = (level, allWords) => {
  const [charArray, firstWord, secondWord] = getWords(level, allWords);
  return [charArray, firstWord, secondWord];
};
const generateWords = setWords(1, allWords);

export const initialState = {
  allWords: allWords,
  topWord: "",
  bottomWord: "",
  attempt: "",
  charArray: generateWords[0],
  firstWord: generateWords[1],
  secondWord: generateWords[2],
  correctWords: [],
  givenUpWords: [],
  levelProgress: [
    // { level: 1, wordsNeeded: 2 },
    // { level: 2, wordsNeeded: 4 },
    // { level: 3, wordsNeeded: 10 },
    // { level: 4, wordsNeeded: 10 },
    // { level: 5, wordsNeeded: 10 },
    // { level: 6, wordsNeeded: 10 },
    // { level: 7, wordsNeeded: 10 },
    // { level: 8, wordsNeeded: 10 },
    // { level: 9, wordsNeeded: 10 },
    // { level: 10, wordsNeeded: 10 },
    // { level: 11, wordsNeeded: 10 },
    // { level: 12, wordsNeeded: 10 },
    // { level: 13, wordsNeeded: 10 },
    // { level: 14, wordsNeeded: 10 },
    // { level: 15, wordsNeeded: 10 },
    // { level: 16, wordsNeeded: 10 },
    { level: 17, wordsNeeded: 10 },
    { level: 18, wordsNeeded: 10 },
    { level: 19, wordsNeeded: 10 },
    { level: 20, wordsNeeded: 10 },
    { level: 21, wordsNeeded: 10 },
    { level: 22, wordsNeeded: 10 },
  ],
};

// setData("state", initialState); //to reset all state

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
  if (action.type === "SET_NEW_WORDS") {
    const wordsForCurrentLevel = state.allWords.filter(
      (word) => word.level === state.levelProgress[0].level
    );
    let generateWords;
    let newGiveUpWords;
    let newAllWords;

    if (wordsForCurrentLevel.length > 3) {
      generateWords = setWords(state.levelProgress[0].level, state.allWords);
      newGiveUpWords = [...state.givenUpWords];
      newAllWords = [...state.allWords];
    } else {
      //this code block will run when there are no more avaliable words for the particular level in all words.
      // we will take the given up words for this level and put them back in allWords.
      newAllWords = [...state.allWords];
      state.givenUpWords.map((word) => {
        if (word.level === state.levelProgress[0].level) {
          newAllWords.push(word);
        }
      });
      newGiveUpWords = state.givenUpWords.filter(
        (word) => !newAllWords.includes(word)
      );
      generateWords = setWords(state.levelProgress[0].level, newAllWords);
    }
    // console.log(wordsForCurrentLevel.length);
    // console.log(newGiveUpWords.length);
    // console.log(newAllWords.length);
    const updatedState = {
      //doing this because it is used twice, once to return and second to setData
      ...state,
      topWord: "",
      bottomWord: "",
      attempt: "",
      charArray: generateWords[0],
      firstWord: generateWords[1],
      secondWord: generateWords[2],
      givenUpWords: newGiveUpWords,
      allWords: newAllWords,
    };

    setData("state", updatedState);
    return updatedState;
  }
  if (action.type === "SET_CORRECT_WORDS") {
    const wordsLst = [...state.correctWords];
    wordsLst.push(action.theWord);

    const updatedWords = state.allWords.filter(
      (word) => word.punjabiText !== action.theWord.punjabiText
    );

    return {
      ...state,
      correctWords: wordsLst,
      allWords: updatedWords,
    };
  }
  if (action.type === "SET_GIVENUP_WORDS") {
    const wordsLst = [...state.givenUpWords];
    wordsLst.push(action.theWord);

    const updatedWords = state.allWords.filter(
      (word) => word.punjabiText !== action.theWord.punjabiText
    );

    return {
      ...state,
      givenUpWords: wordsLst,
      allWords: updatedWords,
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
  if (action.type === "SET_STATE") {
    return {
      ...action.state,
    };
  }

  return { ...state }; //default
}

export default theGameReducer;
