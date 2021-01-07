const Alexa = require('ask-sdk-core');

const instructions = 'The instructions are: \
        We’ll each take turns counting up from one. \
        However, you must replace numbers divisible by 3 with the word “fizz” \
        and you must replace numbers divisible by 5 with the word “buzz”. \
        If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. \
        If you get one wrong, you lose.';
const repromptMessage = ' I am going to close soon. Please respond.';

// The expectedNum variable will be used to track how many times the skill has been called
// and also to keep track of the current number in the fizz buzz game
// var expectedNum = 0;
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        
        console.log("expectedNum from launch " + expectedNum);

        var sessAttr = handlerInput.attributesManager.getSessionAttributes();
        var expectedNum = 1;
        
        const speakOutput = 
        "Welcome to Fizz Buzz. \
        We’ll each take turns counting up from one. \
        However, you must replace numbers divisible by 3 with the word “fizz” \
        and you must replace numbers divisible by 5 with the word “buzz”. \
        If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. \
        If you get one wrong, you lose. \
        OK, I'll start... " + expectedNum;
        
        var ret = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + repromptMessage).getResponse();
        sessAttr.repeat = ret;
        sessAttr.expectedNum = expectedNum;
        handlerInput.attributesManager.setSessionAttributes(sessAttr);
        return ret;
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
        var sessAttr = handlerInput.attributesManager.getSessionAttributes();

        var ret = handlerInput.responseBuilder.speak("ending session").getResponse();
        sessAttr = null;
        handlerInput.attributesManager.setSessionAttributes(sessAttr);
        
        return ret;
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. The error message is ' + error.message + ' Please contact someone at Volley about this and try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        var sessAttr = handlerInput.attributesManager.getSessionAttributes();
        var ret = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + repromptMessage).getResponse();
        sessAttr.repeat = ret;
        handlerInput.attributesManager.setSessionAttributes(sessAttr);
        return ret;
    }
};

module.exports = {
    LaunchRequestHandler : LaunchRequestHandler,
    SessionEndedRequestHandler : SessionEndedRequestHandler,
    ErrorHandler : ErrorHandler,
    instructions : instructions,
    repromptMessage : repromptMessage
};
