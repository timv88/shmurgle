import React, { createRef } from 'react';
import StaticAttempt from './StaticAttempt';
import Characters from './Characters';
import { getRandomWord, guessWord, Word } from './words';
import Heading from './Heading';
import styles from '../styles/Shmurgle.module.css';
import Background from './Background';

export type previousAttempt = {
    input: string;
    result: string;
};

export type gameState = 'playing' | 'won' | 'lost';
export const WORD_LENGTH = 5;

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
    private inputRef = createRef<HTMLInputElement>();

    componentDidMount() {
        // todo cleanup
        document.addEventListener('click', this.documentClick);
        this.inputRef.current?.focus();
    }

    documentClick = (e: MouseEvent) => {
        // enforce focus so user can always type
        // downside: user cannot highlight text
        // alternatively listen for keydown on document and forward relevant keys (what about mobile compatibilty?)
        this.inputRef.current?.focus();
    };

    reset = () => {
        this.setState({
            currentAttemptNo: 0,
            secretWord: getRandomWord().toUpperCase(),
            gameState: 'playing',
            previousAttempts: [],
        });
    };

    onAttempt = (guess: Word) => {
        const { secretWord, currentAttemptNo, maxAttempts, previousAttempts } =
            this.state;
        const guessResult = guessWord(secretWord, guess);
        if (guessResult === 'XXXXX') {
            this.setState({ gameState: 'won' }, () => {
                this.resetButtonRef.current?.focus();
            });
        } else if (currentAttemptNo === maxAttempts) {
            this.setState({ gameState: 'lost' }, () => {
                this.resetButtonRef.current?.focus();
            });
        } else {
            this.setState({ currentAttemptNo: currentAttemptNo + 1 });
        }

        this.setState({
            previousAttempts: [
                ...previousAttempts,
                {
                    input: guess,
                    result: guessResult,
                },
            ],
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
                    <Characters input={currentAttemptValue} />
                </div>
            );
        }
        for (let i = currentAttemptNo; i < maxAttempts; i++) {
            toRender.push(<StaticAttempt key={`${currentAttemptNo}_${i}`} />);
        }

        return toRender;
    };

    onInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (/^[a-zA-Z]+$/.test(e.target.value) || e.target.value === '') {
            // only allow letters
            this.setState({
                currentAttemptValue: e.target.value.toUpperCase(),
            });
        }
    };

    onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const { currentAttemptValue } = this.state;
        if (e.key === 'Enter') {
            if (currentAttemptValue.length === WORD_LENGTH) {
                this.onAttempt(currentAttemptValue);
                this.setState({ currentAttemptValue: '' });
                e.preventDefault(); // prevent reset button from firing when focus switches
            }
        }
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
                <div className={styles.shmurgle}>
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
                        tabIndex={1}
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
                {gameState === 'playing' && (
                    <input
                        tabIndex={0}
                        ref={this.inputRef}
                        type="text"
                        autoFocus={true}
                        className={styles.attempt_input}
                        onInput={this.onInput}
                        onKeyDown={this.onKeyDown}
                        value={currentAttemptValue}
                        maxLength={WORD_LENGTH}
                    />
                )}
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
    
    - use document listeners for key input instead (kb/m Accessibility)
      - alphabet, backspace, enter
      - cleanup input and focus shits.
    - highlight current char box
    - terminology (guess vs attempt, character vs letter, word vs string)
    - fix layout bottom margin
    - heading/sub title font thingy
    - use github action to publish to gh-pages
*/
