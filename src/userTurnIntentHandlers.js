// The userTurnIntentHandlers.js file handles the user's turn

const Alexa = require('ask-sdk-core');
const constants = require('./constants');
const helperFunctions = require('./helperFunctions');

// handles the user's turn; invoked by saying a number, fizz, buzz, or fizz buzz
const UserTurnIntentHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'UserTurnIntent';
        },
        
		handle(handlerInput) {
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			var expectedNum = sessAttr.expectedNum; // holds expectedNum, this keeps track of the current turn
			var theme = sessAttr.theme; // holds the session's theme
			
			var speakOutput; // this is what the user will hear
			
			const inputNum = parseInt(Alexa.getSlotValue(handlerInput.requestEnvelope, 'number'), 10);
			const inputFizz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'fizz');
			const inputBuzz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'buzz');
			const inputFizzBuzz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'fizzbuzz');
            		const inputString = inputFizz || inputBuzz || inputFizzBuzz || undefined; // determine which non-number slot type is used if any
            
			// handle unknowns
			if(helperFunctions.isOption(inputNum, inputFizz, inputBuzz, inputFizzBuzz, inputFizzBuzz)) {
				speakOutput = "I don't understand that response. Please say a number, fizz, buzz, or fizzbuzz.";
				generatedReturn = handlerInput.responseBuilder.speak(constants.U_UNRECOGNIZED + speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // generates an return output
				sessAttr.repeat = generatedReturn; // updates repeat value in the session attributes
				return generatedReturn;
			} else { // it is a valid option
				expectedNum++; // increment expectedNum so that the value matches the user and follows the game's progression
            		}
            
			// handle the given slot
			if((inputNum === helperFunctions.determineFizzBuzz(expectedNum)) || inputString == helperFunctions.determineFizzBuzz(expectedNum)) { // check if the user's input is correct by seeing if inputNum (number slot type) equals expectedNum or the inputString equals correct string for expectedNum
				expectedNum++;
				speakOutput = helperFunctions.getSpeakOutputForLevel(expectedNum, theme);
				
				var generatedReturn = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // generates an return output
				
				sessAttr.repeat = generatedReturn; // updates the repeat value in the session attributes
				sessAttr.expectedNum = expectedNum; //updates the expected number in the session attributes
				handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets the session attributes
				return generatedReturn;
			} else { // handle wrong answer
				speakOutput = helperFunctions.getSpeakOutputForLoss(expectedNum, theme);
				sessAttr = null; // clears the session because the game has ended
				handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets the session attributes
				return handlerInput.responseBuilder.speak(speakOutput).getResponse();
			}
		}
};

// exports
module.exports = {
	UserTurnIntentHandler: UserTurnIntentHandler
};
