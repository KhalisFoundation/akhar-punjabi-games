import initialState from "./reducers";

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
export const setState = (state) => (dispatch) => {
  dispatch({
    type: "SET_STATE",
    state,
  });
};
