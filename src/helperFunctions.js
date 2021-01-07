function customLevelOutput() {
    
};

// this function determines if the correct output (fizz or buzz or fizz buzz or a number) based on the the given number
function fizzBuzz(givenNum) {
    
    if (givenNum % 3 === 0 && givenNum % 5 !== 0) {
        return "fizz";
    } else if (givenNum % 5 === 0 && givenNum % 3 !== 0) {
        return "buzz"; 
    } else if (givenNum % 3 === 0 && givenNum % 5 === 0) {
        return "fizz buzz";
    } else {
        return givenNum;
    }
}

// checks to see if input matches the int type
function isInt(givenNum) {
    
    if (givenNum === parseInt(givenNum, 10)) {
        return true;
    } else {
        return false;
    }

}

// checks for unrecognized inputs by seeing if input is not a possible option
function isOption(givenInputNum, givenInputFizz, givenInputBuzz, givenInputFizzBuzz) {
    
    if (isInt(givenInputNum) == false && 
        givenInputFizz != "fizz" && 
        givenInputBuzz != "buzz" && 
        givenInputFizzBuzz != "fizzbuzz" && 
        givenInputFizzBuzz != "fizz buzz") {
            
        return true;
    } else {
        return false;
    }
}

module.exports = {
    customLevelOutput : customLevelOutput,
    fizzBuzz : fizzBuzz,
    isOption : isOption
};
