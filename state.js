import getWords from "./util/generateWords";

const setWords = () => {
  const [charArray, firstWord, secondWord] = getWords();
  return [charArray, firstWord, secondWord];
};
const generateWords = setWords();

export const initialState = {
  topWord: "",
  bottomWord: "",
  attempt: "",
  charArray: generateWords[0],
  firstWord: generateWords[1],
  secondWord: generateWords[2],
  correctWords: [],
};

export const actions = {
  setTopWord: (word) => {
    return {
      type: "SET_TOP_WORD",
      theWord: word,
    };
  },
  setBottomWord: (word) => {
    return {
      type: "SET_BOTTOM_WORD",
      theWord: word,
    };
  },
  setAttempt: (word) => {
    return {
      type: "SET_ATTEMPT",
      theWord: word,
    };
  },
  setNewWords: {
    type: "SET_NEW_WORDS",
  },
  setCorrectWords: (word) => {
    return {
      type: "SET_CORRECT_WORDS",
      theWord: word,
    };
  },
};

export function reducer(state, action) {
  if (action.type === "SET_TOP_WORD") {
    return {
      ...state,
      topWord: action.theWord,
      attempt: "",
    };
  }
  if (action.type === "SET_BOTTOM_WORD") {
    return {
      ...state,
      bottomWord: action.theWord,
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
}
