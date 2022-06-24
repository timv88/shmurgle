import styles from '../styles/BackgroundLetters.module.css';
import React from 'react';
import { previousAttempt } from './Shmurgle';
import cx from 'classnames';

type Props = {
    color: string;
    gameState: string;
    currentAttemptNo: number;
    maxAttempts: number;
    currentAttemptValue: string;
    previousAttempts: previousAttempt[];
};

type State = {
    randomizedLetters: string[];
    presentLetters: string[];
    absentLetters: string[];
};

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const winChars = ['🎉', '🏆', '😊', '🙌', '♥'];
const loseChars = ['💀', '💩', '😔', '😠', '🤬'];

class BackgroundLetters extends React.Component<Props, State> {
    state: State = {
        randomizedLetters: [],
        presentLetters: [],
        absentLetters: [],
    };

    private interval?: number;

    constructor(props: Props) {
        super(props);
        this.interval;
    }

    componentDidMount() {
        this.setState({
            randomizedLetters: this.getRandomLetters(),
        });
    }

    reset = () => {
        window.clearInterval(this.interval);
        this.interval = undefined;
        this.setState({
            randomizedLetters: this.getRandomLetters(),
            presentLetters: [],
            absentLetters: [],
        });
    };

    getEndscreenEmoji = () => {
        if (this.props.gameState === 'won') {
            return winChars[Math.floor(Math.random() * winChars.length)];
        }

        return loseChars[Math.floor(Math.random() * loseChars.length)];
    };

    endState = () => {
        if (!this.interval) {
            let count = 0;
            this.interval = window.setInterval(() => {
                if (count > 666) {
                    window.clearInterval(this.interval);
                }

                count++;
                const newRandomizedLetters = [...this.state.randomizedLetters];
                const randIndex = Math.floor(
                    Math.random() * newRandomizedLetters.length
                );

                newRandomizedLetters[randIndex] = this.getEndscreenEmoji();
                this.setState({
                    randomizedLetters: newRandomizedLetters,
                });
            }, Math.floor(Math.random() * 100));
        }
    };

    componentWillUnmount() {
        window.clearInterval(this.interval);
        this.interval = undefined;
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.gameState === 'won' || this.props.gameState === 'lost') {
            // victory or loss
            this.endState();
        } else if (
            this.props.currentAttemptNo === 0 &&
            prevProps.gameState !== 'playing'
        ) {
            // new game
            this.reset();
        } else if (this.props.currentAttemptNo > prevProps.currentAttemptNo) {
            // same game, new turn
            const { input, result } =
                this.props.previousAttempts[
                    this.props.previousAttempts.length - 1
                ];

            const newPresentLetters = [...this.state.presentLetters];
            const newAbsentLetters = [...this.state.absentLetters];

            input.split('').forEach((letter, i) => {
                if (result[i] === 'X' || result[i] === 'O') {
                    newPresentLetters.push(letter);
                } else {
                    newAbsentLetters.push(letter);
                }
            });

            this.setState({
                presentLetters: newPresentLetters,
                absentLetters: newAbsentLetters,
            });
        }
    }

    getRandomLetters = () => {
        // TODO don't render outside viewport
        const multiplier = 25;
        const randomizedLetters: string[] = [];

        for (let i = 0; i < ALPHABET.length * multiplier; i++) {
            const letter =
                ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
            randomizedLetters.push(letter);
        }

        return randomizedLetters;
    };

    render() {
        const { randomizedLetters, presentLetters, absentLetters } = this.state;
        const { currentAttemptValue } = this.props;

        return (
            <div className={styles.background_letters}>
                {randomizedLetters.map((letter, i) => {
                    const classNames = cx(styles.background_letter, {
                        [styles.present]: presentLetters.includes(letter),
                        [styles.absent]: absentLetters.includes(letter),
                        [styles.pulsate]:
                            winChars.includes(letter) ||
                            loseChars.includes(letter),
                        [styles.highlight]:
                            currentAttemptValue.includes(letter) && Math.random() > 0.25,
                    });

                    return (
                        <span key={i} className={classNames}>
                            {letter}
                        </span>
                    );
                })}
            </div>
        );
    }
}

export default BackgroundLetters;
