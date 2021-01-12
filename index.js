const Alexa = require('ask-sdk-core');
const m = require('./src/main');
const hh = require('./src/helperHandlers');
const utih = require('./src/userTurnIntentHandlers');

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    m.LaunchRequestHandler, 
    m.SessionEndedRequestHandler, 
    hh.ChangeThemeIntentHandler, 
    hh.HelpIntentHandler, 
    hh.RepeatIntentHandler, 
    hh.CancelAndStopIntentHandler, 
    utih.UserTurnIntentHandler)
  .addErrorHandlers(m.ErrorHandler)
  .lambda();
