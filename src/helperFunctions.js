// The helperFunctions.js file contains the helper functions that are used in different parts of the Alexa skill
const constants = require('./constants');

/* *
 * description: gets the spoken output based on the expected number and the theme of the game for that turn.
 * parameters: givenExpectedNum, the expected number as the game progresses, and givenTheme, the selected game theme
 * returns: a variable that holds just a string or also mp3 sound assets when a new level is reached
 * */
function getSpeakOutputForLevel(givenExpectedNum, givenTheme) {
	// handles the nintendo theme
	if(givenTheme == 'NINTENDO') {
		if(givenExpectedNum == 1) { // game start
			const generatedReturn = 'Welcome to Fizz Buzz. ' + constants.INSTRUCTIONS + constants.INSTRUCTIONS_THEME + constants.N_START + ' OK, I\'ll start... ' + givenExpectedNum;
			return generatedReturn;
		} else if((givenExpectedNum >= 9) && (givenExpectedNum < 29) && (givenExpectedNum == 11)) { // level two
			const generatedReturn = constants.N_LEVELTWO + determineFizzBuzz(givenExpectedNum).toString();
			return generatedReturn;
		} else if((givenExpectedNum >= 29) && ((givenExpectedNum - 1) % 10 == 0) || (givenExpectedNum == 23)) { // level three and above
			const generatedReturn = constants.N_LEVELTHREE + determineFizzBuzz(givenExpectedNum).toString();
			return generatedReturn;
		} else { // no new level reached
			const generatedReturn = determineFizzBuzz(givenExpectedNum).toString();
			return generatedReturn;
		}
	}

	// handles the mortal combat theme
	if(givenTheme == 'MORTALCOMBAT') {
		if(givenExpectedNum == 1) { // game start
			const generatedReturn = constants.MC_START_01 + 'Welcome to Fizz Buzz. ' + constants.INSTRUCTIONS + constants.INSTRUCTIONS_THEME + constants.MC_START_02 + constants.MC_START_03 + ' OK, I\'ll start... ' + givenExpectedNum;
			return generatedReturn;
		} else if((givenExpectedNum >= 9) && (givenExpectedNum < 29) && (givenExpectedNum == 11)) { // level two
			const generatedReturn = constants.MC_LEVELTWO_01 + constants.MC_LEVELTWO_02 + determineFizzBuzz(givenExpectedNum).toString();
			return generatedReturn;
		} else if((givenExpectedNum >= 29) && (givenExpectedNum < 39) && (givenExpectedNum == 23)) { // level three
			const generatedReturn = constants.MC_LEVELTHREE_01 + constants.MC_LEVELTHREE_02 + determineFizzBuzz(givenExpectedNum).toString();
			return generatedReturn;
		} else if((givenExpectedNum >= 39) && ((givenExpectedNum - 1) % 10 == 0)) { // level four and above
			const generatedReturn = constants.MC_LEVELFOUR + determineFizzBuzz(givenExpectedNum).toString();
			return generatedReturn;
		} else { // no new level reached
			const generatedReturn = determineFizzBuzz(givenExpectedNum).toString();
			return generatedReturn;
		}
	}

	// handles the generic theme
	if(givenTheme == 'GENERIC') {
		if(givenExpectedNum == 1) { // game start
			const generatedReturn = 'Welcome to Fizz Buzz. ' + constants.INSTRUCTIONS + constants.INSTRUCTIONS_THEME + constants.G_START + ' OK, I\'ll start... ' + givenExpectedNum;
			return generatedReturn;
		} else if((givenExpectedNum >= 9) && (givenExpectedNum < 29) && (givenExpectedNum == 11)) { // level two
			const generatedReturn = constants.G_LEVELTWO + determineFizzBuzz(givenExpectedNum).toString();
			return generatedReturn;
		} else if((givenExpectedNum >= 29) && ((givenExpectedNum - 1) % 10 == 0) || (givenExpectedNum == 23)) { // level three and above
			const generatedReturn = constants.G_LEVELTHREE + determineFizzBuzz(givenExpectedNum).toString();
			return generatedReturn;
		} else { // no new level reached
			const generatedReturn = determineFizzBuzz(givenExpectedNum).toString();
			return generatedReturn;
		}
	}
}

