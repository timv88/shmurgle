import reducer, { init } from './reducer';
import {
    gameStateType,
    State,
    actionType,
} from './types';

describe('init', () => {
    it('return an initial state', () => {
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
    it('randomnize secretWord and backgroundChars on `NEW_GAME`', () => {
        const secretWord = 'ASDFS';
        const backgroundChars = ['a', 'S', 'c', 'd', 'e'];
        const initialState = init({ secretWord, backgroundChars });

        const state = reducer(initialState, { type: actionType.NEW_GAME });

        expect(state.secretWord).not.toEqual(secretWord);
        expect(state.backgroundChars).not.toEqual(backgroundChars);
    });
});
