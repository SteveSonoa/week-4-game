// Load an audio file element. Optional to load an audio file within that element.
function loadAudio(name, file) {
	$("#audioStorage").append("<audio id='" + name + "'></audio>");
	$("#" + name).attr("preload", "auto");
	if(file) {
		$("#" + name).append("<source src='assets/sfx/" + file + ".mp3' type='audio/mpeg'>");
	}
}

// Provide the audio ID to play the file
function playAudio(audioFile) { 
	var x = document.getElementById(audioFile); 
	x.play();
} 

// Provide the audio ID. Creates a random number from 1-5 each time it's called and returns the randomly selected SFX filename.
function rngSfx(sfx) {
	return sfx + (1 + Math.floor(Math.random() * 5));
}

// Selects a new background image and matching ambient SFX
function newScene() {
	// Choose a random number from 0 - 4)
	var bkgndVar = "bkgnd" + (Math.floor(Math.random() * 5));

	// Use that random number to set the correct background image
	$("body").css("background-image", "url(assets/images/" + bkgndVar + ".png)");
	// Use that random number to set the correct background music
		// create a "source" item with "src" attribute set to "assets/sfx/"+bkgndVar+".mp3" & "type" set to "audio/mpeg" 
	var bkgndAudio = document.createElement("audio");
	bkgndAudio.setAttribute("src", "assets/sfx/" + bkgndVar + ".mp3");
	bkgndAudio.setAttribute("type", "audio/mpeg");
	loadAudio("background-music");
	$("#background-music").append(bkgndAudio);
	$("#charSelectTxt").html("<h1>Choose Your Character</h1>");
	// return the audio object to allow play, loop, and stop controls
	return bkgndAudio;
}

// Draws every character in the "Character Select" area
function drawCharSelect(charList) {
	// Empty the charSelect of anything that might be included
	$("#charSelect").empty();
	// Display all characters and hpStart in the charSelect div
	for (var i = 0; i < charList.length; i++) {
		// For each iteration, we will create a div and image tag
	    var charDiv = $("<div>");
	    var charImg = $("<img>");

	    // Add classes, IDs, and attributes to the div using info in the character object
	    charDiv.addClass("char-th");
	    charDiv.attr("id", charList[i].img);

	    // Link the correct thumbnail for each character
	    charImg.attr("src", "assets/images/" + charList[i].img + "-th.png");

	    // Append the new div to charSelect div the HTML
	    $("#charSelect").append(charDiv);
	    // Send the character, which will include the name, photo, and HP, to that new div in the HTML
	    $("#" + charList[i].img).append("<p>" + charList[i].name + "</p>");
	    $("#" + charList[i].img).append(charImg);
	    $("#" + charList[i].img).append("<p>" + charList[i].hpStart + " HP</p>");
	}
}

// When a character is clicked from the charSelect div, return the character's name & reduce the number of available characters
function loadCharacter(chosenOne) {
	if(chosenOne.id == "luke") {
		var character = luke;
		setTimeout(playAudio, 500, "lukeIntro");
	}
	else if(chosenOne.id == "obi") {
		var character = obi;
		setTimeout(playAudio, 500, "obiIntro");
	}
	else if(chosenOne.id == "vader") {
		var character = vader;
		if(isset(playerChar) && playerChar.img == "obi") {
				setTimeout(playAudio, 500, "vaderIntroObi");
			}
			else {
				setTimeout(playAudio, 500, "vaderIntro");
			}
	}
	else {
		var character = maul;
		if(isset(playerChar) && playerChar.img == "vader"){
			setTimeout(playAudio, 500, "maulIntroVader");
		}
		else {
			setTimeout(playAudio, 500, "maulIntro");
		}
	}
	// reduce the available characters count
	numCharsLeft--;
	return character;
}

// Create the large character portrait for both players & enemies
function createBigChar(divName) {
	var myImg = $("<img>");
	if(divName == "player") {
		myImg.addClass("img img-responsive playerImg");
		myImg.attr("src", "assets/images/" + playerChar.img + ".png");
		$("#playerDiv").html(myImg);
	}
	else {
		myImg.addClass("img img-responsive enemyImg");
		myImg.attr("src", "assets/images/" + enemyChar.img + ".png");
		$("#enemyDiv").html(myImg);
	}
}

// Draws the player's HP bar with its current value
function drawPlayerStats() {
	$("#playerHpBarDiv").html("<div class='progress'>" +
			"<div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='" + curHpPlayer + "' aria-valuemin='0' aria-valuemax='" + playerChar.hpStart + "' style='width: " + (( 100 * curHpPlayer)  / playerChar.hpStart) + "%'>" +
			curHpPlayer.toFixed() +
		"</div>" +
	"</div>"
	);
	$("#playerAtkDiv").html("<h3>Attack: " + curAtkPlayer + "</h3>");
	$("#playerDefDiv").html("<h3>Defense: " + playerChar.def + "</h3>");
}

