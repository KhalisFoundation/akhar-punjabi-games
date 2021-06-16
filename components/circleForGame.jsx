import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

function TheCircle(props) {
  if (props.characters < 5) {
    return fourChars();
  } else if (props.characters < 7) {
    return sixChars();
  } else if (props.characters < 9) {
    return eightChars();
  } else if (props.characters < 11) {
    return tenChars();
  } else if (props.characters < 13) {
    return twelveChars();
  } else if (props.characters < 15) {
    return fourteenChars();
  } else if (props.characters < 17) {
    return sixteenChars();
  } else if (props.characters < 19) {
    return eighteenChars();
  }
}

const commonChar = {
  width: "10%",
  height: "10%",
  backgroundColor: "white",
  borderRadius: 10,
};

const commonStyles = StyleSheet.create({
  lettersCircle: {
    bottom: "6%",
    width: "85%",
    height: "45%",
    borderRadius: 200,
    backgroundColor: "#E8C4A5",
  },
  characterText: {
    bottom: "15%",
    fontSize: 25,
    textAlign: "center",
  },
  character1: {
    ...commonChar,
    left: "45%",
    top: "0%",
  },
  character2: {
    ...commonChar,
    left: "45%",
    top: "80%",
  },
});

function fourChars() {
  return (
    <View style={fourCharStyles.lettersCircle}>
      <View style={fourCharStyles.character1}>
        <Text style={fourCharStyles.characterText}>ਮ</Text>
      </View>
      <View style={fourCharStyles.character2}>
        <Text style={fourCharStyles.characterText}>2</Text>
      </View>
      <View style={fourCharStyles.character3}>
        <Text style={fourCharStyles.characterText}>3</Text>
      </View>
      <View style={fourCharStyles.character4}>
        <Text style={fourCharStyles.characterText}>4</Text>
      </View>
    </View>
  );
}
const fourCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: "85%",
    top: "25%",
  },
  character4: {
    ...commonChar,
    left: "5%",
    top: "15%",
  },
});

function sixChars() {
  return (
    <View style={sixCharStyles.lettersCircle}>
      <View style={sixCharStyles.character1}>
        <Text style={sixCharStyles.characterText}>ਮ</Text>
      </View>
      <View style={sixCharStyles.character2}>
        <Text style={sixCharStyles.characterText}>2</Text>
      </View>
      <View style={sixCharStyles.character3}>
        <Text style={sixCharStyles.characterText}>3</Text>
      </View>
      <View style={sixCharStyles.character4}>
        <Text style={sixCharStyles.characterText}>4</Text>
      </View>
      <View style={sixCharStyles.character5}>
        <Text style={sixCharStyles.characterText}>5</Text>
      </View>
      <View style={sixCharStyles.character6}>
        <Text style={sixCharStyles.characterText}>6</Text>
      </View>
    </View>
  );
}
const sixCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: "80%",
    top: "0%",
  },
  character4: {
    ...commonChar,
    left: "15%",
    top: "35%",
  },
  character5: {
    ...commonChar,
    left: "15%",
    top: "-20%",
  },
  character6: {
    ...commonChar,
    left: "80%",
    top: "15%",
  },
  characterText: {
    bottom: "15%",
    fontSize: 35,
    textAlign: "center",
  },
});

