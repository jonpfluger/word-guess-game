var startBtn = document.querySelector('.start-button');
var resetBtn = document.querySelector('.reset-button');
var wordBlanksEl = document.querySelector('.word-blanks');
var scoreEl = document.querySelector('.score');
var timerEl = document.querySelector('.timer-count')

var validChars = "abcdefghijklmnopqrstuvwxyz";
var words = ["javascript", "variable", "function", "object", "modulus", "localstorage", "timeout", "interval"];
var word;
var guessedCharacters = [];
var score = 0;
var timeLeft = 15;
var intervalId;

function startCountdown() {
    clearInterval(intervalId);
    intervalId = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(intervalId);
            wordBlanksEl.innerText = "Game over! Your score is " + score;
            resetScore();
        }
    }, 1000);
}

function checkWord() {
    var wordFromDOM = wordBlanksEl.textContent.split(' ').join('');

    if (word === wordFromDOM) {
        score++;
        scoreEl.textContent = score;
        startRound();
    }

}

function handleKeydown(event) {
    if (validChars.includes(event.key)) {
        // keep track of the character that was guessed
        guessedCharacters.push(event.key);
        // re-render wordBlanks.textContent
        renderCharacters();
    }
}

function renderCharacters() {
    var str = "";
    for (var i = 0; i < word.length; i++) {
        var letter = word[i];
        if (guessedCharacters.includes(letter)) {
            str += letter + " ";
        } else {
            str += '_ ';
        };
    }
    wordBlanksEl.textContent = str.trim();
    checkWord();
}

function startRound() {
    guessedCharacters = [];
    var randomIndex = Math.floor(Math.random() * words.length);
    word = words[randomIndex];
    renderCharacters();
    startCountdown();
}

function resetScore() {
    score = 0;
    timeLeft = 15;

    clearInterval(intervalId);

    scoreEl.textContent = score;
    timerEl.textContent = timeLeft;
}


startBtn.addEventListener("click", startRound)
resetBtn.addEventListener("click", resetScore)

document.addEventListener("keydown", handleKeydown)
