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

//gets new words
const setWords = (level, allWords) => {
  const [charArray, firstWord, secondWord] = getWords(level, allWords);
  return [charArray, firstWord, secondWord];
};
//puts words for level 1
const generateWords = getWords(allWords.filter((word) => word.level === 1));

export const initialState = {
  ALL_WORDS: allWords, //this list will not be changed
  usableWords: allWords.filter((word) => word.level === 1),
  topWord: "",
  bottomWord: "",
  attempt: "",
  charArray: generateWords[0],
  firstWord: generateWords[1],
  secondWord: generateWords[2],
  correctWords: [],
  givenUpWords: [],
  giveUpsLeft: 10,
  levelProgress: [
    { level: 1, wordsNeeded: 10 },
    { level: 2, wordsNeeded: 10 },
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
  //settings stuff
  typesOfWords: "Both",
  darkMode: "Off",
};

setData("state", initialState); //to reset all state

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
  if (action.type === "SET_CORRECT_WORDS") {
    const wordsLst = [...state.correctWords, action.theWord];
    return {
      ...state,
      correctWords: wordsLst,
    };
  }
  if (action.type === "SET_GIVENUP_WORDS") {
    const wordsLst = [...state.givenUpWords, action.theWord];
    const newState = {
      ...state,
      givenUpWords: wordsLst,
      giveUpsLeft: state.giveUpsLeft - 1,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_NEW_WORDS") {
    const allWordsForCurrentLevel = state.ALL_WORDS.map((word) => {
      if (word.level === state.levelProgress[0].level) {
        if (state.typesOfWords === "Both") {
          return word;
        } else if (state.typesOfWords === "Gurbani") {
          if (word.type === "Gurbani") {
            return word;
          }
        } else if (state.typesOfWords === "Punjabi") {
          if (word.type === "Punjabi") {
            return word;
          }
        }
      }
    });
    let newUsableWords = [];
    for (const word in allWordsForCurrentLevel) {
      let wordInCorrectWordsAndGivenUpWords = 0;
      for (const correctWord in state.correctWords) {
        if (word.engText !== correctWord.engText) continue;
        wordInCorrectWordsAndGivenUpWords += 1;
      }
      for (const giveUpWord in state.givenUpWords) {
        if (word.engText !== giveUpWord.engText) continue;
        wordInCorrectWordsAndGivenUpWords += 1;
      }
      //check if word is in correctWords or givenUpWords
      if (wordInCorrectWordsAndGivenUpWords === 0) {
        newUsableWords.push(word);
      }
      console.log(wordInCorrectWordsAndGivenUpWords);
    }
    let newGiveUpWords;
    if (newUsableWords.length > 3) {
      newGiveUpWords = [...state.givenUpWords];
    } else {
      //this code block will run when there are no more avaliable words for the particular level in all words.
      // we will take the given up words for this level and put them back in usableWords.
      newGiveUpWords = state.givenUpWords.map((word) => {
        if (word.level === state.levelProgress[0].level) {
          newUsableWords.push(word);
        } else {
          return word;
        }
      });
    }
    const generateWords = getWords(newUsableWords);

    const newState = {
      //doing this because it is used twice, once to return and second to setData
      ...state,
      topWord: "",
      bottomWord: "",
      attempt: "",
      charArray: generateWords[0],
      firstWord: generateWords[1],
      secondWord: generateWords[2],
      givenUpWords: newGiveUpWords,
      usableWords: newUsableWords,
    };

    setData("state", newState);
    return newState;
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
  if (action.type === "SET_THE_STATE") {
    // for async storage
    return {
      ...action.state,
    };
  }
  if (action.type === "SET_TYPE_OF_WORDS") {
    console.log(action.theTypeOfWords);
    const newState = {
      ...state,
      typesOfWords: action.theTypeOfWords,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_DARK_MODE") {
    console.log(action.onOrOff);
    const newState = {
      ...state,
      darkMode: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_GIVE_UP_LIVES") {
    const newState = {
      ...state,
      giveUpsLeft: state.giveUpsLeft + 1,
    };
    setData("state", newState);
    return newState;
  }

  //default
  return { ...state };
}

export default theGameReducer;