function eightChars() {
  return (
    <View style={eightCharStyles.lettersCircle}>
      <View style={eightCharStyles.character1}>
        <Text style={eightCharStyles.characterText}>ਮ</Text>
      </View>
      <View style={eightCharStyles.character2}>
        <Text style={eightCharStyles.characterText}>2</Text>
      </View>
      <View style={eightCharStyles.character3}>
        <Text style={eightCharStyles.characterText}>3</Text>
      </View>
      <View style={eightCharStyles.character4}>
        <Text style={eightCharStyles.characterText}>4</Text>
      </View>
      <View style={eightCharStyles.character5}>
        <Text style={eightCharStyles.characterText}>5</Text>
      </View>
      <View style={eightCharStyles.character6}>
        <Text style={eightCharStyles.characterText}>6</Text>
      </View>
      <View style={eightCharStyles.character7}>
        <Text style={eightCharStyles.characterText}>7</Text>
      </View>
      <View style={eightCharStyles.character8}>
        <Text style={eightCharStyles.characterText}>8</Text>
      </View>
    </View>
  );
}
const eightCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: "80%",
    top: "0%",
  },
  character4: {
    ...commonChar,
    left: "15%",
    top: "35%",
  },
  character5: {
    ...commonChar,
    left: "15%",
    top: "-20%",
  },
  character6: {
    ...commonChar,
    left: "80%",
    top: "15%",
  },
  character7: {
    ...commonChar,
    left: "80%",
    top: "-16%",
  },
  character8: {
    ...commonChar,
    left: "5%",
    top: "-25%",
  },
});

function tenChars() {
  return (
    <View style={tenCharStyles.lettersCircle}>
      <View style={tenCharStyles.character1}>
        <Text style={tenCharStyles.characterText}>ਮ</Text>
      </View>
      <View style={tenCharStyles.character2}>
        <Text style={tenCharStyles.characterText}>2</Text>
      </View>
      <View style={tenCharStyles.character3}>
        <Text style={tenCharStyles.characterText}>3</Text>
      </View>
      <View style={tenCharStyles.character4}>
        <Text style={tenCharStyles.characterText}>4</Text>
      </View>
      <View style={tenCharStyles.character5}>
        <Text style={tenCharStyles.characterText}>5</Text>
      </View>
      <View style={tenCharStyles.character6}>
        <Text style={tenCharStyles.characterText}>6</Text>
      </View>
      <View style={tenCharStyles.character7}>
        <Text style={tenCharStyles.characterText}>7</Text>
      </View>
      <View style={tenCharStyles.character8}>
        <Text style={tenCharStyles.characterText}>8</Text>
      </View>
      <View style={tenCharStyles.character9}>
        <Text style={tenCharStyles.characterText}>9</Text>
      </View>
      <View style={tenCharStyles.character10}>
        <Text style={tenCharStyles.characterText}>10</Text>
      </View>
    </View>
  );
}
const tenCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: "65%",
    top: "-15%",
  },
  character4: {
    ...commonChar,
    left: "10%",
    top: "40%",
  },
  character5: {
    ...commonChar,
    left: "25%",
    top: "-35%",
  },
  character6: {
    ...commonChar,
    left: "80%",
    top: "20%",
  },
  character7: {
    ...commonChar,
    left: "80%",
    top: "-40%",
  },
  character8: {
    ...commonChar,
    left: "10%",
    top: "-50%",
  },
  character9: {
    ...commonChar,
    left: "65%",
    top: "5%",
  },
  character10: {
    ...commonChar,
    left: "25%",
    top: "-5%",
  },
});

