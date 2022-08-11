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
export const setShowNumOfLetters = (set) => (dispatch) => {
  dispatch({
    type: "SET_SHOW_NUM_OF_LETTERS",
    onOrOff: set,
  });
};
export const setIncludeMatra = (set) => (dispatch) => {
  dispatch({
    type: "SET_INCLUDE_MATRA",
    onOrOff: set,
  });
};
export const setShowRomanised = (set) => (dispatch) => {
  dispatch({
    type: "SET_SHOW_ROMANISED",
    onOrOff: set,
  });
};
export const reset = () => (dispatch) => {
  dispatch({
    type: "RESET_LEVELS",
  });
};

// actions for 2048

export const setBoard = (board) => (dispatch) => {
  dispatch({
    type: "SET_BOARD",
    theBoard: board,
  });
}

export const resetBoard = () => (dispatch) => {
  dispatch({
    type: "RESET_BOARD",
  });
}

export const setNewBoardOnComplete = () => (dispatch) => {
  dispatch({
    type: "SET_NEW_BOARD",
  });
}

export const setPunjabiNums = (bool) => (dispatch) => {
  dispatch({
    type: "2048_PUNJABI_NUMS",
    theNums: bool,
  });
}

export const setResultModal = () => (dispatch) => {
  dispatch({
    type: "SET_RESULT_MODAL",
  });
}

export const closeResultModal = () => (dispatch) => {
  dispatch({
    type: "CLOSE_RESULT_MODAL",
  });
}

export const showMeaningPopUp = (set) => (dispatch) => {
  dispatch({
    type: "SHOW_MEANING_POPUP",
    onOrOff: set
  });
}

export const setMoving = (set) => (dispatch) => {
  dispatch({
    type: "SET_MOVING",
    onOrOff: set
  });
}

export const updateGrid = (set) => (dispatch) => {
  dispatch({
    type: "UPDATE_GRID",
    onOrOff: set
  });
}

export const setWon = (set) => {
  return {
    type: "SET_WON",
    onOrOff: set
  };
}

export const setOver = (set) => {
  return {
    type: "SET_OVER",
    onOrOff: set
  };
}

export const setScore = (score) => {
  return {
    type: "SET_SCORE",
    theScore: score
  };
}

export const setKeepPlaying = (set) => {
  return {
    type: "SET_KEEP_PLAYING",
    onOrOff: set
  };
}

export const setTiles = (tiles) => {
  return {
    type: "SET_TILES",
    theTiles: tiles
  };
}

export const setBest = (best) => {
  return {
    type: "SET_BEST",
    theBest: best
  };
}

export const setVisited = (visit) => {
  return {
    type: "SET_VISITED",
    theVisited: visit
  };
}
