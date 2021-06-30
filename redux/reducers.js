// import {
//   SET_TOP_WORD,
//   SET_BOTTOM_WORD,
//   SET_ATTEMPT,
//   SET_NEW_WORDS,
//   SET_CORRECT_WORDS,
// } from "./actions";
import getWords from "../util/generateWords";

const setWords = () => {
  const [charArray, firstWord, secondWord] = getWords();
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
  if (action.type === "SET_NEW_WORDS") {
    const generateWords = setWords();
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
