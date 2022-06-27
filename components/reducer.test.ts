import { MAX_ATTEMPTS } from './constants';
import reducer, { init } from './reducer';
import { gameStateType, State, actionType } from './types';

describe('init', () => {
    it('should return an initial state', () => {
        const secretWord = 'ASDFS';
        const backgroundChars = ['a', 'S', 'c', 'd', 'e'];

        const expectedState: State = {
            gameState: gameStateType.PLAYING,
            currentAttemptIdx: 0,
            currentAttemptValue: '',
            previousAttempts: [],
            secretWord: secretWord,
            backgroundChars: backgroundChars,
        };

        expect(init({ secretWord, backgroundChars })).toEqual(expectedState);
    });
});

describe('reducer', () => {
    it('should randomnize secretWord and backgroundChars on `NEW_GAME`', () => {
        const secretWord = 'ASDFS';
        const backgroundChars = ['a', 'S', 'c', 'd', 'e'];
        const initialState = init({ secretWord, backgroundChars });

        const resultState = reducer(initialState, {
            type: actionType.NEW_GAME,
        });

        expect(resultState.secretWord).not.toEqual(secretWord);
        expect(resultState.backgroundChars).not.toEqual(backgroundChars);
    });

    it('should add a character on `INPUT_CHAR`', () => {
        const secretWord = 'ASDFS';
        const backgroundChars = ['a', 'S', 'c', 'd', 'e'];
        const initialState = init({ secretWord, backgroundChars });

        const resultState = reducer(initialState, {
            type: actionType.INPUT_CHAR,
            payload: 'A',
        });

        expect(resultState.currentAttemptValue).toEqual('A');
    });

    it('should not add a character on `INPUT_CHAR` when gameState is not `PLAYING`', () => {
        const secretWord = 'ASDFS';
        const backgroundChars = ['a', 'S', 'c', 'd', 'e'];
        const initialState = {
            ...init({ secretWord, backgroundChars }),
            currentAttemptValue: 'ABC',
            gameState: gameStateType.WON,
        };

        const resultState = reducer(initialState, {
            type: actionType.INPUT_CHAR,
            payload: 'D',
        });

        expect(resultState.currentAttemptValue).toEqual('ABC');
    });

    it('should remove a character on `REMOVE_CHAR`', () => {
        const secretWord = 'ASDFS';
        const backgroundChars = ['a', 'S', 'c', 'd', 'e'];
        const initialState = {
            ...init({ secretWord, backgroundChars }),
            currentAttemptValue: 'ABC',
        };

        const resultState = reducer(initialState, {
            type: actionType.REMOVE_CHAR,
        });

        expect(resultState.currentAttemptValue).toEqual('AB');
    });

    it('should set `gameState` to `WON` on `GUESS_SECRET`', () => {
        const secretWord = 'SCRTS';
        const backgroundChars = ['a', 'S', 'c', 'd', 'e'];
        const initialState = {
            ...init({ secretWord, backgroundChars }),
            currentAttemptValue: 'SCRTS',
        };

        const resultState = reducer(initialState, {
            type: actionType.GUESS_SECRET,
        });
        expect(resultState.gameState).toEqual(gameStateType.WON);
    });

    it('should set `gameState` to `LOST` on `GUESS_SECRET` when `MAX_ATTEMPTS` is reached', () => {
        const secretWord = 'SCRTS';
        const backgroundChars = ['a', 'S', 'c', 'd', 'e'];
        const initialState = {
            ...init({ secretWord, backgroundChars }),
            currentAttemptValue: 'SCRTZ',
            currentAttemptIdx: MAX_ATTEMPTS,
        };

        const resultState = reducer(initialState, {
            type: actionType.GUESS_SECRET,
        });
        expect(resultState.gameState).toEqual(gameStateType.LOST);
    });

    it('should return the same state on `GUESS_SECRET` when input is not of valid length', () => {
        const secretWord = 'SCRTS';
        const backgroundChars = ['a', 'S', 'c', 'd', 'e'];
        const initialState = {
            ...init({ secretWord, backgroundChars }),
            currentAttemptValue: 'SCRT',
        };

        const resultState = reducer(initialState, {
            type: actionType.GUESS_SECRET,
        });

        expect(resultState).toEqual(initialState);
    });

    it('should increase attempt index and clear attempt value on an incorrect `GUESS_SECRET` result', () => {
        const secretWord = 'SCRTS';
        const backgroundChars = ['a', 'S', 'c', 'd', 'e'];
        const initialState = {
            ...init({ secretWord, backgroundChars }),
            currentAttemptValue: 'SCRTZ',
            currentAttemptIdx: MAX_ATTEMPTS - 1,
        };

        const resultState = reducer(initialState, {
            type: actionType.GUESS_SECRET,
        });

        expect(resultState.currentAttemptIdx).toEqual(
            initialState.currentAttemptIdx + 1
        );
        expect(resultState.currentAttemptValue).toEqual('');
    });
});
