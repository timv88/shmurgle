import styles from '../styles/BackgroundChars.module.css';
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
    randomizedChars: string[];
    presentChars: string[];
    absentChars: string[];
};

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const winChars = ['🎉', '🏆', '😊', '🙌', '♥'];
const loseChars = ['💀', '💩', '😔', '😠', '🤬'];

class BackgroundChars extends React.Component<Props, State> {
    state: State = {
        randomizedChars: [],
        presentChars: [],
        absentChars: [],
    };

    private interval?: number;

    constructor(props: Props) {
        super(props);
        this.interval;
    }

    componentDidMount() {
        this.setState({
            randomizedChars: this.getRandomChars(),
        });
    }

    reset = () => {
        window.clearInterval(this.interval);
        this.interval = undefined;
        this.setState({
            randomizedChars: this.getRandomChars(),
            presentChars: [],
            absentChars: [],
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
                const newRandomizedChars = [...this.state.randomizedChars];
                const randIndex = Math.floor(
                    Math.random() * newRandomizedChars.length
                );

                newRandomizedChars[randIndex] = this.getEndscreenEmoji();
                this.setState({
                    randomizedChars: newRandomizedChars,
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

            const newPresentChars = [...this.state.presentChars];
            const newAbsentChars = [...this.state.absentChars];

            input.split('').forEach((char, i) => {
                if (result[i] === 'X' || result[i] === 'O') {
                    newPresentChars.push(char);
                } else {
                    newAbsentChars.push(char);
                }
            });

            this.setState({
                presentChars: newPresentChars,
                absentChars: newAbsentChars,
            });
        }
    }

    getRandomChars = () => {
        // TODO don't render outside viewport
        const multiplier = 25;
        const randomizedChars: string[] = [];

        for (let i = 0; i < ALPHABET.length * multiplier; i++) {
            const char =
                ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
            randomizedChars.push(char);
        }

        return randomizedChars;
    };

    render() {
        const { randomizedChars, presentChars, absentChars } = this.state;
        const { currentAttemptValue } = this.props;

        return (
            <div className={styles.background_chars}>
                {randomizedChars.map((char, i) => {
                    const classNames = cx(styles.background_char, {
                        [styles.present]: presentChars.includes(char),
                        [styles.absent]: absentChars.includes(char),
                        [styles.pulsate]:
                            winChars.includes(char) ||
                            loseChars.includes(char),
                        [styles.highlight]:
                            currentAttemptValue.includes(char) && Math.random() > 0.25,
                    });

                    return (
                        <span key={i} className={classNames}>
                            {char}
                        </span>
                    );
                })}
            </div>
        );
    }
}

export default BackgroundChars;
