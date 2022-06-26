import React, { createContext, useCallback, useEffect, useReducer } from 'react';
import StaticAttempt from './StaticAttempt';
import Characters from './Characters';
import { getRandomWord, guessWord } from './words';
import Heading from './Heading';
import styles from '../styles/Shmurgle.module.css';
import Background from './Background';

export type previousAttempt = {
    input: string;
    result: string;
};

export type gameState = 'playing' | 'won' | 'lost';
export const VALID_STR_LENGTH = 5;

export enum actionType {
    INPUT_CHAR = 'INPUT_CHAR',
    REMOVE_CHAR = 'REMOVE_CHAR',
    GUESS_SECRET = 'GUESS_SECRET',
    NEW_GAME = 'NEW_GAME',
    SET_RANDOM_BACKGROUND_CHAR = 'SET_RANDOM_BACKGROUND_CHAR',
}
interface Action {
    type: actionType;
    payload?: string;
}

type State = {
    gameState: gameState;
    currentAttemptIdx: number;
    maxAttempts: number;
    currentAttemptValue: string;
    previousAttempts: previousAttempt[];
    secretWord: string;
    backgroundChars: string[];
};


function getRandomChars(amount = 650): string[] {
    // TODO don't render outside viewport
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomChars: string[] = [];
    
    for (let i = 0; i < amount; i++) {
        const char = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        randomChars.push(char);
    }

    return randomChars;
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
        maxAttempts,
        backgroundChars,
    } = state;
    switch (type) {
        case INPUT_CHAR:
            if (
                currentAttemptValue.length < VALID_STR_LENGTH &&
                gameState === 'playing' &&
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
                currentAttemptIdx <= maxAttempts
            ) {
                const attemptResult = guessWord(
                    secretWord,
                    currentAttemptValue
                );
                let newGameState = gameState;
                let newCurrentAttemptIdx = currentAttemptIdx;

                if (attemptResult === 'XXXXX') {
                    newGameState = 'won';
                    // setinerval
                } else if (currentAttemptIdx === maxAttempts) {
                    newGameState = 'lost';
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

function init({ secretWord, backgroundChars }: { secretWord: string, backgroundChars: string[] }): State {
    return {
        gameState: 'playing',
        currentAttemptIdx: 0,
        maxAttempts: 4, // 5 attempts counting from 0
        currentAttemptValue: '',
        previousAttempts: [],
        secretWord: secretWord.toUpperCase(),
        backgroundChars: backgroundChars,
    };
}

export const DispatchContext = createContext({} as React.Dispatch<Action>);

function Shmurgle() {
    const [state, dispatch] = useReducer(
        reducer,
        {
            // suppress hydration errors. maybe not necessary once exported as client-side app
            // secretWord: 'abcde',
            // backgroundChars: ['a', 'b', 'c', 'd', 'e'],
            secretWord: getRandomWord(),
            backgroundChars: getRandomChars(),
        },
        init
    );
    const {
        currentAttemptIdx,
        currentAttemptValue,
        secretWord,
        gameState,
        previousAttempts,
        maxAttempts,
        backgroundChars,
    } = state;

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const { key } = e;
            switch(key) {
                case 'Enter':
                    if (gameState === 'playing') {
                        dispatch({ type: actionType.GUESS_SECRET });
                    } else {
                        dispatch({ type: actionType.NEW_GAME });
                    }
                    break;
                case 'Backspace':
                    dispatch({ type: actionType.REMOVE_CHAR });
                    break;
                default:
                    if (key.length === 1 && key.match(/[a-z]/i)) {
                        dispatch({ type: actionType.INPUT_CHAR, payload: key });
                    }
                
            }
        },
        [gameState]
    );
    
    // useEffect(() => {
    //     // can be removed if hydration is not an issue once exported
    //     dispatch({ type: actionType.NEW_GAME });
    // }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    function renderAttempts(): JSX.Element[] {
        const toRender = [];

        previousAttempts.forEach((attempt, index) => {
            toRender.push(
                <StaticAttempt
                    key={`prev_${index}`}
                    attemptInput={attempt.input}
                    attemptResult={attempt.result}
                />
            );
        });
        if (gameState === 'playing') {
            toRender.push(
                <div className={styles.attempt} key="currentAttempt">
                    <Characters input={currentAttemptValue} current />
                </div>
            );
        }
        for (let i = currentAttemptIdx; i < maxAttempts; i++) {
            toRender.push(<StaticAttempt key={`${currentAttemptIdx}_${i}`} />);
        }

        return toRender;
    }

    console.log('secretWord', secretWord);
    return (
        <DispatchContext.Provider value={ dispatch }>
            <div className={styles.shmurgle_container}>
                <Heading
                    gameState={gameState}
                    currentAttemptIdx={currentAttemptIdx}
                    maxAttempts={maxAttempts}
                    secretWord={secretWord}
                />
                <div className={styles.attempts_container}>
                    {renderAttempts()}
                </div>
                <button
                    className={styles.reset_button}
                    onClick={() => dispatch({ type: actionType.NEW_GAME })}
                    disabled={
                        currentAttemptIdx === 0 && gameState === 'playing'
                    }
                >
                    New Game
                </button>
            </div>
            <Background
                backgroundChars={backgroundChars}
                gameState={gameState}
                currentAttemptIdx={currentAttemptIdx}
                maxAttempts={maxAttempts}
                currentAttemptValue={currentAttemptValue}
                previousAttempts={previousAttempts}
            />
        </DispatchContext.Provider>
    );
}

export default Shmurgle;

/* 
    TODOS'
    - some game logic tests
    - gamestate constants
    - heading/sub title font thingy
*/
