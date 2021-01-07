const Alexa = require('ask-sdk-core');
const main = require('./src/main');
const ah = require('./src/auxilaryHandlers');
const uih = require('./src/userIntentHandlers');

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    main.LaunchRequestHandler,
    main.SessionEndedRequestHandler,
    ah.HelpIntentHandler,
    ah.RepeatIntentHandler,
    ah.CancelAndStopIntentHandler,
    uih.UserTurnIntentHandler)
  .addErrorHandlers(main.ErrorHandler)
  .lambda();
