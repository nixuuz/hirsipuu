const input = document.getElementById('guessInput');
const output = document.querySelector('output');
const span = document.getElementById('arvaukset');

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
]

let randomizedWord = '';
let maskedword = '';
let arvaukset = 0;

const newgame = () => {
    const random = Math.floor(Math.random() * 10) + 1;
    randomizedWord = words[random];
    maskedword = "*".repeat(randomizedWord.length);
    console.log(randomizedWord);
    output.innerHTML = maskedword;
    arvaukset = 0;
    span.textContent = arvaukset;
}

const win = () => {
    alert(`You have guessed right, the word is ${randomizedWord}. Number of tries: ${arvaukset}`);
    newgame();
}

const replacefoundchars = (guess) => {
    for (let i = 0; i < randomizedWord.length; i++) {
        const char = randomizedWord.substring(i, i + 1);
        if (char === guess) {
            let newString = maskedword.split('');
            newString.splice(i, 1, guess);
            newString = newString.join('');
            maskedword = newString;
        }
    }
    output.innerHTML = maskedword;
}

newgame();

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();

        arvaukset++;

        const guess = input.value;
        span.textContent = arvaukset;

        if (guess.toLowerCase() === randomizedWord.toLowerCase()) {
            win();
        } else if (guess.length === 1) {
            replacefoundchars(guess);
            if (maskedword.toLocaleLowerCase() === randomizedWord.toLocaleLowerCase()) {
                win();
            }
        } else {
            alert("You guessed wrong!");
        }
        input.value = '';
    }
});