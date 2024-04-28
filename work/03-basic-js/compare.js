"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
  let same_word = 0;
  guess = guess.toUpperCase();
  word = word.toUpperCase();
  const word_list = [];
  const guess_list = [];
  for(let i = 0; i < word.length; i++) {
    word_list.push(word[i]);
  }
  for(let j = 0; j < guess.length; j++) {
    guess_list.push(guess[j]);
  }
  for(let k = 0; k < word_list.length; k++) {
    for(let m = 0; m < guess_list.length; m++){
      if(guess_list[m] === word_list[k]){
        same_word += 1;
        guess_list.splice(m, 1); 
        break;
      }
    }
  }
  return same_word;
}
