import { getRandomWord, guessSecret } from './wordsService';
import {
    VALID_STR_LENGTH,
    MAX_ATTEMPTS,
    INITIAL_BACKGROUND_CHARS,
} from './constants';
import {
    gameStateType,
    State,
    Action,
    actionType,
    charResultType,
} from './types';
import shuffle from 'lodash.shuffle';

const { PLAYING, WON, LOST } = gameStateType;
const {
    INPUT_CHAR,
    REMOVE_CHAR,
    GUESS_SECRET,
    NEW_GAME,
    RANDOMNIZE_BG_EMOJI_IDX,
} = actionType;

export function init({
    secretWord,
    backgroundChars,
}: {
    secretWord: string;
    backgroundChars?: string[];
}): State {
    console.log('secretWord', secretWord);
    return {
        gameState: PLAYING,
        currentAttemptIdx: 0,
        currentAttemptValue: '',
        previousAttempts: [],
        secretWord: secretWord.toUpperCase(),
        backgroundChars: backgroundChars
            ? backgroundChars
            : INITIAL_BACKGROUND_CHARS,
        backgroundEmojisIdx: [],
    };
}

function reducer(state: State, action: Action): State {
    const { type, payload } = action;
    const {
        currentAttemptValue,
        secretWord,
        gameState,
        currentAttemptIdx,
        backgroundChars,
        backgroundEmojisIdx,
    } = state;
    switch (type) {
        case INPUT_CHAR:
            if (
                currentAttemptValue.length < VALID_STR_LENGTH &&
                gameState === PLAYING &&
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

                const isAttemptResultCorrect = attemptResult
                    .split('')
                    .every(
                        (charResult) => charResult === charResultType.CORRECT
                    );

                if (isAttemptResultCorrect) {
                    newGameState = WON;
                } else if (currentAttemptIdx === MAX_ATTEMPTS) {
                    newGameState = LOST;
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
        case RANDOMNIZE_BG_EMOJI_IDX:
            const backgroundIndexes = backgroundChars.map((_, i) => i);
            const availableBgIndexes = backgroundIndexes.filter(
                (v) => !state.backgroundEmojisIdx.includes(v)
            );

            let newBackgroundEmojisIdx = [...backgroundEmojisIdx];

            if (availableBgIndexes.length > backgroundChars.length / 2) {
                // add new emoji
                const randAvailableIdx = Math.floor(
                    Math.random() * availableBgIndexes.length
                );
                newBackgroundEmojisIdx = [
                    ...newBackgroundEmojisIdx,
                    availableBgIndexes[randAvailableIdx],
                ];
            } else {
                const randIdx = Math.floor(
                    Math.random() * backgroundEmojisIdx.length
                );
                newBackgroundEmojisIdx = [
                    ...backgroundEmojisIdx.splice(randIdx, 1),
                ];
            }

            return {
                ...state,
                backgroundEmojisIdx: newBackgroundEmojisIdx,
            };

        case NEW_GAME:
            return init({
                secretWord: getRandomWord(),
                backgroundChars: shuffle(INITIAL_BACKGROUND_CHARS),
            });
        default:
            throw new Error(`Action type not recognized: ${action.type}`);
    }
}

export default reducer;
