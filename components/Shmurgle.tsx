import React, {
    createContext,
    useCallback,
    useEffect,
    useReducer,
} from 'react';
import Keyboard from 'react-simple-keyboard';
import clx from 'classnames';
import isTouchDevice from 'is-touch-device';
import Heading from './Heading';
import Background from './Background';
import Attempts from './Attempts';
import styles from '../styles/Shmurgle.module.css';
import buttonStyles from '../styles/Buttons.module.css';
import reducer, { init } from './reducer';
import { Action, actionType, gameStateType } from './types';
import 'react-simple-keyboard/build/css/index.css';
import keyboardStyles from '../styles/Keyboard.module.css';

const {
    INPUT_CHAR,
    GUESS_SECRET,
    NEW_GAME,
    REMOVE_CHAR,
    SHUFFLE_BG,
    TOGGLE_KEYBOARD,
} = actionType;
const { PLAYING } = gameStateType;

export const DispatchContext = createContext({} as React.Dispatch<Action>);

function Shmurgle() {
    const [state, dispatch] = useReducer(reducer, {}, init);
    const {
        currentAttemptIdx,
        currentAttemptValue,
        secretWord,
        gameState,
        previousAttempts,
        backgroundChars,
        emojiBackgroundChars,
        keyboardVisible,
    } = state;

    const onNewGame = useCallback(() => {
        dispatch({ type: NEW_GAME });
        dispatch({ type: SHUFFLE_BG });
    }, []);

    const onEnter = useCallback(
        (gameState: gameStateType) => {
            if (gameState === PLAYING) {
                dispatch({ type: GUESS_SECRET });
            } else {
                onNewGame();
            }
        },
        [onNewGame]
    );

    const onSubmitKey = useCallback((value: string) => {
        dispatch({ type: INPUT_CHAR, payload: value });
    }, []);

    const onBackspace = useCallback(() => {
        dispatch({ type: REMOVE_CHAR });
    }, []);

    const onToggleKeyboard = useCallback(() => {
        dispatch({ type: TOGGLE_KEYBOARD });
    }, []);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const { key } = e;
            switch (key) {
                case 'Enter':
                    onEnter(gameState);
                    break;
                case 'Backspace':
                    onBackspace();
                    break;
                default:
                    if (key.length === 1 && key.match(/[a-z]/i)) {
                        onSubmitKey(key);
                    }
            }
        },
        [gameState, onEnter, onSubmitKey, onBackspace]
    );

    const onVirtualKeyPress = useCallback(
        (button: string) => {
            switch (button) {
                case '{enter}':
                    onEnter(gameState);
                    break;
                case '{backspace}':
                    onBackspace();
                    break;
                case '{newgame}':
                    onNewGame();
                    break;
                case '{hideKeyboard}':
                    onToggleKeyboard();
                    break;
                default:
                    if (button.length === 1 && button.match(/[a-z]/i)) {
                        onSubmitKey(button.toUpperCase());
                    }
            }
        },
        [
            gameState,
            onEnter,
            onSubmitKey,
            onBackspace,
            onNewGame,
            onToggleKeyboard,
        ]
    );

    useEffect(() => {
        // suppress hydration error by executing Math.random() fn's after component mounts
        dispatch({ type: NEW_GAME });
        if(isTouchDevice()) {
            dispatch({ type: TOGGLE_KEYBOARD });
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <DispatchContext.Provider value={dispatch}>
            <div className={styles['shmurgle-container']}>
                <Heading
                    className={styles['shmurgle-heading']}
                    gameState={gameState}
                    currentAttemptIdx={currentAttemptIdx}
                    secretWord={secretWord}
                />
                <Attempts
                    className={styles['shmurgle-attempts']}
                    gameState={gameState}
                    currentAttemptIdx={currentAttemptIdx}
                    currentAttemptValue={currentAttemptValue}
                    previousAttempts={previousAttempts}
                />
                {!keyboardVisible && (
                    <div
                        className={clx(
                            styles['shmurgle-buttons'],
                            buttonStyles['buttons-container']
                        )}
                    >
                        <button
                            className={buttonStyles['button']}
                            onClick={() => onToggleKeyboard()}
                        >
                            Virtual Keyboard
                        </button>
                        <button
                            className={buttonStyles['button']}
                            onClick={() => onNewGame()}
                            disabled={
                                currentAttemptIdx === 0 && gameState === PLAYING
                            }
                        >
                            New Game
                        </button>
                    </div>
                )}
                {keyboardVisible && (
                    <Keyboard
                        onKeyPress={onVirtualKeyPress}
                        physicalKeyboardHighlight
                        theme={clx(
                            'hg-theme-default',
                            'hg-layout-default',
                            styles['shmurgle-keyboard'],
                            keyboardStyles['keyboard-container']
                        )}
                        layout={{
                            default: [
                                '{hideKeyboard} {newgame}',
                                'q w e r t y u i o p {backspace}',
                                'a s d f g h j k l {enter}',
                                'z x c v b n m',
                            ],
                        }}
                        display={{
                            '{hideKeyboard}': 'Hide Keyboard',
                            '{backspace}': 'Backspace',
                            '{newgame}': 'New Game',
                            '{enter}': 'Enter',
                        }}
                        // buttonTheme={[
                        //     {
                        //         class: keyboardStyles.absent,
                        //         buttons: 'q w e f g m',
                        //     },
                        //     {
                        //         class: keyboardStyles.present,
                        //         buttons: 'z l c v',
                        //     },
                        // ]}
                    />
                )}
            </div>
            <Background
                className={styles['shmurgle-background']}
                backgroundChars={backgroundChars}
                emojiBackgroundChars={emojiBackgroundChars}
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
    - background chars
        - pause animations/intervals when there is no window focus
    - assess replacing props with state context
    - subtitle styling
    - persistent storage
    - game stats
    - hint feature
*/
