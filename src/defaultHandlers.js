import { Alexa } from './index.js'

// The expectedNum variable will be used to track how many times the skill has been called
// and also to keep track of the current number in the fizz buzz game
// var expectedNum = 0;

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        
        console.log("expectedNum from launch " + expectedNum);
        // increment expectedNum so the next number is said to the user
        expectedNum++;
        
        const speakOutput = 
        "Welcome to Fizz Buzz. \
        We’ll each take turns counting up from one. \
        However, you must replace numbers divisible by 3 with the word “fizz” \
        and you must replace numbers divisible by 5 with the word “buzz”. \
        If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. \
        If you get one wrong, you lose. \
        OK, I'll start... " + expectedNum;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput + " I'm going to close soon. Please respond.")
            .getResponse();
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
        endGame();
        return handlerInput.responseBuilder
            .speak("ending session")
            .getResponse();
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered the ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput + " I'm going to close soon. Please respond.")
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */

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
