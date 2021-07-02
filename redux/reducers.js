import { allWords } from "../util/allWords";
import getWords from "../util/generateWords";

import AsyncStorage from "@react-native-async-storage/async-storage";

const setWords = (level, allWords) => {
  const [charArray, firstWord, secondWord] = getWords(level, allWords);
  return [charArray, firstWord, secondWord];
};
const generateWords = setWords(1, allWords);

const initialState = {
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

const setData = async (title, words) => {
  try {
    await AsyncStorage.setItem(title, words);
  } catch (e) {
    console.log(e);
  }
};

function theGameReducer(state = initialState, action) {
  if (action.type === "SET_ALL_WORDS") {
    const updatedWords = state.allWords.filter(
      (word) => word !== action.theWord
    );
    setData("allWords", JSON.stringify(updatedWords));
    return {
      ...state,
      allWords: updatedWords,
    };
  }
  if (action.type === "SET_TOP_WORD") {
    setData("topWord", state.firstWord.engText);
    setData("attempt", "");
    return {
      ...state,
      topWord: state.firstWord.engText,
      attempt: "",
    };
  }
  if (action.type === "SET_BOTTOM_WORD") {
    setData("bottomWord", state.secondWord.engText);
    setData("attempt", "");
    return {
      ...state,
      bottomWord: state.secondWord.engText,
      attempt: "",
    };
  }
  if (action.type === "SET_ATTEMPT") {
    setData("attempt", action.theWord);
    return {
      ...state,
      attempt: action.theWord,
    };
  }
  if (action.type === "SET_NEW_WORDS") {
    const generateWords = setWords(
      state.levelProgress[0].level,
      state.allWords
    );

    setData("topWord", "");
    setData("bottomWord", "");
    setData("attempt", "");
    setData("charArray", JSON.stringify(generateWords[0]));
    setData("firstWord", JSON.stringify(generateWords[1]));
    setData("secondWord", JSON.stringify(generateWords[2]));
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
    setData("correctWords", JSON.stringify(wordsLst));
    return {
      ...state,
      correctWords: wordsLst,
    };
  }
  if (action.type === "SET_GIVENUP_WORDS") {
    const wordsLst = state.givenUpWords;
    wordsLst.push(action.theWord);
    setData("givenUpWords", JSON.stringify(wordsLst));
    return {
      ...state,
      givenUpWords: wordsLst,
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

    setData("levelProgress", JSON.stringify(theLevelProgress));
    return {
      ...state,
      levelProgress: theLevelProgress,
    };
  }
  //Async Storage Reducer

  if (action.type === "SET_ALL_THE_WORDS") {
    return {
      ...state,
      allWords: action.words,
    };
  }
  if (action.type === "SET_THE_NEW_WORDS") {
    return {
      ...state,
      charArray: action.chars,
      firstWord: action.first,
      secondWord: action.second,
    };
  }
  if (action.type === "SET_THE_CORRECT_WORDS") {
    return {
      ...state,
      correctWords: action.words,
    };
  }
  if (action.type === "SET_THE_GIVENUP_WORDS") {
    return {
      ...state,
      givenUpWords: action.words,
    };
  }
  if (action.type === "SET_THE_LEVEL_PROGRESS") {
    return {
      ...state,
      levelProgress: action.levelProgress,
    };
  }

  return { ...state }; //default
}

export default theGameReducer;
