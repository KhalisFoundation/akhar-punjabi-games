import * as React from 'react';
import { allWords } from "../util/allWords";
import getWords from "../util/generateWords";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef } from 'react';
import {Animated, Dimensions} from 'react-native';


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

// generate words for getMoreLives Page
const rotateAnimation = new Animated.Value(0);  
const interpolateRotating = rotateAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '720deg'],
});
const screenWidth = Dimensions.get('window').width;

const wordsToType = [
  'vwihgurU',
  'DMn gurU nwnk dyv swihb jI',
  'DMn gurU AMgd dyv swihb jI',
  'DMn gurU Amrdws swihb jI',
  'DMn gurU rwmdws swihb jI',
  'DMn gurU Arjn dyv swihb jI',
  'DMn gurU hrgoibMd swihb jI',
  'DMn gurU hrrwie swihb jI',
  'DMn gurU hrikRSn swihb jI',
  'DMn gurU qyg bhwdr swihb jI',
  'DMn gurU goibMd isMG swihb jI',
  'DMn SRI gurU gRMQ swihb jI',
  'DMn gurU DMn gurU ipAwry',
];
const getRandomWord = () => {
  return wordsToType[Math.floor(Math.random() * wordsToType.length)];
};

//puts words for level 1
const generateWords = getWords(allWords.filter((word) => word.level === 1));

export const initialState = {
  ALL_WORDS: allWords, //this list will not be changed
  usableWords: allWords.filter((word) => word.level === 1),
  showIntroModal: false,
  //logic states for akharjor
  topWord: "",
  topHint: "",
  bottomWord: "",
  bottomHint: "",
  visited: [],
  attempt: "",
  animatedStyle: {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
    width: screenWidth,
    marginBottom: 25
  },
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
    // { level: 9, wordsNeeded: 10, pointsPerWord: 13 },
  ],
  totalPoints: 0,
  //settings stuff
  typesOfWords: "Both",
  darkMode: false,
  showPopUp: true,
  romanised: false,
  showNumOfLetters: false,
  includeMatra: true,
  // levels completed
  meaningPopup: false,
  // 2048 stuff
  resultShow: false,
  moves: 0,
  helpPage: []
};

//to reset all state
//setData("state", initialState);


function theGameReducer(state = initialState, action) {
  const finalLevel = 8 // was 9
  if (action.type === "SET_TOP_WORD") {
    return {
      ...state,
      topWord: state.firstWord.engText,
      attempt: "",
      visited: [],
    };
  }
  if (action.type === "SET_TOP_HINT") {
    return {
      ...state,
      topHint: action.theTopHint,
      attempt: "",
      visited: [],
    };
  }
  if (action.type === "SET_BOTTOM_WORD") {
    return {
      ...state,
      bottomWord: state.secondWord.engText,
      attempt: "",
      visited: [],
    };
  }
  if (action.type === "SET_BOTTOM_HINT") {
    return {
      ...state,
      bottomHint: action.theBottomHint,
      attempt: "",
      visited: [],
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
      visited: [],
      charArray: generateWords[0],
      firstWord: generateWords[1],
      secondWord: generateWords[2],
      firstLength: parseInt(generateWords[1].engText.length),
      secondLength: generateWords[2].engText.length,
      givenUpWords: newGiveUpWords,
      usableWords: newUsableWords,
      typesOfWords: newWordType,
      livesWord: getRandomWord(),
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
      if(theLevelProgress[0].level!=finalLevel){
      theLevelProgress = theLevelProgress.slice(1);
      }
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
    const newState = {
      ...state,
      giveUpsLeft: eval(`${state.giveUpsLeft} ${action.addOrSub} 1`),
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
  if (action.type === "SET_SHOW_NUM_OF_LETTERS") {
    const newState = {
      ...state,
      showNumOfLetters: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_INCLUDE_MATRA") {
    const newState = {
      ...state,
      includeMatra: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "SET_SHOW_ROMANISED") {
    const newState = {
      ...state,
      romanised: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }
  if (action.type === "RESET_LEVELS") {
    const newState = {
      ...state,
      usableWords: allWords.filter((word) => word.level === 1),
      topWord: "",
      topHint: "",
      bottomWord: "",
      bottomHint: "",
      attempt: "",
      visited: [],
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
        // { level: 9, wordsNeeded: 10, pointsPerWord: 13 },
      ],
      totalPoints: 0,
      //settings stuff
      typesOfWords: "Both",
      darkMode: false,
      showPopUp: true,
      romanised: false,
      showNumOfLetters: false,
      includeMatra: true,
      // levels completed
      meaningPopup: false,
    }
    setData("state", newState);
    return newState
  }

  // actions for 2048

  if (action.type === "2048_PUNJABI_NUMS") {
    const newState = {
      ...state,
      punjabiNums: action.theNums,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_RESULT_SHOW") {
    const newState = {
      ...state,
      resultShow: true,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "CLOSE_RESULT_MODAL") {
    const newState = {
      ...state,
      resultShow: false,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SHOW_MEANING_POPUP") {
    const newState = {
      ...state,
      meaningPopup: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_MOVING") {
    const newState = {
      ...state,
      moving: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "UPDATE_GRID") {
    const newState = {
      ...state,
      grid: action.theGrid,
    };
    setData("state", newState);
    return newState;  
  }

  if (action.type === "SET_WON") {
    const newState = {
      ...state,
      won: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_OVER") {
    const newState = {
      ...state,
      over: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "KEEP_PLAYING") {
    const newState = {
      ...state,
      keepPlaying: action.onOrOff,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_SCORE") {
    const newState = {
      ...state,
      score: action.theScore,
    };

    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_BEST") {
    const newState = {
      ...state,
      best: action.theBest,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_TILES") {
    const newState = {
      ...state,
      tiles: action.theTiles,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SET_VISITED") {
    const newState = {
      ...state,
      visited: action.theVisited,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "OPEN_HELP_MODAL") {
    const newState = {
      ...state,
      helpPage: [action.thePage],
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "CLOSE_INTRO_MODAL") {
    const newState = {
      ...state,
      showIntroModal: false,
    };
    setData("state", newState);
    return newState;
  }

  if (action.type === "SHOW_INTRO_MODAL") {
    const newState = {
      ...state,
      showIntroModal: true,
    };
    setData("state", newState);
    return newState;
  }

  // sample for action.type handler
  // if (action.type === "") {
  //   const newState = {
  //   };
  //   setData("state", newState);
  //   return newState;
  // }
  
  
  //default
  return { ...state };
}


export default theGameReducer;