function twelveChars() {
  return (
    <View style={twelveCharStyles.lettersCircle}>
      <View style={twelveCharStyles.character1}>
        <Text style={twelveCharStyles.characterText}>ਮ</Text>
      </View>
      <View style={twelveCharStyles.character2}>
        <Text style={twelveCharStyles.characterText}>2</Text>
      </View>
      <View style={twelveCharStyles.character3}>
        <Text style={twelveCharStyles.characterText}>3</Text>
      </View>
      <View style={twelveCharStyles.character4}>
        <Text style={twelveCharStyles.characterText}>4</Text>
      </View>
      <View style={twelveCharStyles.character5}>
        <Text style={twelveCharStyles.characterText}>5</Text>
      </View>
      <View style={twelveCharStyles.character6}>
        <Text style={twelveCharStyles.characterText}>6</Text>
      </View>
      <View style={twelveCharStyles.character7}>
        <Text style={twelveCharStyles.characterText}>7</Text>
      </View>
      <View style={twelveCharStyles.character8}>
        <Text style={twelveCharStyles.characterText}>8</Text>
      </View>
      <View style={twelveCharStyles.character9}>
        <Text style={twelveCharStyles.characterText}>9</Text>
      </View>
      <View style={twelveCharStyles.character10}>
        <Text style={twelveCharStyles.characterText}>10</Text>
      </View>
      <View style={twelveCharStyles.character11}>
        <Text style={twelveCharStyles.characterText}>11</Text>
      </View>
      <View style={twelveCharStyles.character12}>
        <Text style={twelveCharStyles.characterText}>12</Text>
      </View>
    </View>
  );
}
const twelveCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: "65%",
    top: "-15%",
  },
  character4: {
    ...commonChar,
    left: "10%",
    top: "40%",
  },
  character5: {
    ...commonChar,
    left: "25%",
    top: "-35%",
  },
  character6: {
    ...commonChar,
    left: "80%",
    top: "20%",
  },
  character7: {
    ...commonChar,
    left: "80%",
    top: "-40%",
  },
  character8: {
    ...commonChar,
    left: "10%",
    top: "-50%",
  },
  character9: {
    ...commonChar,
    left: "65%",
    top: "5%",
  },
  character10: {
    ...commonChar,
    left: "25%",
    top: "-5%",
  },
  character11: {
    ...commonChar,
    left: "0%",
    top: "-55%",
  },
  character12: {
    ...commonChar,
    left: "90%",
    top: "-65%",
  },
});

function fourteenChars() {
  return (
    <View style={fourteenCharStyles.lettersCircle}>
      <View style={fourteenCharStyles.character1}>
        <Text style={fourteenCharStyles.characterText}>ਮ</Text>
      </View>
      <View style={fourteenCharStyles.character2}>
        <Text style={fourteenCharStyles.characterText}>2</Text>
      </View>
      <View style={fourteenCharStyles.character3}>
        <Text style={fourteenCharStyles.characterText}>3</Text>
      </View>
      <View style={fourteenCharStyles.character4}>
        <Text style={fourteenCharStyles.characterText}>4</Text>
      </View>
      <View style={fourteenCharStyles.character5}>
        <Text style={fourteenCharStyles.characterText}>5</Text>
      </View>
      <View style={fourteenCharStyles.character6}>
        <Text style={fourteenCharStyles.characterText}>6</Text>
      </View>
      <View style={fourteenCharStyles.character7}>
        <Text style={fourteenCharStyles.characterText}>7</Text>
      </View>
      <View style={fourteenCharStyles.character8}>
        <Text style={fourteenCharStyles.characterText}>8</Text>
      </View>
      <View style={fourteenCharStyles.character9}>
        <Text style={fourteenCharStyles.characterText}>9</Text>
      </View>
      <View style={fourteenCharStyles.character10}>
        <Text style={fourteenCharStyles.characterText}>10</Text>
      </View>
      <View style={fourteenCharStyles.character11}>
        <Text style={fourteenCharStyles.characterText}>11</Text>
      </View>
      <View style={fourteenCharStyles.character12}>
        <Text style={fourteenCharStyles.characterText}>12</Text>
      </View>
      <View style={fourteenCharStyles.character13}>
        <Text style={fourteenCharStyles.characterText}>13</Text>
      </View>
      <View style={fourteenCharStyles.character14}>
        <Text style={fourteenCharStyles.characterText}>14</Text>
      </View>
    </View>
  );
}
const fourteenCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: "65%",
    top: "-15%",
  },
  character4: {
    ...commonChar,
    left: "10%",
    top: "40%",
  },
  character5: {
    ...commonChar,
    left: "25%",
    top: "-35%",
  },
  character6: {
    ...commonChar,
    left: "80%",
    top: "20%",
  },
  character7: {
    ...commonChar,
    left: "80%",
    top: "-40%",
  },
  character8: {
    ...commonChar,
    left: "10%",
    top: "-50%",
  },
  character9: {
    ...commonChar,
    left: "65%",
    top: "5%",
  },
  character10: {
    ...commonChar,
    left: "25%",
    top: "-5%",
  },
  character11: {
    ...commonChar,
    left: "0%",
    top: "-65%",
  },
  character12: {
    ...commonChar,
    left: "90%",
    top: "-75%",
  },
  character13: {
    ...commonChar,
    left: "0%",
    top: "-65%",
  },
  character14: {
    ...commonChar,
    left: "90%",
    top: "-75%",
  },
});

