import { Alexa } from './index.js'

const welcomePrompt = 'The instructions are: \
        We’ll each take turns counting up from one. \
        However, you must replace numbers divisible by 3 with the word “fizz” \
        and you must replace numbers divisible by 5 with the word “buzz”. \
        If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. \
        If you get one wrong, you lose.';
        
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        
        const speakOutput = welcomePrompt + " The last response was " + fizzBuzz(expectedNum) + 
        ". OK, it's your turn, let's continue. "; 
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput + " I'm going to close soon. Please respond.")
            .getResponse();
    }
};

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        
        var speakOutput = ""
        
        if (fizzBuzz(expectedNum) == 1) {
            speakOutput = 
            "Welcome to Fizz Buzz. \
            We’ll each take turns counting up from one. \
            However, you must replace numbers divisible by 3 with the word “fizz” \
            and you must replace numbers divisible by 5 with the word “buzz”. \
            If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. \
            If you get one wrong, you lose. \
            OK, I'll start... " + expectedNum;
        } else {
            speakOutput = 
            "The last response was " + fizzBuzz(expectedNum) + 
            ". OK, it's your turn, let's continue. ";  
        }

        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput + " I'm going to close soon. Please respond.")
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        
        const speakOutput = "Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz!";
        
        endGame();
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput =  welcomePrompt + " The last response was " + fizzBuzz(expectedNum) + 
        ". OK, it's your turn, let's continue. "; 

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput + " I'm going to close soon. Please respond.")
            .getResponse();
    }
};

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
