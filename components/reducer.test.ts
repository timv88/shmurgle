import { assert } from 'console';
import { MAX_ATTEMPTS, INITIAL_BACKGROUND_CHARS } from './constants';
import reducer, { init } from './reducer';
import { gameStateType, State, actionType } from './types';

describe('init', () => {
    it('should return an initial state', () => {
        const secretWord = 'ASDFS';

        const expectedState: State = {
            gameState: gameStateType.PLAYING,
            currentAttemptIdx: 0,
            currentAttemptValue: '',
            previousAttempts: [],
            secretWord: secretWord,
            backgroundChars: INITIAL_BACKGROUND_CHARS,
            emojiBackgroundChars: [],
        };

        expect(init({ secretWord })).toEqual(expectedState);
    });
});

describe('reducer', () => {
    describe('NEW_GAME', () => {
        it('should randomnize secretWord', () => {
            const secretWord = 'ASDFS';
            const initialState = init({ secretWord });

            expect(initialState.secretWord).toEqual(secretWord);
            
            const resultState = reducer(initialState, {
                type: actionType.NEW_GAME,
            });

            expect(resultState.secretWord).not.toEqual(secretWord);
        });
    });

    describe('INPUT_CHAR', () => {
        it('should add a character', () => {
            const secretWord = 'ASDFS';
            const initialState = init({ secretWord });

            const resultState = reducer(initialState, {
                type: actionType.INPUT_CHAR,
                payload: 'A',
            });

            expect(resultState.currentAttemptValue).toEqual('A');
        });

        it('should not add a character when gameState is not `PLAYING`', () => {
            const secretWord = 'ASDFS';
            const initialState = {
                ...init({ secretWord }),
                currentAttemptValue: 'ABC',
                gameState: gameStateType.WON,
            };

            const resultState = reducer(initialState, {
                type: actionType.INPUT_CHAR,
                payload: 'D',
            });

            expect(resultState.currentAttemptValue).toEqual('ABC');
        });
    });

    describe('REMOVE_CHAR', () => {
        it('should remove a character', () => {
            const secretWord = 'ASDFS';
            const initialState = {
                ...init({ secretWord }),
                currentAttemptValue: 'ABC',
            };

            const resultState = reducer(initialState, {
                type: actionType.REMOVE_CHAR,
            });

            expect(resultState.currentAttemptValue).toEqual('AB');
        });
    });

    describe('GUESS_SECRET', () => {
        it('should set `gameState` to `WON` on a correct guess', () => {
            const secretWord = 'SCRTS';
            const initialState = {
                ...init({ secretWord }),
                currentAttemptValue: 'SCRTS',
            };

            const resultState = reducer(initialState, {
                type: actionType.GUESS_SECRET,
            });
            expect(resultState.gameState).toEqual(gameStateType.WON);
        });

        it('should set `gameState` to `LOST` when `MAX_ATTEMPTS` is reached', () => {
            const secretWord = 'SCRTS';
            const initialState = {
                ...init({ secretWord }),
                currentAttemptValue: 'SCRTZ',
                currentAttemptIdx: MAX_ATTEMPTS,
            };

            const resultState = reducer(initialState, {
                type: actionType.GUESS_SECRET,
            });
            expect(resultState.gameState).toEqual(gameStateType.LOST);
        });

        it('should return the same state when input is not of valid length', () => {
            const secretWord = 'SCRTS';
            const initialState = {
                ...init({ secretWord }),
                currentAttemptValue: 'SCRT',
            };

            const resultState = reducer(initialState, {
                type: actionType.GUESS_SECRET,
            });

            expect(resultState).toEqual(initialState);
        });

        it('should increase attempt index and clear attempt value on an incorrect result', () => {
            const secretWord = 'SCRTS';
            const initialState = {
                ...init({ secretWord }),
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
});