function sixteenChars() {
  return (
    <View style={sixteenCharStyles.lettersCircle}>
      <View style={sixteenCharStyles.character1}>
        <Text style={sixteenCharStyles.characterText}>ਮ</Text>
      </View>
      <View style={sixteenCharStyles.character2}>
        <Text style={sixteenCharStyles.characterText}>2</Text>
      </View>
      <View style={sixteenCharStyles.character3}>
        <Text style={sixteenCharStyles.characterText}>3</Text>
      </View>
      <View style={sixteenCharStyles.character4}>
        <Text style={sixteenCharStyles.characterText}>4</Text>
      </View>
      <View style={sixteenCharStyles.character5}>
        <Text style={sixteenCharStyles.characterText}>5</Text>
      </View>
      <View style={sixteenCharStyles.character6}>
        <Text style={sixteenCharStyles.characterText}>6</Text>
      </View>
      <View style={sixteenCharStyles.character7}>
        <Text style={sixteenCharStyles.characterText}>7</Text>
      </View>
      <View style={sixteenCharStyles.character8}>
        <Text style={sixteenCharStyles.characterText}>8</Text>
      </View>
      <View style={sixteenCharStyles.character9}>
        <Text style={sixteenCharStyles.characterText}>9</Text>
      </View>
      <View style={sixteenCharStyles.character10}>
        <Text style={sixteenCharStyles.characterText}>10</Text>
      </View>
      <View style={sixteenCharStyles.character11}>
        <Text style={sixteenCharStyles.characterText}>11</Text>
      </View>
      <View style={sixteenCharStyles.character12}>
        <Text style={sixteenCharStyles.characterText}>12</Text>
      </View>
      <View style={sixteenCharStyles.character13}>
        <Text style={sixteenCharStyles.characterText}>13</Text>
      </View>
      <View style={sixteenCharStyles.character14}>
        <Text style={sixteenCharStyles.characterText}>14</Text>
      </View>
      <View style={sixteenCharStyles.character15}>
        <Text style={sixteenCharStyles.characterText}>15</Text>
      </View>
      <View style={sixteenCharStyles.character16}>
        <Text style={sixteenCharStyles.characterText}>16</Text>
      </View>
    </View>
  );
}
const sixteenCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: "65%",
    top: "-15%",
  },
  character4: {
    ...commonChar,
    left: "10%",
    top: "40%",
  },
  character5: {
    ...commonChar,
    left: "27%",
    top: "-35%",
  },
  character6: {
    ...commonChar,
    left: "80%",
    top: "20%",
  },
  character7: {
    ...commonChar,
    left: "78%",
    top: "-42%",
  },
  character8: {
    ...commonChar,
    left: "10%",
    top: "-52%",
  },
  character9: {
    ...commonChar,
    left: "65%",
    top: "5%",
  },
  character10: {
    ...commonChar,
    left: "25%",
    top: "-5%",
  },
  character11: {
    ...commonChar,
    left: "5%",
    top: "-70%",
  },
  character12: {
    ...commonChar,
    left: "86%",
    top: "-80%",
  },
  character13: {
    ...commonChar,
    left: "6%",
    top: "-63%",
  },
  character14: {
    ...commonChar,
    left: "86%",
    top: "-73%",
  },
  character15: {
    ...commonChar,
    left: "0%",
    top: "-95%",
  },
  character16: {
    ...commonChar,
    left: "90%",
    top: "-105%",
  },
});

export default TheCircle;
