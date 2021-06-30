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

  const characters = []; // english characters/unicode
  for (let i = 0; i < firstWord.engText.length; i += 1) {
    const theChar = firstWord.engText.charAt(i);
    if (!characters.includes(theChar)) {
      characters.push(theChar);
    }
  }
  for (let i = 0; i < secondWord.engText.length; i += 1) {
    const theChar = secondWord.engText.charAt(i);
    if (!characters.includes(theChar)) {
      characters.push(theChar);
    }
  }
  return [characters, firstWord, secondWord];
}
