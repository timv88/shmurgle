import React, { createContext, useCallback, useEffect, useReducer } from 'react';
import Heading from './Heading';
import Background from './Background';
import Attempts from './Attempts';
import styles from '../styles/Shmurgle.module.css';
import reducer, { init } from './reducer';
import { Action, actionType, gameStateType } from './types';

export const VALID_STR_LENGTH = 5;
export const MAX_ATTEMPTS = 4; // 5 attempts counting from 0
export const DispatchContext = createContext({} as React.Dispatch<Action>);

function Shmurgle() {
    const [state, dispatch] = useReducer(
        reducer,
        {
            // suppress hydration errors
            secretWord: 'abcde',
            backgroundChars: ['a', 'b', 'c', 'd', 'e'],
        },
        init
    );
    const {
        currentAttemptIdx,
        currentAttemptValue,
        secretWord,
        gameState,
        previousAttempts,
        backgroundChars,
    } = state;
    
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const { key } = e;
            switch(key) {
                case 'Enter':
                    if (gameState === gameStateType.PLAYING) {
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
    
    useEffect(() => {
        // suppress hydration error by executing Math.random() fn's after component mounts
        dispatch({ type: actionType.NEW_GAME });
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <DispatchContext.Provider value={ dispatch }>
            <div className={styles.shmurgle_container}>
                <Heading
                    gameState={gameState}
                    currentAttemptIdx={currentAttemptIdx}
                    secretWord={secretWord}
                />
                <Attempts 
                    gameState={gameState}
                    currentAttemptIdx={currentAttemptIdx}
                    currentAttemptValue={currentAttemptValue}
                    previousAttempts={previousAttempts}
                />
                <button
                    className={styles.reset_button}
                    onClick={() => dispatch({ type: actionType.NEW_GAME })}
                    disabled={
                        currentAttemptIdx === 0 && gameState === gameStateType.PLAYING
                    }
                >
                    New Game
                </button>
            </div>
            <Background
                backgroundChars={backgroundChars}
                gameState={gameState}
                currentAttemptIdx={currentAttemptIdx}
                currentAttemptValue={currentAttemptValue}
                previousAttempts={previousAttempts}
            />
        </DispatchContext.Provider>
    );
}

export default Shmurgle;

/* 
    TODOS'
    - limit background character rendering to viewport
    - assess replacing props with state context
    - some game logic tests
    - heading/sub title styling
    - assess touch support
*/
