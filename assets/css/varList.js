// INITIALIZE CHARACTERS
// Create an object for each character, including Name, pic, atkStart, hpStart, def, id, sfxSaberOn, sfxSaberOff
var luke = {
	"name": "Luke Skywalker",
	"img": "luke",
	"id": "one",
	"atkStart": 15,
	"hpStart": 150,
	"def": 35,
	"sfxSaberOn": "assets/sfx/saberOnLuke.mp3",
	"sfxSaberOff": "assets/sfx/saberOffLuke.mp3"
};

var obi = {
	"name": "Obi-Wan Kenobi",
	"img": "obi",
	"id": "two",
	"atkStart": 15,
	"hpStart": 175,
	"def": 40,
	"sfxSaberOn": "assets/sfx/saberOnObi.mp3",
	"sfxSaberOff": "assets/sfx/saberOffObi.mp3"
};

var maul = {
	"name": "Darth Maul",
	"img": "maul",
	"id": "three",
	"atkStart": 35,
	"hpStart": 160,
	"def": 0,
	"sfxSaberOn": "assets/sfx/saberOnMaul.mp3",
	"sfxSaberOff": "assets/sfx/saberOffMaul.mp3"
};

var vader = {
	"name": "Darth Vader",
	"img": "vader",
	"id": "four",
	"atkStart": 25,
	"hpStart": 200,
	"def": 10,
	"sfxSaberOn": "assets/sfx/saberOnVader",
	"sfxSaberOff": "saberOffVader"
};

// Create an array to hold the characters
var allCharacters = [luke, obi, maul, vader];
var numCharsLeft = allCharacters.length;

// INITIALIZE OTHER VARIABLES
var curHpPlayer = 0, curAtkPlayer = 0, curHpEnemy = 0;
var cntCrash = 1;
var enemyChar;
var playerChar;
var bkgndAmbient;
var hasHeal = true;
// GAME STATES: newGame, enemySelect, fight, gameOver
var gameState = "newGame";