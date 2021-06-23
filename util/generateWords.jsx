import { words } from "./allWords";
import { testWord, uni } from "./test";
export default function getWords() {
  // console.log(uni);
  //console.log(testWord);

  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
  // First word
  const firstWord = getRandomWord();
  // Second Word
  let secondWord = getRandomWord();
  while (firstWord === secondWord) {
    secondWord = getRandomWord();
  }

  const characters = [];
  for (let i = 0; i < firstWord.ascii.length; i += 1) {
    const theChar = firstWord.ascii[i];
    if (!characters.includes(theChar)) {
      characters.push(theChar);
    }
  }
  for (let i = 0; i < secondWord.ascii.length; i += 1) {
    const theChar = secondWord.ascii[i];
    if (!characters.includes(theChar)) {
      characters.push(theChar);
    }
  }
  // console.log(characters);
  // console.log(firstWord, secondWord);

  return [characters, firstWord, secondWord];
}
