import * as anvaad from "anvaad-js";
import { words } from "./allWords";

export const asciiWords = words.map((word) => {
  let lst = anvaad.ascii(word.text);
  console.log(lst);
  //lst = lst.slice(1, lst.length - 1);
  return {
    ...word,
  };
});

//console.log(asciiWords[0]);
// console.log(anvaad.ascii("ਨਾਮ"));
// console.log(String.fromCharCode(anvaad.ascii("ਨਾਮ")));
