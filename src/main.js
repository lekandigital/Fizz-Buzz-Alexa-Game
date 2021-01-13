// The main.js javascript file contains all the default intents

const Alexa = require('ask-sdk-core');
const helperFunctions = require('./helperFunctions');
const constants = require('./constants');

// handles when the skill starts; invoked at launch of skill
const LaunchRequestHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
        },
        
		handle(handlerInput) {
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			var expectedNum = 1; // expected number keeps track of the game
			var theme = constants.THEMES[Math.floor((Math.random() * 3) + 0)]; // makes the theme random by generating a random number between 0-2
			const speakOutput = helperFunctions.getSpeakOutputForLevel(expectedNum, theme); // this is what the user will hear
			var generatedReturn = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // generates an return output
			sessAttr.repeat = generatedReturn; // updates the repeat value in the session attributes
			sessAttr.theme = theme; // updates the theme in the session attributes
			sessAttr.expectedNum = expectedNum; // updates the expected number in the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets session attributes
			return generatedReturn;
		}
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
        },
        
		handle(handlerInput) {
			console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			var generatedReturn = handlerInput.responseBuilder.speak(constants.B_BYE + "ending session").getResponse(); // generates an return output
			sessAttr = null; // clears the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets the session attributes
			return generatedReturn;
		}
};

// this handles errors that occur
const ErrorHandler = {
	canHandle() {
			return true;
        },
        
		handle(handlerInput, error) {
			const speakOutput = 'Sorry, I had trouble doing what you asked. The error message is ' + error.message + ' Please contact someone at Volley about this and try again.';
			console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			var generatedReturn = handlerInput.responseBuilder.speak(constants.U_UNRECOGNIZED + speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // generates an return output
			sessAttr.repeat = generatedReturn; // updates the repeat value in the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets the session attributes
			return generatedReturn;
		}
};

// exports
module.exports = {
	LaunchRequestHandler: LaunchRequestHandler,
	SessionEndedRequestHandler: SessionEndedRequestHandler,
	ErrorHandler: ErrorHandler
};
