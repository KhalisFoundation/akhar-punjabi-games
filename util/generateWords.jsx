import { words } from "./allWords";
import { asciiWords } from "./changeWords";
export default function getWords() {
  //console.log(asciiWords);
  let a = asciiWords;
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
