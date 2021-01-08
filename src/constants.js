// The constants.js file contains the non-mutables that are referenced in different parts of the Alexa skill

// messages
const INSTRUCTIONS = 'We’ll each take turns counting up from one. \
                    However, you must replace numbers divisible by 3 with the word “fizz” \
                    and you must replace numbers divisible by 5 with the word “buzz”. \
                    If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. \
                    If you get one wrong, you lose.';
const INSTRUCTIONS_THEME = ' By the way, themes are selected randomly. You can change \
                    the theme, by saying change theme to nintendo, mortal combat, or generic.';
const REPROMPT_MESSAGE = '. I am going to close soon. Please respond.';
const LOOSE_MESSAGE = '. Sometimes you win and sometimes you learn. How to do math! \
                    Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz!';

// themes tuple
const THEMES = ['NINTENDO', 'MORTALCOMBAT', 'GENERIC'];

// audio assets for nintendo theme
const N_START = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Donkey+Kong/Start.mp3" />';
const N_LEVELTWO = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Donkey+Kong/LevelTwo.mp3" />';
const N_LEVELTHREE = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Donkey+Kong/LevelThree.mp3" />';
const N_LEVELFOUR = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Donkey+Kong/LevelFour.mp3" />';
const N_LOOSE = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Donkey+Kong/Loose.mp3" />';

// audio assets for mortal combat theme
const MC_START_01 = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Moral+Combat/Start1.mp3" />';
const MC_START_02 = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Moral+Combat/Start2.mp3" />';
const MC_START_03 = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Moral+Combat/Start3.mp3" />';
const MC_LEVELTWO_01 = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Moral+Combat/LevelTwo1.mp3" />';
const MC_LEVELTWO_02 = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Moral+Combat/LevelTwo2.mp3" />';
const MC_LEVELTHREE_01 = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Moral+Combat/LevelThree1.mp3" />';
const MC_LEVELTHREE_02 = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Moral+Combat/LevelThree2.mp3" />';
const MC_LEVELFOUR = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Moral+Combat/LevelFour.mp3" />';
const MC_LOOSE_01 = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Moral+Combat/Loose1.mp3" />';
const MC_LOOSE_02 = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Moral+Combat/Loose2.mp3" />';

// audio assets for generic theme
const G_START = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Generic/Start.mp3" />';
const G_LEVELTWO = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Generic/LevelTwo.mp3" />';
const G_LEVELTHREE = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Generic/LevelThree.mp3" />';
const G_LEVELFOUR = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Generic/LevelFour.mp3" />';
const G_LOOSE_01 = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Generic/Loose1.mp3" />';
const G_LOOSE_02 = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Generic/Loose2.mp3" />';
const G_LOOSE_03 = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Generic/Loose3-Bye.mp3" />';

// audio assets for repeat intent
const R_FLASHBACK = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Repeat/Repeat.mp3" />';

// audio assets for unrecognized intent
const U_UNRECOGNIZED = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Unrecognized/Unrecognized.mp3" />';

// audio assets for bye intent
const B_BYE = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Bye/Loose3-Bye.mp3" />';

// exports
module.exports = {
	INSTRUCTIONS: INSTRUCTIONS,
	INSTRUCTIONS_THEME: INSTRUCTIONS_THEME,
	REPROMPT_MESSAGE: REPROMPT_MESSAGE,
	LOOSE_MESSAGE: LOOSE_MESSAGE,
	THEMES: THEMES,
	N_START,
	N_LEVELTWO,
	N_LEVELTHREE,
	N_LEVELFOUR,
	N_LOOSE,
	MC_START_01,
	MC_START_02,
	MC_START_03,
	MC_LEVELTWO_01,
	MC_LEVELTWO_02,
	MC_LEVELTHREE_01,
	MC_LEVELTHREE_02,
	MC_LEVELFOUR,
	MC_LOOSE_01,
	MC_LOOSE_02,
	G_START,
	G_LEVELTWO,
	G_LEVELTHREE,
	G_LEVELFOUR,
	G_LOOSE_01,
	G_LOOSE_02,
	G_LOOSE_03,
	R_FLASHBACK,
	U_UNRECOGNIZED,
	B_BYE
};
