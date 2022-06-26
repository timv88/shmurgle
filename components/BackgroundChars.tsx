import styles from '../styles/BackgroundChars.module.css';
import React, { useContext, useEffect, useState } from 'react';
import { actionType, DispatchContext, previousAttempt } from './Shmurgle';
import cx from 'classnames';
import useInterval from './useInterval';
import { gameState } from './Shmurgle';

type Props = {
    gameState: string;
    currentAttemptIdx: number;
    currentAttemptValue: string;
    previousAttempts: previousAttempt[];
    characters: string[];
};

const winChars = ['🎉', '🏆', '😊', '🙌', '♥'];
const loseChars = ['💀', '💩', '😔', '😠', '🤬'];

function getEndscreenEmoji(gameState: gameState):string {
    if (gameState === 'won') {
        return winChars[Math.floor(Math.random() * winChars.length)];
    } else {
        return loseChars[Math.floor(Math.random() * loseChars.length)];
    }
};

function BackgroundChars({ characters, gameState, currentAttemptValue, previousAttempts }: Props) {
    const dispatch = useContext(DispatchContext);
    const [ previousPresentChars, setPreviousPresentChars ] = useState<string[]>([]);
    const [ previousAbsentChars, setPreviousAbsentChars ] = useState<string[]>([]);

    useEffect(() => {
        const newPreviousPresentChars: string[] = [];
        const previousAbsentChars: string[] = [];

        previousAttempts.forEach((previousAttempt: previousAttempt) => {
            const { input, result } = previousAttempt;
            input.split('').forEach((char, i) => {
                if (result[i] === 'X' || result[i] === 'O') {
                    newPreviousPresentChars.push(char);
                } else {
                    previousAbsentChars.push(char);
                }
            });
        })

        setPreviousPresentChars(newPreviousPresentChars);
        setPreviousAbsentChars(previousAbsentChars);
    }, [previousAttempts]);

    useInterval(() => {
        if (gameState === 'won' || gameState === 'lost') {
            dispatch({ 
                type: actionType.SET_RANDOM_BACKGROUND_CHAR, 
                payload: getEndscreenEmoji(gameState) 
            });
        }
    }, 30);

    return (
        <div className={styles.background_chars}>
            {characters.map((char, i) => {
                const classNames = cx(styles.background_char, {
                    [styles.present]: previousPresentChars.includes(char),
                    [styles.absent]: previousAbsentChars.includes(char),
                    [styles.pulsate]:
                        winChars.includes(char) || loseChars.includes(char),
                    [styles.highlight]:
                        currentAttemptValue.includes(char) &&
                        Math.random() > 0.25,
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

export default BackgroundChars;
