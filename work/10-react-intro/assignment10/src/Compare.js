const Compare = {

    gameCompare: function(word, guess) {
        function letterCountsOf( someWord ) { // Could move outside 
            const letterCounts = {};
            someWord.toUpperCase().split('').forEach( letter => {
              letterCounts[letter] = letterCounts[letter] + 1 || 1;
            });
            return letterCounts;
          }

        const wordCounts = letterCountsOf(word);
        const guessCounts = letterCountsOf(guess);
        let matched = 0;
        for( const letter in guessCounts ){
            const wordCount = wordCounts[letter] || 0;
            const guessCount = guessCounts[letter] || 0;
            matched += Math.min( wordCount, guessCount );
        }
        return matched;
    },

    exactMatch: function(word, guess) {
        return word.toUpperCase() === guess.toUpperCase();
    },


};

export default Compare;