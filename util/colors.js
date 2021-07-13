const LightColors = {
  landingPage: {
    playTouchableOpacity: "yellow",
  },
  loadingScreen: {
    container: "white",
  },
  circleForGame: {
    commanChar: "white",
    lettersCircle: "#E8C4A5",
  },
  theGame: {
    container: "#FFF2E1",
    levelDisplay: "#f8f8f8",
    wordBoxAnswers: "#C3E2E6",
    wordBoxText: "#f8f8f8",
    wordAttempt: "#CFF6FF",
    clearBox: "#f8f",
    giveUp: "#f8f8",
    newWord: "yellow",
  },
  settingBar: {
    settingBar: "#f8f8f8",
  },
  settings: {
    container: "#FFF2E1",
  },
  levelDisplay: {
    // container: "#f8f8",
    title: "#66D3FA",
    wordEven: "#3C99DC",
    wordOdd: "#D5F3FE",
  },
  wordsCompleted: {
    container: "#FFF2E1",
    listContainer: "yellow",
    answerBox: "#D5F3FE",
    answerText: "red",
    answerForAnswerText: "blue",
  },
};

const DarkColors = {
  landingPage: {
    playTouchableOpacity: "black",
  },
  loadingScreen: {
    container: "#6e7f80",
  },
  circleForGame: {
    commanChar: "#CDCDCD",
    lettersCircle: "#E8C4A5",
  },
  theGame: {
    container: "#5F909C",
    levelDisplay: "#f8f8f8",
    wordBoxAnswers: "#9C734F",
    wordBoxText: "#f8f8f8",
    wordAttempt: "#CFF6FF",
    clearBox: "#f8f",
    giveUp: "#f8f8",
    newWord: "yellow",
  },
  settingBar: {
    settingBar: "#f8f8",
  },
  settings: {
    container: "#5F909C",
  },
  levelDisplay: {
    // container: "#f8f8",
    title: "#66D3FA",
    wordEven: "#3C99DC",
    wordOdd: "#D5F3FE",
  },
  wordsCompleted: {
    container: "#5F909C",
    listContainer: "yellow",
    answerBox: "#D5F3FE",
    answerText: "red",
    answerForAnswerText: "blue",
  },
};

const theColors = {
  Off: { ...LightColors },
  On: { ...DarkColors },
};

export default theColors;
