/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
 
const Alexa = require('ask-sdk-core');

// The expectedNum variable will be used to track how many times the skill has been called
// and also to keep track of the current number in the fizz buzz game
var expectedNum = 0;


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
            .reprompt(speakOutput)
            .getResponse();
    }
};

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
            speakOutput = "I don't understand that response. Please try again.";
            return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
        }
        
        // increment expectedNum so that the value matches the user's and follows the game's progression
        expectedNum++
        
        // check if the user's input is correct by seeing if inputNum (number slot type)
        // equals expectedNum or the inputString equals correct string for expectedNu,
        if ((inputNum === fizzBuzz(expectedNum)) || inputString == fizzBuzz(expectedNum)) {
            expectedNum++;
            speakOutput = fizzBuzz(expectedNum).toString();
            return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
        } else {
            console.log("expectedNum from end game " + expectedNum);
            speakOutput = "You lose! I’m sorry, the correct response was " + fizzBuzz(expectedNum) + ". Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz!";
            endGame();
            return handlerInput.responseBuilder.speak(speakOutput).getResponse();
        }
        
    }
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

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        
        const speakOutput = 
        "The instructions are: \
        We’ll each take turns counting up from one. \
        However, you must replace numbers divisible by 3 with the word “fizz” \
        and you must replace numbers divisible by 5 with the word “buzz”. \
        If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. \
        If you get one wrong, you lose. The last response was " + fizzBuzz(expectedNum) + 
        ". OK, it's your turn, let's continue. "; 
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
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
        const speakOutput = 
        "The instructions are: \
        We’ll each take turns counting up from one. \
        However, you must replace numbers divisible by 3 with the word “fizz” \
        and you must replace numbers divisible by 5 with the word “buzz”. \
        If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. \
        If you get one wrong, you lose. The last response was " + fizzBuzz(expectedNum) + 
        ". OK, it's your turn, let's continue. "; 

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
        UserTurnIntentHandler,
        HelpIntentHandler,
        RepeatIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
