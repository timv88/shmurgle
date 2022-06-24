import React, { createRef, EventHandler } from 'react';
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

type State = {
    maxAttempts: number;
    currentAttemptNo: number;
    currentAttemptValue: string;
    secretWord: string;
    gameState: gameState;
    previousAttempts: previousAttempt[];
};

class Shmurgle extends React.Component<{}, State> {
    state: State = {
        maxAttempts: 4, // 5 attempts counting from 0
        currentAttemptNo: 0,
        currentAttemptValue: '',
        secretWord: getRandomWord().toUpperCase(),
        gameState: 'playing',
        previousAttempts: [],
    };

    private resetButtonRef = createRef<HTMLButtonElement>();
    private keyDownListener: any; // todo typing

    componentDidMount() {
        this.keyDownListener = document.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDownListener);
    }

    onKeyDown = (e: KeyboardEvent) => {
        const { currentAttemptValue, gameState } = this.state;
        if (gameState !== 'playing') return;

        if (e.key === 'Enter' && currentAttemptValue.length === VALID_STR_LENGTH) {
            this.onAttempt(currentAttemptValue);
        } else if (e.key === 'Backspace' && currentAttemptValue.length > 0) {
            this.setState({
                currentAttemptValue: currentAttemptValue.slice(0, -1),
            });
        } else if (e.key.match(/^([a-zA-Z]){1,1}$/) && currentAttemptValue.length < VALID_STR_LENGTH) {
            this.setState({
                currentAttemptValue: currentAttemptValue + e.key.toUpperCase(),
            });
        } 
    }

    reset = () => {
        this.setState({
            currentAttemptNo: 0,
            secretWord: getRandomWord().toUpperCase(),
            gameState: 'playing',
            previousAttempts: [],
        });
    };

    onAttempt = (attemptValue: string) => {
        const { secretWord, currentAttemptNo, maxAttempts, previousAttempts, gameState } =
            this.state;
        const attemptResult = guessWord(secretWord, attemptValue);
        let newGameState = gameState;
        let newCurrentAttemptNo = currentAttemptNo;

        if (attemptResult === 'XXXXX') {
            newGameState = 'won';
        } else if (currentAttemptNo === maxAttempts) {
            newGameState = 'lost';
        } else {
            newCurrentAttemptNo = newCurrentAttemptNo + 1;
        }

        this.setState({
            previousAttempts: [
                ...previousAttempts,
                {
                    input: attemptValue,
                    result: attemptResult,
                },
            ],
            currentAttemptValue: '',
            gameState: newGameState,
            currentAttemptNo: newCurrentAttemptNo,
        });
    };

    renderAttempts = (): JSX.Element[] => {
        const {
            previousAttempts,
            gameState,
            currentAttemptNo,
            maxAttempts,
            currentAttemptValue,
        } = this.state;
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
    };

    render() {
        console.log('secretWord', this.state.secretWord);
        const {
            gameState,
            currentAttemptNo,
            maxAttempts,
            secretWord,
            currentAttemptValue,
            previousAttempts,
        } = this.state;
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
                        {this.renderAttempts()}
                    </div>
                    <button
                        className={styles.reset_button}
                        onClick={this.reset}
                        ref={this.resetButtonRef}
                        disabled={
                            currentAttemptNo === 0 && gameState === 'playing'
                        }
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
}

export default Shmurgle;

/* 
    TODOS'
    - heading/sub title font thingy
    - use github action to publish to gh-pages
*/