/* *
 * description: gets the spoken output when the user looses
 * parameters: givenExpectedNum, the expected number as the game progresses, used to output 
 * correct answer, and givenTheme, the selected game theme
 * returns: a variable that holds just a string and mp3 sound assets 
 * */
function getSpeakOutputForLoss(givenExpectedNum, givenTheme) {
	/* Nintendo: Loose instrumental sound effect. You loose! I’m sorry, the correct response 
	    was 12 (expected number/fizz/buzz/fizzbuzz ie. 12)  
	    Sometimes you win and sometimes you learn. Dot. Dot. Dot. How to do math. 
	    Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz! */
	if(givenTheme == 'NINTENDO') {
		const generatedReturn = constants.N_LOOSE + " You loose! I’m sorry, the correct response was " + determineFizzBuzz(givenExpectedNum) + constants.LOOSE_MESSAGE;
		return generatedReturn;
	}

	/* MK: Laughing. MK: Defended the throne. You loose! I’m sorry, the correct response 
	    was 12 (expected number/fizz/buzz/fizzbuzz ie. 12)  
	    Sometimes you win and sometimes you learn. Dot. Dot. Dot. How to do math. 
	    Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz! */
	if(givenTheme == 'MORTALCOMBAT') {
		const generatedReturn = constants.MC_LOOSE_01 + constants.MC_LOOSE_02 + "I’m sorry, the correct response was " + determineFizzBuzz(givenExpectedNum) + constants.LOOSE_MESSAGE;
		return generatedReturn;
	}

	/* G: Loose instrumental sound effect. G: Aww. You loose! I’m sorry, the correct response 
	    was 12 (expected number/fizz/buzz/fizzbuzz ie. 12)  
	    Sometimes you win and sometimes you learn. Dot. Dot. Dot. How to do math. 
	    Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz! 
	    G: Bye sound effect
	    */
	if(givenTheme == 'GENERIC') {
		const generatedReturn = constants.G_LOOSE_01 + constants.G_LOOSE_02 + "I’m sorry, the correct response was " + determineFizzBuzz(givenExpectedNum) + constants.LOOSE_MESSAGE + constants.G_LOOSE_03;
		return generatedReturn;
	}
}

/* *
 * description: this function determines the correct output (fizz or buzz or fizz buzz or a number) based on the the given number
 * parameters: givenNum, the number that will be processed
 * returns: either fizz, buzz, fizz buzz, or the number depending on the expected number
 * */
function determineFizzBuzz(givenNum) {
	if(givenNum % 3 === 0 && givenNum % 5 !== 0) { // if this is multiple of 3 and not 5, output fizz
		return "fizz";
	} else if(givenNum % 5 === 0 && givenNum % 3 !== 0) { // if this is multiple of 5 and not 3, output buzz
		return "buzz";
	} else if(givenNum % 3 === 0 && givenNum % 5 === 0) { // if this is multiple of 3 and 5, output fizz buzz
		return "fizz buzz";
	} else { // output the number
		return givenNum;
	}
}
/* *
 * description: checks if a given number is an integer data type and returns true if it is
 * parameters: givenNum, the number that will be processed 
 * returns: a boolean 
 * */
function isInt(givenNum) {
	if(givenNum === parseInt(givenNum, 10)) {
		return true;
	} else {
		return false;
	}
}
/* *
 * description: checks if a given slot value is a valid option and returns true if it is
 * parameters: givenInputNum, givenInputFizz, givenInputBuzz, givenInputFizzBuzz, these are all the slot values
 * returns: a boolean 
 * */
function isOption(givenInputNum, givenInputFizz, givenInputBuzz, givenInputFizzBuzz) {
	if(isInt(givenInputNum) == false && givenInputFizz != "fizz" && givenInputBuzz != "buzz" && givenInputFizzBuzz != "fizzbuzz" && givenInputFizzBuzz != "fizz buzz") {
		return true;
	} else {
		return false;
	}
}
// exports
module.exports = {
	getSpeakOutputForLevel: getSpeakOutputForLevel,
	getSpeakOutputForLoss: getSpeakOutputForLoss,
	determineFizzBuzz: determineFizzBuzz,
	isOption: isOption
};
