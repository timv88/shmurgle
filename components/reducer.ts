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
    EMOJIFY_BG,
    SHUFFLE_BG,
    TOGGLE_KEYBOARD,
} = actionType;

export function init({
    secretWord = 'W8ING',
    backgroundChars = INITIAL_BACKGROUND_CHARS,
    keyboardVisible = false,
}: {
    secretWord?: string;
    backgroundChars?: string[];
    keyboardVisible?: boolean;
}): State {
    console.log('secretWord', secretWord);
    return {
        gameState: PLAYING,
        currentAttemptIdx: 0,
        currentAttemptValue: '',
        previousAttempts: [],
        secretWord: secretWord.toUpperCase(),
        backgroundChars: backgroundChars,
        emojiBackgroundChars: [],
        keyboardVisible: keyboardVisible,
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
        emojiBackgroundChars,
    } = state;
    switch (type) {
        case INPUT_CHAR:
            if (
                currentAttemptValue.length < VALID_STR_LENGTH &&
                gameState === PLAYING &&
                typeof payload === 'string' &&
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
        case EMOJIFY_BG:
            const availableChars = backgroundChars.filter(char => !emojiBackgroundChars.includes(char));

            let newEmojiBackgroundChars = [...emojiBackgroundChars];
            if (availableChars.length < (backgroundChars.length / 2)) {
                const randIndex = Math.floor(
                    Math.random() * newEmojiBackgroundChars.length
                );
                newEmojiBackgroundChars = [
                    ...newEmojiBackgroundChars.slice( 0, randIndex ),
                    ...newEmojiBackgroundChars.slice( randIndex + 1 )
                ];
            } else {
                const randIndex = Math.floor(Math.random() * availableChars.length);
                newEmojiBackgroundChars.push(availableChars[randIndex]);
            }

            return {
                ...state,
                emojiBackgroundChars: newEmojiBackgroundChars,
            }
        case SHUFFLE_BG:
            if (typeof payload === 'number' && payload >= 0) {
                const newBackgroundChars = [ ...backgroundChars ];
                for (let i = 0; i < payload; i++) {
                    const randIdx1 = Math.floor(Math.random() * backgroundChars.length);
                    const randIdx2 = Math.floor(Math.random() * backgroundChars.length);

                    const temp = newBackgroundChars[randIdx1];
                    newBackgroundChars[randIdx1] = newBackgroundChars[randIdx2];
                    newBackgroundChars[randIdx2] = temp;
                }
                return {
                    ...state,
                    backgroundChars: newBackgroundChars,
                }
            }
            return {
                ...state,
                backgroundChars: shuffle(backgroundChars)
            }
        case TOGGLE_KEYBOARD:
            return {
                ...state,
                keyboardVisible: !state.keyboardVisible
            }
        case NEW_GAME:
            return init({
                secretWord: getRandomWord(),
                keyboardVisible: state.keyboardVisible
            });
        default:
            throw new Error(`Action type not recognized: ${action.type}`);
    }
}

export default reducer;
