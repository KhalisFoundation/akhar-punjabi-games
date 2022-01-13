export const setTopWord = () => (dispatch) => {
  dispatch({
    type: "SET_TOP_WORD",
  });
};
export const setTopHint = (hint) => (dispatch) => {
  dispatch({
    type: "SET_TOP_HINT",
    theTopHint: hint,
  });
};
export const setBottomWord = () => (dispatch) => {
  dispatch({
    type: "SET_BOTTOM_WORD"
  });
};
export const setBottomHint = (hint) => (dispatch) => {
  dispatch({
    type: "SET_BOTTOM_HINT",
    theBottomHint: hint,
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
export const setTheState = (state) => (dispatch) => {
  dispatch({
    type: "SET_THE_STATE",
    state,
  });
};
export const setGiveUpLives = (operator) => (dispatch) => {
  dispatch({
    type: "SET_GIVE_UP_LIVES",
    addOrSub: operator,
  });
};
export const closeNextLevelModal = () => (dispatch) => {
  dispatch({
    type: "CLOSE_NEXT_LEVEL_MODAL",
  });
};

//settings page
export const setTypeOfWords = (theType) => (dispatch) => {
  dispatch({
    type: "SET_TYPE_OF_WORDS",
    theTypeOfWords: theType,
  });
};
export const setDarkMode = (set) => (dispatch) => {
  dispatch({
    type: "SET_DARK_MODE",
    onOrOff: set,
  });
};
export const setShowPopUp = (set) => (dispatch) => {
  dispatch({
    type: "SET_SHOW_POP_UP",
    onOrOff: set,
  });
};
