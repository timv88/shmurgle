import { VALID_STR_LENGTH, MAX_ATTEMPTS } from './Shmurgle';
import { gameStateType, State, Action, actionType } from './types';
import { getRandomWord, guessSecret, getRandomChars } from './wordsService';

export function init({
    secretWord,
    backgroundChars,
}: {
    secretWord: string;
    backgroundChars: string[];
}): State {
    console.log('secretWord', secretWord);
    return {
        gameState: gameStateType.PLAYING,
        currentAttemptIdx: 0,
        currentAttemptValue: '',
        previousAttempts: [],
        secretWord: secretWord.toUpperCase(),
        backgroundChars: backgroundChars,
    };
}

function reducer(state: State, action: Action): State {
    const {
        INPUT_CHAR,
        REMOVE_CHAR,
        GUESS_SECRET,
        NEW_GAME,
        SET_RANDOM_BACKGROUND_CHAR,
    } = actionType;
    const { type, payload } = action;
    const {
        currentAttemptValue,
        secretWord,
        gameState,
        currentAttemptIdx,
        backgroundChars,
    } = state;
    switch (type) {
        case INPUT_CHAR:
            if (
                currentAttemptValue.length < VALID_STR_LENGTH &&
                gameState === gameStateType.PLAYING &&
                payload?.length === 1
            ) {
                return {
                    ...state,
                    currentAttemptValue:
                        currentAttemptValue + payload.toUpperCase(),
                };
            }
            return state;
        case REMOVE_CHAR:
            if (currentAttemptValue.length > 0) {
                return {
                    ...state,
                    currentAttemptValue: currentAttemptValue.slice(0, -1),
                };
            }
            return state;
        case GUESS_SECRET:
            if (
                currentAttemptValue.length === VALID_STR_LENGTH &&
                currentAttemptIdx <= MAX_ATTEMPTS
            ) {
                const attemptResult = guessSecret(
                    secretWord,
                    currentAttemptValue
                );
                let newGameState = gameState;
                let newCurrentAttemptIdx = currentAttemptIdx;

                if (attemptResult === 'XXXXX') {
                    newGameState = gameStateType.WON;
                } else if (currentAttemptIdx === MAX_ATTEMPTS) {
                    newGameState = gameStateType.LOST;
                } else {
                    newCurrentAttemptIdx = newCurrentAttemptIdx + 1;
                }

                return {
                    ...state,
                    gameState: newGameState,
                    currentAttemptIdx: newCurrentAttemptIdx,
                    currentAttemptValue: '',
                    previousAttempts: [
                        ...state.previousAttempts,
                        {
                            input: currentAttemptValue,
                            result: attemptResult,
                        },
                    ],
                };
            }
            return state;
        case SET_RANDOM_BACKGROUND_CHAR:
            // some emojis are represented by 2 JS characters
            if (payload?.length === 1 || payload?.length === 2) {
                const newBackgroundChars = [...backgroundChars];
                const randIndex = Math.floor(
                    Math.random() * backgroundChars.length
                );
                newBackgroundChars[randIndex] = payload;

                return {
                    ...state,
                    backgroundChars: newBackgroundChars,
                };
            }
            return state;
        case NEW_GAME:
            return init({
                secretWord: getRandomWord(),
                backgroundChars: getRandomChars(),
            });
        default:
            throw new Error(`Action type not recognized: ${action.type}`);
    }
}

export default reducer;