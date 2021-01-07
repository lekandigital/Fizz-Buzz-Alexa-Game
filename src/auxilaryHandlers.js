const Alexa = require('ask-sdk-core');

const main = require('./main');
const helper = require('./helperFunctions');

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        
        var sessAttr = handlerInput.attributesManager.getSessionAttributes();
        var expectedNum = sessAttr.expectedNum;
        
        const speakOutput = main.instructions + ' The last response was ' + helper.fizzBuzz(expectedNum) + 
        '. OK, it is your turn, let\'s continue. '; 
        
        console.log("these are the main.instructions " + main.instructions);
        
        var ret = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + main.repromptMessage).getResponse();
        sessAttr.repeat = ret;
        sessAttr.expectedNum = expectedNum;
        handlerInput.attributesManager.setSessionAttributes(sessAttr);
        
        return ret;
    }
};

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        var attributes = handlerInput.attributesManager.getSessionAttributes();
        
        if (attributes.repeat != null) {
            return attributes.repeat;
        } else {
            attributes.repeat = handlerInput.responseBuilder
                .speak("Hey, there's nothing to repeat")
                .getResponse();
            handlerInput.attributesManager.setSessionAttributes(attributes);
            return attributes.repeat; 
        }
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        
        const speakOutput = "It's a tie. Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz!";
        var sessAttr = handlerInput.attributesManager.getSessionAttributes();
        
        var ret = handlerInput.responseBuilder.speak(speakOutput).getResponse();
        sessAttr = null;
        handlerInput.attributesManager.setSessionAttributes(sessAttr);
        
        return ret;
    }
};


module.exports = {
    HelpIntentHandler : HelpIntentHandler,
    RepeatIntentHandler : RepeatIntentHandler,
    CancelAndStopIntentHandler : CancelAndStopIntentHandler
};
