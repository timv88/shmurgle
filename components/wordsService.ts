export function getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

export function guessSecret(secretWord: string, value: string): string {
    // _ = char not present
    // O = char present but incorrect position
    // X = char present and correct position

    if (secretWord.length !== 5) {
        throw new Error('Expected secret word to have length of 5');
    }
    if (value.length !== 5) {
        throw new Error('Expected value to have length of 5');
    }

    let valueResult = '';
    let remainingChars = secretWord;

    for (let i = 0; i < value.length; i++) {
        const char = value[i];
        
        let result = '_';
        if (secretWord[i] === char) {
            result = 'X';
        } else if (secretWord.indexOf(char) > -1 && remainingChars.indexOf(char) > -1) {
            result = 'O';
        }

        remainingChars = remainingChars.replace(char, '');
        valueResult += result;
    }
    return valueResult;
}

export function getRandomChars(amount = 650): string[] {
    // TODO don't render outside viewport
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomChars: string[] = [];

    for (let i = 0; i < amount; i++) {
        const char = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        randomChars.push(char);
    }

    return randomChars;
}

const words: string[] = [
    'anise',
    'apple',
    "aspic",
    "bacon",
    "bagel",
    "basil",
    "beans",
    "berry",
    "bland",
    "bread",
    "broil",
    "candy",
    "cater",
    "chard",
    "chili",
    "chips",
    "cream",
    "crepe",
    "crisp",
    "crust",
    "curds",
    "curry",
    "dairy",
    "dates",
    "diner",
    "dough",
    "dried",
    "drink",
    "feast",
    "flour",
    "fried",
    "fruit",
    "grain",
    "grape",
    "gravy",
    "guava",
    "herbs",
    "honey",
    "icing",
    "jelly",
    "juice",
    "kebab",
    "knife",
    "ladle",
    "lemon",
    "liver",
    "lunch",
    "maize",
    "mango",
    "melon",
    "mints",
    "mochi",
    "munch",
    "olive",
    "onion",
    "order",
    "pasta",
    "patty",
    "peach",
    "pecan",
    "pilaf",
    "pizza",
    "plate",
    "prune",
    "punch",
    "roast",
    "salad",
    "salsa",
    "sauce",
    "seeds",
    "slice",
    "snack",
    "spicy",
    "spoon",
    "spork",
    "spuds",
    "squid",
    "steak",
    "stove",
    "straw",
    "sugar",
    "sushi",
    "sweet",
    "syrup",
    "thyme",
    "toast",
    "torte",
    "tuber",
    "wafer",
    "water",
    "wheat",
    "yeast",
];

export default words;