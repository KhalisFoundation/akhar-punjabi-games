const Anvaad = require("anvaad-js");
const fs = require("fs");

let file = fs.readFileSync("./DataScraping/words.txt", "utf8");
const words = file.split("\n");
for (let i = 0; i < words.length; i++) {
  const wordLst = words[i].split(" , ").slice(0, -1);
  const [theWord, meaning] = wordLst;
  const eng = Anvaad.unicode(theWord, true);
  wordLst.unshift(eng);
  console.log(wordLst);
  for (let i = 0; i < wordLst.length; i += 1) {
    fs.writeFileSync("./DataScraping/unicodeWords.txt", wordLst[i] + " , ", {
      flag: "a+",
    });
  }
  fs.writeFileSync("./DataScraping/unicodeWords.txt", "\n", {
    flag: "a+",
  });
}
