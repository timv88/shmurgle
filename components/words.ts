export type Word = string;
export type Words = Word[];

export function getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

export function guessWord(secretWord: Word, guess: Word): string {
    // _ = letter not present
    // O = letter present but incorrect position
    // X = letter present and correct position

    if (secretWord.length !== 5) {
        throw new Error('Expected secret word to have length of 5');
    }
    if (guess.length !== 5) {
        throw new Error('Expected guess to have length of 5');
    }

    let guessResult = '';
    let remainingLetters = secretWord;

    for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        
        let result = '_';
        if (secretWord[i] === letter) {
            result = 'X';
        } else if (secretWord.indexOf(letter) > -1 && remainingLetters.indexOf(letter) > -1) {
            result = 'O';
        }

        remainingLetters = remainingLetters.replace(letter, '');
        guessResult += result;
    }
    return guessResult;
}

const words: Words = [
    'anise',
    'apple',
    // "aspic",
    // "bacon",
    // "bagel",
    // "basil",
    // "beans",
    // "berry",
    // "bland",
    // "bread",
    // "broil",
    // "candy",
    // "cater",
    // "chard",
    // "chili",
    // "chips",
    // "cream",
    // "crepe",
    // "crisp",
    // "crust",
    // "curds",
    // "curry",
    // "dairy",
    // "dates",
    // "diner",
    // "dough",
    // "dried",
    // "drink",
    // "feast",
    // "flour",
    // "fried",
    // "fruit",
    // "grain",
    // "grape",
    // "gravy",
    // "guava",
    // "herbs",
    // "honey",
    // "icing",
    // "jelly",
    // "juice",
    // "kebab",
    // "knife",
    // "ladle",
    // "lemon",
    // "liver",
    // "lunch",
    // "maize",
    // "mango",
    // "melon",
    // "mints",
    // "mochi",
    // "munch",
    // "olive",
    // "onion",
    // "order",
    // "pasta",
    // "patty",
    // "peach",
    // "pecan",
    // "pilaf",
    // "pizza",
    // "plate",
    // "prune",
    // "punch",
    // "roast",
    // "salad",
    // "salsa",
    // "sauce",
    // "seeds",
    // "slice",
    // "snack",
    // "spicy",
    // "spoon",
    // "spork",
    // "spuds",
    // "squid",
    // "steak",
    // "stove",
    // "straw",
    // "sugar",
    // "sushi",
    // "sweet",
    // "syrup",
    // "thyme",
    // "toast",
    // "torte",
    // "tuber",
    // "wafer",
    // "water",
    // "wheat",
    // "yeast",
];

export default words;
