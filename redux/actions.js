export const SET_TOP_WORD = "SET_TOP_WORD";
export const SET_BOTTOM_WORD = "SET_BOTTOM_WORD";
export const SET_ATTEMPT = "SET_ATTEMPT";
export const SET_NEW_WORDS = "SET_NEW_WORDS";
export const SET_CORRECT_WORDS = "SET_CORRECT_WORDS";
export const SET_GIVENUP_WORDS = "SET_GIVENUP_WORDS";
export const SET_LEVEL_PROGRESS = "SET_LEVEL_PROGRESS";

export const setAllWords = (word) => (dispatch) => {
  dispatch({
    type: "SET_ALL_WORDS",
    theWord: word,
  });
};
export const setTopWord = () => (dispatch) => {
  dispatch({
    type: "SET_TOP_WORD",
  });
};
export const setBottomWord = () => (dispatch) => {
  dispatch({
    type: "SET_BOTTOM_WORD",
  });
};
export const setAttempt = (word) => (dispatch) => {
  dispatch({
    type: "SET_ATTEMPT",
    theWord: word,
  });
};
export const setNewWords = () => (dispatch) => {
  dispatch({
    type: "SET_NEW_WORDS",
  });
};
export const setCorrectWords = (word) => (dispatch) => {
  dispatch({
    type: "SET_CORRECT_WORDS",
    theWord: word,
  });
};
export const setGivenUpWords = (word) => (dispatch) => {
  dispatch({
    type: "SET_GIVENUP_WORDS",
    theWord: word,
  });
};
export const setLevelProgress = (word) => (dispatch) => {
  dispatch({
    type: "SET_LEVEL_PROGRESS",
    theWord: word,
  });
};

//for state that are lists, we cant use the same functions in asyncStorage
//because they only take in a word as a param

export const setAllTheWords = (words) => (dispatch) => {
  dispatch({
    type: "SET_ALL_THE_WORDS",
    words: words,
  });
};
export const setTheNewWords = (chars, first, second) => (dispatch) => {
  dispatch({
    type: "SET_THE_NEW_WORDS",
    chars,
    first,
    second,
  });
};
export const setTheCorrectWords = (words) => (dispatch) => {
  dispatch({
    type: "SET_THE_CORRECT_WORDS",
    words,
  });
};
export const setTheGivenUpWords = (words) => (dispatch) => {
  dispatch({
    type: "SET_THE_GIVENUP_WORDS",
    words,
  });
};
export const setTheLevelProgress = (levels) => (dispatch) => {
  dispatch({
    type: "SET_THE_GIVENUP_WORDS",
    levelProgress: levels,
  });
};
