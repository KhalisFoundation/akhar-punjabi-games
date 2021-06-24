/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View, Text, StyleSheet, Pressable
} from 'react-native';

function TheCircle(props) {
  // there can only be from 4-18 characters as input
  return charDisplay(props.characters.length, props.characters);
}

const commonChar = {
  width: '10%',
  height: '10%',
  backgroundColor: 'white',
  borderRadius: 10,
};

// TODO - Move all colors to separate file and import as variables.
const commonStyles = StyleSheet.create({
  lettersCircle: {
    bottom: '6%',
    width: '85%',
    height: '45%',
    borderRadius: 200,
    backgroundColor: '#E8C4A5',
  },
  characterText: {
    bottom: '15%',
    fontSize: 25,
    textAlign: 'center',
  },
  character1: {
    ...commonChar,
    left: '45%',
    top: '0%',
  },
  character2: {
    ...commonChar,
    left: '45%',
    top: '80%',
  },
});

function charDisplay(num, letters) {
  let charatersCount = num;
  if (charatersCount % 2 !== 0) {
    charatersCount += 1;
  }
  const numToWord = {
    4: 'four',
    6: 'six',
    8: 'eight',
    10: 'ten',
    12: 'twelve',
    14: 'fourteen',
    16: 'sixteen',
    18: 'eighteen',
  };
  const getStyles = {
    fourCharStyles,
    sixCharStyles,
    eightCharStyles,
    tenCharStyles,
    twelveCharStyles,
    fourteenCharStyles,
    sixteenCharStyles,
    eighteenCharStyles,
  };
  const totalCharInWord = numToWord[charatersCount];
  let styleSheet = `${totalCharInWord}CharStyles`; // a string name of styleSheet
  styleSheet = getStyles[styleSheet]; // the actual styleSheet object

  const getStylesAttributes = {
    character1: styleSheet.character1,
    character2: styleSheet.character2,
    character3: styleSheet.character3,
    character4: styleSheet.character4,
    character5: styleSheet.character5,
    character6: styleSheet.character6,
    character7: styleSheet.character7,
    character8: styleSheet.character8,
    character9: styleSheet.character9,
    character10: styleSheet.character10,
    character11: styleSheet.character11,
    character12: styleSheet.character12,
    character13: styleSheet.character13,
    character14: styleSheet.character14,
    character15: styleSheet.character15,
    character16: styleSheet.character16,
    character17: styleSheet.character17,
    character18: styleSheet.character18,
  };

  const lst = [];
  for (let i = 0; i < charatersCount; i += 1) {
    lst.push(i);
  }
  const randLetter = () => {
    const allLetters = 'ੳਅੲਸਹਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਵੜ';
    return allLetters[Math.floor(Math.random() * allLetters.length)];
  };
  return (
    <View style={styleSheet.lettersCircle}>
      {lst.map((i) => {
        const charNum = `character${(i + 1).toString()}`;
        const theLetter = letters[i] ? letters[i] : randLetter();
        return (
          <Pressable
            onPress={() => {
              console.log('Letter');
            }}
            key={i}
            style={getStylesAttributes[charNum]}
          >
            {({ pressed }) => (
              <Text key={i} style={styleSheet.characterText}>
                {pressed ? '1' : theLetter}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const fourCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: '85%',
    top: '25%',
  },
  character4: {
    ...commonChar,
    left: '5%',
    top: '15%',
  },
});

const sixCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: '80%',
    top: '0%',
  },
  character4: {
    ...commonChar,
    left: '15%',
    top: '35%',
  },
  character5: {
    ...commonChar,
    left: '15%',
    top: '-20%',
  },
  character6: {
    ...commonChar,
    left: '80%',
    top: '15%',
  },
  characterText: {
    bottom: '15%',
    fontSize: 35,
    textAlign: 'center',
  },
});

const eightCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: '80%',
    top: '0%',
  },
  character4: {
    ...commonChar,
    left: '15%',
    top: '35%',
  },
  character5: {
    ...commonChar,
    left: '15%',
    top: '-20%',
  },
  character6: {
    ...commonChar,
    left: '80%',
    top: '15%',
  },
  character7: {
    ...commonChar,
    left: '80%',
    top: '-16%',
  },
  character8: {
    ...commonChar,
    left: '5%',
    top: '-25%',
  },
});

const tenCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: '65%',
    top: '-15%',
  },
  character4: {
    ...commonChar,
    left: '10%',
    top: '40%',
  },
  character5: {
    ...commonChar,
    left: '25%',
    top: '-35%',
  },
  character6: {
    ...commonChar,
    left: '80%',
    top: '20%',
  },
  character7: {
    ...commonChar,
    left: '80%',
    top: '-40%',
  },
  character8: {
    ...commonChar,
    left: '10%',
    top: '-50%',
  },
  character9: {
    ...commonChar,
    left: '65%',
    top: '5%',
  },
  character10: {
    ...commonChar,
    left: '25%',
    top: '-5%',
  },
});

const twelveCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: '65%',
    top: '-15%',
  },
  character4: {
    ...commonChar,
    left: '10%',
    top: '40%',
  },
  character5: {
    ...commonChar,
    left: '25%',
    top: '-35%',
  },
  character6: {
    ...commonChar,
    left: '80%',
    top: '20%',
  },
  character7: {
    ...commonChar,
    left: '80%',
    top: '-40%',
  },
  character8: {
    ...commonChar,
    left: '10%',
    top: '-50%',
  },
  character9: {
    ...commonChar,
    left: '65%',
    top: '5%',
  },
  character10: {
    ...commonChar,
    left: '25%',
    top: '-5%',
  },
  character11: {
    ...commonChar,
    left: '0%',
    top: '-55%',
  },
  character12: {
    ...commonChar,
    left: '90%',
    top: '-65%',
  },
});

const fourteenCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: '65%',
    top: '-15%',
  },
  character4: {
    ...commonChar,
    left: '10%',
    top: '40%',
  },
  character5: {
    ...commonChar,
    left: '25%',
    top: '-35%',
  },
  character6: {
    ...commonChar,
    left: '80%',
    top: '20%',
  },
  character7: {
    ...commonChar,
    left: '80%',
    top: '-40%',
  },
  character8: {
    ...commonChar,
    left: '10%',
    top: '-50%',
  },
  character9: {
    ...commonChar,
    left: '65%',
    top: '5%',
  },
  character10: {
    ...commonChar,
    left: '25%',
    top: '-5%',
  },
  character11: {
    ...commonChar,
    left: '0%',
    top: '-65%',
  },
  character12: {
    ...commonChar,
    left: '90%',
    top: '-75%',
  },
  character13: {
    ...commonChar,
    left: '0%',
    top: '-65%',
  },
  character14: {
    ...commonChar,
    left: '90%',
    top: '-75%',
  },
});

const sixteenCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: '65%',
    top: '-15%',
  },
  character4: {
    ...commonChar,
    left: '10%',
    top: '40%',
  },
  character5: {
    ...commonChar,
    left: '27%',
    top: '-35%',
  },
  character6: {
    ...commonChar,
    left: '80%',
    top: '20%',
  },
  character7: {
    ...commonChar,
    left: '78%',
    top: '-42%',
  },
  character8: {
    ...commonChar,
    left: '10%',
    top: '-52%',
  },
  character9: {
    ...commonChar,
    left: '65%',
    top: '5%',
  },
  character10: {
    ...commonChar,
    left: '25%',
    top: '-5%',
  },
  character11: {
    ...commonChar,
    left: '5%',
    top: '-70%',
  },
  character12: {
    ...commonChar,
    left: '86%',
    top: '-80%',
  },
  character13: {
    ...commonChar,
    left: '6%',
    top: '-63%',
  },
  character14: {
    ...commonChar,
    left: '86%',
    top: '-73%',
  },
  character15: {
    ...commonChar,
    left: '0%',
    top: '-95%',
  },
  character16: {
    ...commonChar,
    left: '90%',
    top: '-105%',
  },
});

const eighteenCharStyles = StyleSheet.create({
  ...commonStyles,
  character3: {
    ...commonChar,
    left: '65%',
    top: '-15%',
  },
  character4: {
    ...commonChar,
    left: '10%',
    top: '40%',
  },
  character5: {
    ...commonChar,
    left: '27%',
    top: '-35%',
  },
  character6: {
    ...commonChar,
    left: '80%',
    top: '20%',
  },
  character7: {
    ...commonChar,
    left: '78%',
    top: '-42%',
  },
  character8: {
    ...commonChar,
    left: '10%',
    top: '-52%',
  },
  character9: {
    ...commonChar,
    left: '65%',
    top: '5%',
  },
  character10: {
    ...commonChar,
    left: '25%',
    top: '-5%',
  },
  character11: {
    ...commonChar,
    left: '5%',
    top: '-70%',
  },
  character12: {
    ...commonChar,
    left: '86%',
    top: '-80%',
  },
  character13: {
    ...commonChar,
    left: '6%',
    top: '-63%',
  },
  character14: {
    ...commonChar,
    left: '86%',
    top: '-73%',
  },
  character15: {
    ...commonChar,
    left: '0%',
    top: '-95%',
  },
  character16: {
    ...commonChar,
    left: '90%',
    top: '-105%',
  },
  character17: {
    ...commonChar,
    left: '0%',
    top: '-75%',
  },
  character18: {
    ...commonChar,
    left: '90%',
    top: '-85%',
  },
});

export default TheCircle;
