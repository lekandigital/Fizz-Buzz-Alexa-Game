const Alexa = require('ask-sdk-core');
const main = require('./src/main');
const hh = require('./src/helperHandlers');
const utih = require('./src/userTurnIntentHandlers');

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    main.LaunchRequestHandler, 
    main.SessionEndedRequestHandler, 
    hh.ChangeThemeIntentHandler, 
    hh.HelpIntentHandler, 
    hh.RepeatIntentHandler, 
    hh.CancelAndStopIntentHandler, 
    utih.UserTurnIntentHandler)
  .addErrorHandlers(main.ErrorHandler)
  .lambda();
