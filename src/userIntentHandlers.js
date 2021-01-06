import { Alexa } from './index.js'

const UserTurnIntentHandler = {
    
    canHandle(handlerInput) {
        
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'UserTurnIntent';
    }, 
    handle(handlerInput) {
        
        var speakOutput;
        let inputNum = parseInt(Alexa.getSlotValue(handlerInput.requestEnvelope, 'number'), 10);
        let inputFizz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'fizz');
        let inputBuzz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'buzz');
        let inputFizzBuzz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'fizzbuzz');
        // determine which non-number slot type is used if any
        let inputString = inputFizz || inputBuzz || inputFizzBuzz || undefined;
        // inputString = inputString.toLowerCase();
        
        console.log("This is inputNum " + inputNum);
        console.log("This is inputFizz " + inputFizz);
        console.log("This is inputBuzz " + inputBuzz);
        console.log("This is inputFizzBuzz " + inputFizzBuzz);
        console.log("This is inputFizzBuzz " + inputFizzBuzz);
        console.log("This is inputString " + inputString);
        console.log("This is expectedNum/Fizz/Buzz/FizzBuzz " + fizzBuzz(expectedNum));

        // checks for unrecognized inputs by seeing if input is not a possible option
        if (isInt(inputNum) == false && inputFizz != "fizz" && inputBuzz != "buzz" && inputFizzBuzz != "fizzbuzz" && inputFizzBuzz != "fizz buzz") {
            console.log("from unknown block");
            speakOutput = "I don't understand that response. Please say a number, fizz, buzz, or fizzbuzz.";
            return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + " I'm going to close soon. Please respond.").getResponse();
        }
        
        // increment expectedNum so that the value matches the user's and follows the game's progression
        expectedNum++
        
        // check if the user's input is correct by seeing if inputNum (number slot type)
        // equals expectedNum or the inputString equals correct string for expectedNu,
        if ((inputNum === fizzBuzz(expectedNum)) || inputString == fizzBuzz(expectedNum)) {
            expectedNum++;
            speakOutput = fizzBuzz(expectedNum).toString();
            return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + " I'm going to close soon. Please respond.").getResponse();
        } else {
            console.log("expectedNum from end game " + expectedNum);
            speakOutput = "You lose! I’m sorry, the correct response was " + fizzBuzz(expectedNum) + ". Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz!";
            endGame();
            return handlerInput.responseBuilder.speak(speakOutput).getResponse();
        }
        
    }
}

function customLevelOutput() {
    
}

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

// this function is used to handle operations that have to be
// completed as the game ends such and reseting expectedNum
function endGame() {
    expectedNum = 0;
}

// checks to see if input matches the int type
function isInt(givenNum) {
    
    if (givenNum === parseInt(givenNum, 10)) {
        return true;
    } else {
        return false;
    }

}

module.exports = {
    UserTurnIntentHandler : UserTurnIntentHandler
}


module.exports = {
    LaunchRequestHandler : LaunchRequestHandler,
    HelpIntentHandler : HelpIntentHandler,
    RepeatIntentHandler : RepeatIntentHandler,
    CancelAndStopIntentHandler : CancelAndStopIntentHandler,
    FallbackIntentHandler : FallbackIntentHandler,
    SessionEndedRequestHandler : SessionEndedRequestHandler,
    IntentReflectorHandler : IntentReflectorHandler,
    ErrorHandler : ErrorHandler
}
