import styles from '../styles/BackgroundChars.module.css';
import React, { useContext, useEffect, useState } from 'react';
import { DispatchContext } from './Shmurgle';
import cx from 'classnames';
import useInterval from './useInterval';
import {
    previousAttempt,
    gameStateType,
    actionType,
    charResultType,
} from './types';
import { winChars, loseChars } from './constants';

const { LOST, WON } = gameStateType;
const { PRESENT, CORRECT } = charResultType;


type Props = {
    gameState: gameStateType;
    currentAttemptIdx: number;
    currentAttemptValue: string;
    previousAttempts: previousAttempt[];
    characters: string[];
};


function getEndscreenEmoji(gameState: gameStateType): string {
    if (gameState === WON) {
        return winChars[Math.floor(Math.random() * winChars.length)];
    } else {
        return loseChars[Math.floor(Math.random() * loseChars.length)];
    }
};

function BackgroundChars({ characters, gameState, currentAttemptValue, previousAttempts }: Props) {
    const dispatch = useContext(DispatchContext);
    const [ previousPresentChars, setPreviousPresentChars ] = useState<string[]>([]);
    const [ previousAbsentChars, setPreviousAbsentChars ] = useState<string[]>([]);
    const wonOrLost = (gameState === WON || gameState === LOST);

    useEffect(() => {
        const newPreviousPresentChars: string[] = [];
        const previousAbsentChars: string[] = [];

        previousAttempts.forEach((previousAttempt: previousAttempt) => {
            const { input, result } = previousAttempt;
            input.split('').forEach((char, i) => {
                if (result[i] === CORRECT || result[i] === PRESENT) {
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
        dispatch({
            type: actionType.SET_RANDOM_BACKGROUND_CHAR,
            payload: getEndscreenEmoji(gameState),
        });
    }, wonOrLost ? 30 : null);

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
