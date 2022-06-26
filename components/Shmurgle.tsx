import React, { useCallback, useEffect, useReducer } from 'react';
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

enum actionType {
    INPUT_CHAR = 'INPUT_CHAR',
    REMOVE_CHAR = 'REMOVE_CHAR',
    SUBMIT = 'SUBMIT',
    NEW_GAME = 'NEW_GAME',
}
interface Action {
    type: actionType;
    payload?: string;
}

type State = {
    gameState: gameState;
    currentAttemptNo: number;
    maxAttempts: number;
    currentAttemptValue: string;
    previousAttempts: previousAttempt[];
    secretWord: string;
};

const initialState: State = {
    gameState: 'playing',
    currentAttemptNo: 0,
    maxAttempts: 4, // 5 attempts counting from 0
    currentAttemptValue: '',
    previousAttempts: [],
    secretWord: getRandomWord().toUpperCase(),
};

function reducer(state: State, action: Action): State {
    const { INPUT_CHAR, REMOVE_CHAR, SUBMIT, NEW_GAME } = actionType;
    const { type, payload } = action;
    const {
        currentAttemptValue,
        secretWord,
        gameState,
        currentAttemptNo,
        maxAttempts,
    } = state;
    switch (type) {
        case INPUT_CHAR:
            if (currentAttemptValue.length < VALID_STR_LENGTH) {
                return {
                    ...state,
                    currentAttemptValue: currentAttemptValue + payload.toUpperCase(),
                };
            }
            return state;
        case REMOVE_CHAR:
            if (currentAttemptValue.length > 0) {
                return {
                    ...state,
                    currentAttemptValue: currentAttemptValue.slice(0, -1),
                }
            }
            return state;
        case SUBMIT:
            if (currentAttemptValue.length === VALID_STR_LENGTH && currentAttemptNo <= maxAttempts) {
                const attemptResult = guessWord(
                    secretWord,
                    currentAttemptValue
                );
                let newGameState = gameState;
                let newCurrentAttemptNo = currentAttemptNo;

                if (attemptResult === 'XXXXX') {
                    newGameState = 'won';
                } else if (currentAttemptNo === maxAttempts) {
                    newGameState = 'lost';
                } else {
                    newCurrentAttemptNo = newCurrentAttemptNo + 1;
                }

                return {
                    ...state,
                    gameState: newGameState,
                    currentAttemptNo: newCurrentAttemptNo,
                    currentAttemptValue: '',
                    previousAttempts: [
                        ...state.previousAttempts,
                        {
                            input: currentAttemptValue,
                            result: attemptResult,
                        },
                    ]
                }
            }
            return state;
        case NEW_GAME:
            return initialState;
        default: 
            throw new Error(`Action type not recognized: ${action.type}`);
    }
}

function Shmurgle() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currentAttemptNo, currentAttemptValue, secretWord, gameState, previousAttempts, maxAttempts } = state;

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const { key } = e;
            switch(key) {
                case 'Enter':
                    if (gameState === 'playing') {
                        dispatch({ type: actionType.SUBMIT });
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
                <div className={styles.attempt} key="current">
                    <Characters input={currentAttemptValue} current />
                </div>
            );
        }
        for (let i = currentAttemptNo; i < maxAttempts; i++) {
            toRender.push(<StaticAttempt key={`${currentAttemptNo}_${i}`} />);
        }

        return toRender;
    }

    console.log('secretWord', secretWord);
    return (
        <>
            <div className={styles.shmurgle_container}>
                <Heading
                    gameState={gameState}
                    currentAttemptNo={currentAttemptNo}
                    maxAttempts={maxAttempts}
                    secretWord={secretWord}
                />
                <div className={styles.attempts_container}>
                    {renderAttempts()}
                </div>
                <button
                    className={styles.reset_button}
                    onClick={() => dispatch({ type: actionType.NEW_GAME})}
                    disabled={currentAttemptNo === 0 && gameState === 'playing'}
                >
                    New Game
                </button>
            </div>
            <Background
                gameState={gameState}
                currentAttemptNo={currentAttemptNo}
                maxAttempts={maxAttempts}
                currentAttemptValue={currentAttemptValue}
                previousAttempts={previousAttempts}
            />
        </>
    );
}

export default Shmurgle;

/* 
    TODOS'
    - gamestate constants
    - heading/sub title font thingy
    - use github action to publish to gh-pages
*/
