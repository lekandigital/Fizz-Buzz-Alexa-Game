const Alexa = require('ask-sdk-core');
const main = require('./main');
const helper = require('./helperFunctions');

const UserTurnIntentHandler = {
    canHandle(handlerInput) {
        
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'UserTurnIntent';
    },
    
    handle(handlerInput) {
        
        var sessAttr = handlerInput.attributesManager.getSessionAttributes();
        var expectedNum = sessAttr.expectedNum;
        
        var speakOutput;
        
        const inputNum = parseInt(Alexa.getSlotValue(handlerInput.requestEnvelope, 'number'), 10);
        const inputFizz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'fizz');
        const inputBuzz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'buzz');
        const inputFizzBuzz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'fizzbuzz');
        // determine which non-number slot type is used if any
        const inputString = inputFizz || inputBuzz || inputFizzBuzz || undefined;
        // inputString = inputString.toLowerCase();
        
        console.log("This is inputNum " + inputNum);
        console.log("This is inputFizz " + inputFizz);
        console.log("This is inputBuzz " + inputBuzz);
        console.log("This is inputFizzBuzz " + inputFizzBuzz);
        console.log("This is inputFizzBuzz " + inputFizzBuzz);
        console.log("This is inputString " + inputString);
        console.log("This is expectedNum/Fizz/Buzz/FizzBuzz " + helper.fizzBuzz(expectedNum));

        if (helper.isOption(inputNum, inputFizz, inputBuzz, inputFizzBuzz, inputFizzBuzz)) {
            console.log("from unknown block");
            speakOutput = "I don't understand that response. Please say a number, fizz, buzz, or fizzbuzz.";
            
            ret = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + main.repromptMessage).getResponse();
            sessAttr.repeat = ret;
            
            return ret;
        }

        // increment expectedNum so that the value matches the user's and follows the game's progression
        expectedNum++;
        
        // check if the user's input is correct by seeing if inputNum (number slot type)
        // equals expectedNum or the inputString equals correct string for expectedNum
        if ((inputNum === helper.fizzBuzz(expectedNum)) || inputString == helper.fizzBuzz(expectedNum)) {
            
            expectedNum++;
            speakOutput = helper.fizzBuzz(expectedNum).toString();
            
            var ret = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + main.repromptMessage).getResponse();
            
            sessAttr.repeat = ret;
            sessAttr.expectedNum = expectedNum;
            handlerInput.attributesManager.setSessionAttributes(sessAttr);
            
            return ret;
        
        } else {
            
            console.log("expectedNum from end game " + expectedNum);
            speakOutput = "I’m sorry, the correct response was " + helper.fizzBuzz(expectedNum) + ". You lose! Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz!";
            
            sessAttr = null;
            handlerInput.attributesManager.setSessionAttributes(sessAttr);
            
            return handlerInput.responseBuilder.speak(speakOutput).getResponse();
        }
        
    }
};

module.exports = {
    UserTurnIntentHandler : UserTurnIntentHandler
};