// Draws the enemy's HP bar with its current value
function drawEnemyStats() {
	$("#enemyHpBarDiv").html("<div class='progress'>" +
		"<div class='progress-bar progress-bar-danger' role='progressbar' aria-valuenow='" + curHpEnemy + "' aria-valuemin='0' aria-valuemax='" + enemyChar.hpStart + "' style='width: " + (( 100 * curHpEnemy)  / enemyChar.hpStart) + "%'>" +
		curHpEnemy.toFixed() +
		"</div>" +
	"</div>"
	);	
	$("#enemyAtkDiv").html("<h3>Attack: " + enemyChar.atkStart + "</h3>");
	$("#enemyDefDiv").html("<h3>Defense: " + enemyChar.def + "</h3>");
}

// Heals the player by 100 HP
function healPlayer() {
	// Increase the player's health by 100
	curHpPlayer = curHpPlayer + 150;
	// Do not exceed Max HP
	if(curHpPlayer > playerChar.hpStart) {
		curHpPlayer = playerChar.hpStart;
	}
	drawPlayerStats();
}

// Player attacks the enemy character
function playerAttack() {
	// Player attacks the enemy first
	curHpEnemy = curHpEnemy - (curAtkPlayer - (curAtkPlayer * (enemyChar.def / 100)));
	drawEnemyStats();
	// Player attack doubles after every attack
	curAtkPlayer = curAtkPlayer + playerChar.atkStart;
	$("#playerAtkDiv").html("<h3>Attack: " + curAtkPlayer + "</h3>");
}

function enemyAttack() {
	if(playerChar.img == "luke") {
		curHpPlayer = curHpPlayer - (enemyChar.atkStart + (5 * (allCharacters.length - numCharsLeft)) - (enemyChar.atkStart * (playerChar.def / 100)));
	}
	else {
		curHpPlayer = curHpPlayer - (enemyChar.atkStart + (10 * (allCharacters.length - numCharsLeft)) - (enemyChar.atkStart * (playerChar.def / 100)));
	}
	if(hasHeal1 || hasHeal2) {
		curHpPlayer = curHpPlayer - 10;
	}
}

function playCrash() {
	var myCrash = "saberCrash" + cntCrash;
	cntCrash++;
	if(cntCrash > 4) {
		cntCrash = 1;
	}
	playAudio(myCrash);
}

function resetGame() {
	$("#charSelect").empty();
	$("#playerDiv").empty();
	$("#enemyDiv").empty();
	$("#playerHpBarDiv").empty();
	$("#playerAtkDiv").empty();
	$("#playerDefDiv").empty();
	$("#enemyHpBarDiv").empty();
	$("#enemyAtkDiv").empty();
	$("#enemyDefDiv").empty();
	$("#atkBtn").empty();
	$("#healBtn1").empty();
	$("#healBtn2").empty();
	drawCharSelect(allCharacters);
	numCharsLeft = allCharacters.length;
	curHpPlayer = 0;
	curHpEnemy = 0;
	curAtkPlayer = 0;
	hasHeal1 = true;
	hasHeal2 = true;
	bkgndAmbient.pause();
	bkgndAmbient = newScene();
	bkgndAmbient.play();
	gameState = "newGame";
	playerChar = "";
	enemyChar = "";
}

function btnPlayAgain() {
	$("#charSelect").html(
		"<button type='button' class='btn btn-warning btn-lg' id='btnReset'>Play Again?</button>"
	);
}

function playerWinAudio() {
	playAudio("gameOverWin");
	setTimeout(playAudio, 3000 , playerChar.img + "Win");
}

function playerLoseAudio() {
	playAudio("gameOverLose");
	if(enemyChar.img == "luke" && playerChar.img == "obi") {
		setTimeout(playAudio, 3000 , "lukeWinObi");
	}
	else if(enemyChar.img == "luke" && playerChar.img == "vader") {
		setTimeout(playAudio, 3000 , "lukeWinVader");
	}
	else if(enemyChar.img == "obi" && playerChar.img == "vader") {
		setTimeout(playAudio, 3000 , "obiWinVader");
	}
	else if(enemyChar.img == "vader" && playerChar.img == "obi") {
		setTimeout(playAudio, 3000 , "vaderWinObi");
	}
	else {
		setTimeout(playAudio, 3000 , enemyChar.img + "Win");
	}
}

function playEnemyLoseAudio() {
		if(playerChar.img == "luke" && enemyChar.img == "obi") {
		playAudio("lukeWinObi");
	}
	else if(playerChar.img == "luke" && enemyChar.img == "vader") {
		playAudio("lukeWinVader");
	}
	else if(playerChar.img == "obi" && enemyChar.img == "vader") {
		playAudio("obiWinVader");
	}
	else if(playerChar.img == "vader" && enemyChar.img == "obi") {
		playAudio("vaderWinObi");
	}
	else {
		playAudio(enemyChar.img + "Lose");
	}
}

function isset ()
{
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: FremyCompany
    // +   improved by: Onno Marsman
    // +   improved by: Rafał Kukawski
    // *     example 1: isset( undefined, true);
    // *     returns 1: false
    // *     example 2: isset( 'Kevin van Zonneveld' );
    // *     returns 2: true

  var a = arguments,
    l = a.length,
    i = 0,
    undef;

  if (l === 0)
  {
    throw new Error('Empty isset');
  }

  while (i !== l)
  {
    if (a[i] === undef || a[i] === null)
    {
      return false;
    }
    i++;
  }
  return true;
}