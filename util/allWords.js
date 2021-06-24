import {getWords} from '../utils/database';

const allWords = [];
let importDbWordsArray = [];

const words = async () => {
    importDbWordsArray = await getWords();
    //console.log(temp._array[0]);
   //console.log(await getWords());
   let len = importDbWordsArray._array.length;
    for(let i = 0; i < len; i+=1){
    allWords[i] = {
        text: importDbWordsArray._array[i].words,
        meaning: importDbWordsArray._array[i].definition
    }
}
 };

words();

export default allWords;

