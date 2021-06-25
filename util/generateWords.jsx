import * as Anvaad from 'anvaad-js';
import { words } from './allWords';

export default function getWords() {
  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
  // First word
  const firstWord = getRandomWord();
  // Second Word
  let secondWord = getRandomWord();
  while (firstWord === secondWord) {
    secondWord = getRandomWord();
  }

  firstWord.text = Anvaad.unicode(firstWord.text, true);
  secondWord.text = Anvaad.unicode(secondWord.text, true);
  // making the gurmukhi words into eng/unicode

  const characters = []; // english characters/unicode
  for (let i = 0; i < firstWord.text.length; i += 1) {
    const theChar = firstWord.text.charAt(i);
    if (!characters.includes(theChar)) {
      characters.push(theChar);
    }
  }
  for (let i = 0; i < secondWord.text.length; i += 1) {
    const theChar = secondWord.text.charAt(i);
    if (!characters.includes(theChar)) {
      characters.push(theChar);
    }
  }
  return [characters, firstWord, secondWord];
}
