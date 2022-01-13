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
  topHint: "",
  bottomWord: "",
  bottomHint: "",
  attempt: "",
  charArray: generateWords[0],
  firstWord: generateWords[1],
  firstLength: parseInt(generateWords[1].engText.length),
  secondWord: generateWords[2],
  secondLength: parseInt(generateWords[2].engText.length),
  correctWords: [],
  givenUpWords: [],
  giveUpsLeft: 100,
  nextLevelModal: [false],
  levelProgress: [
    { level: 1, wordsNeeded: 10, pointsPerWord: 5 },
    { level: 2, wordsNeeded: 10, pointsPerWord: 6 },
    { level: 3, wordsNeeded: 10, pointsPerWord: 7 },
    { level: 4, wordsNeeded: 10, pointsPerWord: 8 },
    { level: 5, wordsNeeded: 10, pointsPerWord: 9 },
    { level: 6, wordsNeeded: 10, pointsPerWord: 10 },
    { level: 7, wordsNeeded: 10, pointsPerWord: 11 },
    { level: 8, wordsNeeded: 10, pointsPerWord: 12 },
    { level: 9, wordsNeeded: 10, pointsPerWord: 13 },
    { level: 10, wordsNeeded: 10, pointsPerWord: 14 },
    { level: 11, wordsNeeded: 10, pointsPerWord: 15 },
    { level: 12, wordsNeeded: 10, pointsPerWord: 16 },
    { level: 13, wordsNeeded: 10, pointsPerWord: 17 },
    { level: 14, wordsNeeded: 10, pointsPerWord: 18 },
    { level: 15, wordsNeeded: 10, pointsPerWord: 19 },
    { level: 16, wordsNeeded: 10, pointsPerWord: 21 },
    { level: 17, wordsNeeded: 10, pointsPerWord: 22 },
    { level: 18, wordsNeeded: 10, pointsPerWord: 23 },
    { level: 19, wordsNeeded: 10, pointsPerWord: 24 },
    { level: 20, wordsNeeded: 10, pointsPerWord: 25 },
    { level: 21, wordsNeeded: 10, pointsPerWord: 26 },
    { level: 22, wordsNeeded: 10, pointsPerWord: 27 },
  ],
  totalPoints: 0,
  //settings stuff
  typesOfWords: "Both",
  darkMode: false,
  showPopUp: true,
};

//to reset all state
// setData("state", initialState);

function theGameReducer(state = initialState, action) {
  if (action.type === "SET_TOP_WORD") {
    return {
      ...state,
      topWord: state.firstWord.engText,
      attempt: "",
    };
  }
  if (action.type === "SET_TOP_HINT") {
    return {
      ...state,
      topHint: action.theTopHint,
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
  if (action.type === "SET_BOTTOM_HINT") {
    return {
      ...state,
      bottomHint: action.theBottomHint,
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
    let wordsLst = [...state.correctWords];

    //takes out duplicates from lst
    if (wordsLst.length !== 0) {
      wordsLst = wordsLst.filter(
        (word) => word.engText !== action.theWord.engText
      );
    }
    wordsLst.push(action.theWord);

    console.log(state.totalPoints, state.levelProgress[0].pointsPerWord);
    console.log(state.totalPoints + state.levelProgress[0].pointsPerWord);
    return {
      ...state,
      correctWords: wordsLst,
      totalPoints: state.totalPoints + state.levelProgress[0].pointsPerWord,
    };
  }
  if (action.type === "SET_GIVENUP_WORDS") {
    let wordsLst = [...state.givenUpWords];

    //takes out duplicates from lst
    if (wordsLst.length !== 0) {
      wordsLst = wordsLst.filter((word) => {
        if (word !== undefined) {
          return word.engText !== action.theWord.engText;
        }
      });
    }
    wordsLst.push(action.theWord);

    const newState = {
      ...state,
      givenUpWords: wordsLst,
    };
    // setData("state", newState);
    return newState;
  }
  if (action.type === "SET_NEW_WORDS") {
    function getAllWords(theWordType) {
      return state.ALL_WORDS.filter(
        (word) =>
          word.level === state.levelProgress[0].level &&
          (theWordType === word.type || theWordType === "Both")
      );
    }
    let newWordType = state.typesOfWords;

    let allWordsForCurrentLevel = getAllWords(newWordType);

    //if there are not enough words of 1 type in a level, the word type will go back to 'Both'
    if (allWordsForCurrentLevel.length < 3 && newWordType !== "Both") {
      newWordType = "Both";
      allWordsForCurrentLevel = getAllWords(newWordType);
    }

    //does this work??
    const newUsableWords = allWordsForCurrentLevel.filter(
      (word) =>
        !state.correctWords.includes(word) && !state.givenUpWords.includes(word)
    );

    // console.log(newUsableWords.length, allWordsForCurrentLevel.length);
    let newGiveUpWords;
    if (newUsableWords.length > 3) {
      newGiveUpWords = [...state.givenUpWords];
    } else {
      let giveUp = state.givenUpWords
      newGiveUpWords = state.givenUpWords.map((word) => {
        if (word.level === state.levelProgress[0].level) {
          newGiveUpWords = allWordsForCurrentLevel.filter((word)=> !word)
          newUsableWords.push(word);
        } else {
          return word;
        }
      });
    }
    const generateWords = getWords(newUsableWords);

    const newState = {
      ...state,
      nextLevelModal: [state.showPopUp, state.firstWord, state.secondWord],
      topWord: "",
      topHint: "",
      bottomWord: "",
      bottomHint: "",
      attempt: "",
      charArray: generateWords[0],
      firstWord: generateWords[1],
      secondWord: generateWords[2],
      firstLength: parseInt(generateWords[1].engText.length),
      secondLength: generateWords[2].engText.length,
      givenUpWords: newGiveUpWords,
      usableWords: newUsableWords,
      typesOfWords: newWordType,
    };

    setData("state", newState);
    return newState;
  }
  if (action.type === "CLOSE_NEXT_LEVEL_MODAL") {
    const newState = {
      ...state,
      nextLevelModal: [false],
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
    const newState = {
      ...state,
      darkMode: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_GIVE_UP_LIVES") {
    var lives = '';
    if (action.addOrSub === '+') {
      lives = state.giveUpsLeft + 1;
    } else if (action.addOrSub === '-') {
      lives = state.giveUpsLeft - 1;
    }
    const newState = {
      ...state,
      giveUpsLeft: lives,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_SHOW_POP_UP") {
    const newState = {
      ...state,
      showPopUp: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }

  //default
  return { ...state };
}

export default theGameReducer;
