import { getRandomWord, guessSecret } from './wordsService';
import { VALID_STR_LENGTH } from './constants';
import { charResultType } from './types';

const { PRESENT, ABSENT, CORRECT } = charResultType;

describe('getRandom()', () => {
    it('should return a string of valid length', () => {
        const result = getRandomWord();
        expect(result.length).toEqual(VALID_STR_LENGTH);
    });
})

describe('guessSecret()', () => {
    it('(1)should return a correct string of result types', () => {
        const secretWord = 'SPOON';
        const value = 'OOOOO';
        const expectedResult = `${ABSENT}${ABSENT}${CORRECT}${CORRECT}${ABSENT}`;
        const result = guessSecret(secretWord, value);

        expect(result).toEqual(expectedResult);
    });
    it('(2)should return a correct string of result types', () => {
        const secretWord = 'SPOON';
        const value = 'OOXXX';
        const expectedResult = `${PRESENT}${PRESENT}${ABSENT}${ABSENT}${ABSENT}`;
        const result = guessSecret(secretWord, value);

        expect(result).toEqual(expectedResult);
    });
    it('(3)should return a correct string of result types', () => {
        const secretWord = 'SPOON';
        const value = 'XOOXX';
        const expectedResult = `${ABSENT}${PRESENT}${CORRECT}${ABSENT}${ABSENT}`;
        const result = guessSecret(secretWord, value);

        expect(result).toEqual(expectedResult);
    });
    it('(4)should return a correct string of result types', () => {
        const secretWord = 'SPOON';
        const value = 'OXOXO';
        const expectedResult = `${PRESENT}${ABSENT}${CORRECT}${ABSENT}${ABSENT}`;
        const result = guessSecret(secretWord, value);

        expect(result).toEqual(expectedResult);
    });
    it('(5)should return a correct string of result types', () => {
        const secretWord = 'SPOON';
        const value = 'XXXOO';
        const expectedResult = `${ABSENT}${ABSENT}${ABSENT}${CORRECT}${PRESENT}`;
        const result = guessSecret(secretWord, value);

        expect(result).toEqual(expectedResult);
    });
    it('(6)should return a correct string of result types', () => {
        const secretWord = 'SPOON';
        const value = 'XOXOX';
        const expectedResult = `${ABSENT}${PRESENT}${ABSENT}${CORRECT}${ABSENT}`;
        const result = guessSecret(secretWord, value);

        expect(result).toEqual(expectedResult);
    });
    it('(7)should return a correct string of result types', () => {
        const secretWord = 'SOOON';
        const value = 'OXOOO';
        const expectedResult = `${PRESENT}${ABSENT}${CORRECT}${CORRECT}${ABSENT}`;
        const result = guessSecret(secretWord, value);

        expect(result).toEqual(expectedResult);
    });
})