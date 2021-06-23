import { words } from "./allWords";
import { testWord, uni } from "./test";
import * as Anvaad from "anvaad-js";
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
  for (let i = 0; i < firstWord.text.length; i += 1) {
    let theChar = firstWord.text.charAt(i);
    theChar = Anvaad.unicode(theChar, true);
    if (!characters.includes(theChar)) {
      characters.push(theChar);
    }
  }
  for (let i = 0; i < secondWord.text.length; i += 1) {
    let theChar = secondWord.text.charAt(i);
    theChar = Anvaad.unicode(theChar, true);
    if (!characters.includes(theChar)) {
      characters.push(theChar);
    }
  }
  console.log(characters);
  // console.log(firstWord, secondWord);

  return [characters, firstWord, secondWord];
}
