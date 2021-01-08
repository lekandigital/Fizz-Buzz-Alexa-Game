// The helperHandlers.js file contains the helper handlers that are used in different parts of the Alexa skill
const Alexa = require('ask-sdk-core');
const constants = require('./constants');
const helperFunctions = require('./helperFunctions');

// handles change theme; invoked by saying change them to mortal kombat, nintendo, or generic
const ChangeThemeIntentHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChangeThemeIntent';
        },
        
		handle(handlerInput) {
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			var theme = sessAttr.theme; // holds the session's theme
			var speakOutput; // this is what the user will hear
			const inputTheme = (handlerInput.requestEnvelope.request.intent.slots.theme.resolutions.resolutionsPerAuthority[0].values[0].value.name).toUpperCase(); // grabs the theme the user selected
            
            // checks if the theme is an option
			if(inputTheme == 'NINTENDO' || inputTheme == 'MORTALCOMBAT' || inputTheme == 'GENERIC') {
				theme = inputTheme; // sets the new theme
				if(theme == 'MORTALCOMBAT') { // checks to see if theme is mortal combat to break to improve pronunciation 
					speakOutput = 'The theme was changed to mortal combat';
				} else {
					speakOutput = 'The theme was changed to ' + theme;
				}
			} else {
				if(theme == 'MORTALCOMBAT') { // checks to see if theme is mortal combat to break to improve pronunciation 
					speakOutput = 'The theme was changed to mortal combat';
				} else {
					speakOutput = 'The theme was changed to ' + theme;
				}
            }
            
			var generatedReturn = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // generates an return output
			sessAttr.theme = theme; // updates theme value in the session attributes
			sessAttr.repeat = generatedReturn; // updates repeat value in the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets session attributes
			return generatedReturn;
		}
};

// handles when the user wants help; invoked by saying saying help and other similar utterances 
const HelpIntentHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
        },
        
		handle(handlerInput) {
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			var expectedNum = sessAttr.expectedNum; // holds the session's expected number
			const speakOutput = 'The instructions are: ' + constants.INSTRUCTIONS + constants.INSTRUCTIONS_THEME + ' The last response was ' + helperFunctions.determineFizzBuzz(expectedNum) + '. OK, it is your turn, let\'s continue. '; // holds what the user will hear
			var generatedReturn = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // generates an return output
			sessAttr.repeat = generatedReturn; // updates repeat value in the session attributes
			sessAttr.expectedNum = expectedNum; // updates the expected number in the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets session attributes
			return generatedReturn;
		}
};

// handles when the user repeats; invoked by saying saying repeat and other similar utterances 
const RepeatIntentHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
        },
        
		handle(handlerInput) {
            var attributes = handlerInput.attributesManager.getSessionAttributes(); // gets the session attributes
            
			if(attributes.repeat != null) { // checks is repeat value is not null
				return attributes.repeat; // returns the session's repeat value, similar to if triggered by an intent
			} else { // there is nothing to repeat
				attributes.repeat = handlerInput.responseBuilder.speak("Hey, there's nothing to repeat").getResponse();
				handlerInput.attributesManager.setSessionAttributes(attributes);
				return attributes.repeat;
			}
		}
};

// handles when the user ends the game; invoked by saying saying stop and other similar utterances 
const CancelAndStopIntentHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
        },
        
		handle(handlerInput) {
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			const speakOutput = "It's a tie. Thanks for playing Fizz Buzz. For another great Alexa game, \
                            check out Song Quiz!"; // this is what the user will hear
			var generatedReturn = handlerInput.responseBuilder.speak(speakOutput + constants.B_BYE).getResponse(); // generates an return output
			sessAttr = null; // clears the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets the session attributes
			return generatedReturn;
		}
};

// exports
module.exports = {
	ChangeThemeIntentHandler: ChangeThemeIntentHandler,
	HelpIntentHandler: HelpIntentHandler,
	RepeatIntentHandler: RepeatIntentHandler,
	CancelAndStopIntentHandler: CancelAndStopIntentHandler
};
