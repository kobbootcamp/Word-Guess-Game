//Declare the game object
/* <script type="text/javascript"> */
var usedArr = [];
var thisWord;
var thisWordArr = [];
var guessedLetter;
var down = 1;
var downcolor;
var game = {
    //array of words to guess
    wordsToGuess: ["touchdown", "flag", "yardline", "forwardpass", "hike", "referee", "fieldgoal",
        "penalty", "facemask", "sack", "tackle", "quarterback", "snap", "punt", "catch", "fumble"],
    //array storing the verbage of down (sans distance)
    downAndDistance: ["1st Down!", "2nd Down", "3rd Down", "4th Down", "Turnover!!"],
    downColor: ["downcolor1", "downcolor2", "downcolor3", "downcolor4", "downcolor5"],
    // TestArr: ["downs",["1st Down!", "2nd Down", "3rd Down", "4th Down", "Turnover!!"],["colors" ["white", "yellow", "orange", "red"]]],
    randomGenerator: function () {
        //used to pick a word randomly

        //declare the variable and assign a random number
        var ranNum = Math.floor(Math.random() * 16) - 1;

        //update thisWord variable with the word for the game
        thisWord = game.wordsToGuess[ranNum]

        //return the selected word
        return thisWord;

    },
    displayBlanks: function (word) {
        //displays the number of letters in selected word

        //set the wordHolder to empty
        var wordHolder = "";

        //loop throught the number of letters in the word and create a * for each
        for (var i = 1; i <= word.length; i++) {
            wordHolder = wordHolder + " * ";

            //hold the string in an array
            thisWordArr.push(" * ");
        }
        //return the array
        return wordHolder;
    },
    checkLetterForUse: function (letterUsed) {
        //Check to see if letter was already used

        //Declare local variable and initalize as false
        var letterAlreadyUsed = false

        //loop through the used letter array
        for (var i = 0; i < usedArr.length; i++) {

            //if you find the letter was used...
            if (letterUsed == usedArr[i]) {

                //change flag to true
                letterAlreadyUsed = true;
            }
        };
        //return the flag value
        return letterAlreadyUsed;
    },
    writeToUsed: function (letterUsed) {
        //Write the letter to used letter array

        //initialize the local variabel to empty string
        var temp = ""

        //add the letter tot he used letter array
        usedArr.push(letterUsed);

        //update the variable storing the letters used, separated by commas
        for (var i = 0; i < usedArr.length; i++) {
            temp = temp + usedArr[i] + ",";
        }

        //increment the down counter
        down++;

        //update the lettersUsedBox on the screen
        document.getElementById("lettersUsedBox").innerHTML = temp;

        //update the downAndDistance box on the screen
        document.getElementById("downAndDistance").innerHTML = game.downAndDistance[down - 1]

        //update the background color of the down marker
        document.getElementById("downAndDistance").className = game.downColor[down - 1]

    },
    readLetter: function (letterUsed) {
        //read the letter and determine if it is a winner

        //loop through the length of the word, looking for a hit
        for (var i = 0; i < thisWord.length; i++) {

            //if you find a correct letter...
            if (letterUsed === thisWord.charAt(i)) {
                //replace the * with the correctly chosen letter in the thisWordArr array
                thisWordArr[i] = thisWord.charAt(i);
                //player gets a first down
                down = 1;

                //reset the downAndDistance div to show 1st and ten
                document.getElementById("downAndDistance").innerHTML = game.downAndDistance[down - 1];

                //reset the background color of the down marker
                document.getElementById("downAndDistance").className = game.downColor[down - 1]

                game.displayThisWordArr()
            }
        }
    },
    displayThisWordArr: function () {
        //used to display the correct letters and *'s in the "hang man box"

        //set the local variable to empty set
        var temp = ""

        //loop through the array and add each correct letter or * the temp variable
        for (var i = 0; i < thisWordArr.length; i++) {
            temp = temp + thisWordArr[i];
        }
        //display the results in the hangmanBox div
        document.getElementById("hangmanBox").innerHTML = temp;
    },
    didWeWin: function () {
        //checks to see if we have guessed all the letters
        //by determining if we have any *'s left

        //set the local winner variable to true 
        var winner = true;

        //loop throught the array
        for (var i = 0; i < thisWordArr.length; i++) {

            //if * is found, change the winner false
            if (thisWordArr[i] == " * ") {
                winner = false;
            };
        };
        //return the winner flag
        return winner;
    },
    didWeLose: function () {
        //check to see if we have exhausted all four downs, if so, return true
        if (down == 5) {
            return true;
        }

    }
};

//click start to generate a new word
function KickOff() {
    //randomly select a word from the choice of words
    var wordToGuess = game.randomGenerator();

    //clear the lettersUsedBox
    // document.getElementById("lettersUsedTitle").innerHTML = "Letters used:";
    document.getElementById("lettersUsedBox").innerHTML = "";
    thisWordArr = [];
    usedArr = [];

    //Set up the hangmanbox
    document.getElementById("hangmanBox").innerHTML = game.displayBlanks(wordToGuess);

    //initiate the downAndDistance box
    document.getElementById("downAndDistance").innerHTML = "Set...Hike!";

    //reset the down to 1st
    down = 1;

    //reset the background color of the down marker
    document.getElementById("downAndDistance").className = game.downColor[down - 1]


}



//listen for keystrokes
document.onkeyup = function (event) {
    if (event.key == "Enter") {
        KickOff();
    }
    else {


        guessedLetter = event.key


        //do we have a live game?
        if (down < 5) {


            //if we checkLetterForUse is false (we haven't used the letter)...
            if (game.checkLetterForUse(guessedLetter) == false) {

                //register the key
                game.writeToUsed(guessedLetter);

                //check the letter for accuracy
                game.readLetter(guessedLetter);

                //update the correct guesses
                game.displayThisWordArr();

                //check to see is the game over

                //did we win?
                if (game.didWeWin()) {
                    //update the screen
                    document.getElementById("lettersUsedBox").innerHTML = "YOU WIN!"
                    thisWordArr = [];
                    usedArr = [];
                };

                //did we lose?
                if (game.didWeLose()) {
                    //update the screen
                    document.getElementById("hangmanBox").innerHTML = thisWord;
                    document.getElementById("lettersUsedBox").innerHTML = "Play again."
                    thisWordArr = [];
                    usedArr = [];
                };
            };

        };
    };
};
