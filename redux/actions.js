export const SET_TOP_WORD = "SET_TOP_WORD";
export const SET_BOTTOM_WORD = "SET_BOTTOM_WORD";
export const SET_ATTEMPT = "SET_ATTEMPT";
export const SET_NEW_WORDS = "SET_NEW_WORDS";
export const SET_CORRECT_WORDS = "SET_CORRECT_WORDS";

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
export const setLevelProgress = (word) => (dispatch) => {
  dispatch({
    type: "SET_LEVEL_PROGRESS",
    theWord: word,
  });
};
