/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
 
// todo 
// Check when to use double equal or triple equal
// Reread instructions
// Maybe play game sound when user gets to ten
// Make user or alexa starting random
// Remove unnecessary increments
// Add more intents (stop, repeat etc)
// Make sure Colin marks are good

const Alexa = require('ask-sdk-core');

// The expectedNum variable will be used to track how many times the skill has been called
// and also to keep track of the current number in the fizz buzz game
var expectedNum = 0;


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        expectedNum++;
        console.log("expectedNum from launch " + expectedNum);
        const speakOutput = 
        "Welcome to Fizz Buzz. \
        We’ll each take turns counting up from one. \
        However, you must replace numbers divisible by 3 with the word “fizz” and you must replace numbers divisible by 5 with the word “buzz”. \
        If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. \
        If you get one wrong, you lose. \
        OK, I'll start... " + expectedNum;
        expectedNum++;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const UserTurnIntentHandler = {
    
    canHandle(handlerInput) {
        
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'UserTurnIntent';
    }, 
    handle(handlerInput) {

        let inputNum = Alexa.getSlotValue(handlerInput.requestEnvelope, 'number');
        let inputFizz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'fizz');
        let inputBuzz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'buzz');
        let inputFizzBuzz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'fizzbuzz');
        
        let speakOutput;
        
        console.log("this is inputNum " + inputNum);
        
        if (fizzBuzzBool(expectedNum) != true) {
            inputNum = parseInt(Alexa.getSlotValue(handlerInput.requestEnvelope, 'number'), 10);
            if  (inputNum > expectedNum) {
                // too high
                console.log("expectedNum from too high " + expectedNum);
            } else if (inputNum < expectedNum) {
                // too low
                console.log("expectedNum from too low " + expectedNum);
            } else if (inputNum == expectedNum) {
                expectedNum++;
                speakOutput = fizzBuzz(expectedNum);
                expectedNum++;
            } else {
                // end game
                console.log("expectedNum from end game " + expectedNum);
            }

        } else {
            
            if (fizzBuzzBool(expectedNum) == true) {
                if (inputFizz == fizzBuzz(expectedNum)) {
                    console.log("from fizz block pre increment " + expectedNum);
                    expectedNum++;
                    speakOutput = fizzBuzz(expectedNum);
                    expectedNum++;
                    console.log("output " + speakOutput);
                    console.log("from fizz block " + expectedNum);
                } else {
                    // wrong fizz
                    console.log("wrong fizz");
                }
                
                if (inputBuzz == fizzBuzz(expectedNum)) {
                    expectedNum++;
                    speakOutput = fizzBuzz(expectedNum);
                    expectedNum++;
                    console.log("from buzz block " + expectedNum);
                } else {
                    // wrong buzz
                    console.log("wrong buzz");
                }
                
                if (inputFizzBuzz == fizzBuzz(expectedNum)) {
                    expectedNum++;
                    speakOutput = fizzBuzz(expectedNum);
                    expectedNum++;
                    console.log("from fizzbuzz block " + expectedNum);
                } else {
                    // wrong fizzbuzz
                    console.log("wrong fizzbuzz");
                }
            } else {
                console.log("could not undersand")
            }
            
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
}

function fizzBuzz(givenNum) {
    
    if (givenNum % 3 === 0 && givenNum % 5 !== 0) {
        return "fizz";
    }
    
    if (givenNum % 5 === 0 && givenNum % 3 !== 0) {
        return "buzz"; 
    }
    
    if (givenNum % 3 === 0 && givenNum % 5 === 0) {
        return "fizz buzz";
    }

	return givenNum.toString();
}

// should i try to use two returns different after checking the type of the paramater? but i feel like that's complicated to read
function fizzBuzzBool(givenNum) {
    
    if (givenNum % 3 === 0 && givenNum % 5 !== 0) {
        return true;
    }
    
    if (givenNum % 5 === 0 && givenNum % 3 !== 0) {
        return true;
    }
    
    if (givenNum % 3 === 0 && givenNum % 5 === 0) {
        return true;
    }

	return false;
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
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
        
        const speakOutput = 'Goodbye!';
        
        expectedNum = 0;
        
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
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
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
        // Any cleanup logic goes here.
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
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
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
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        UserTurnIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
