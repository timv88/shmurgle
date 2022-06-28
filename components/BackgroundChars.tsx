import React, { useContext, useEffect, useState } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import styles from '../styles/BackgroundChars.module.css';
import cx from 'classnames';
import useInterval from './useInterval';
import {
    previousAttempt,
    gameStateType,
    charResultType,
    actionType,
} from './types';
import { winChars, loseChars } from './constants';
import { DispatchContext } from './Shmurgle';

const { WON, LOST } = gameStateType;
const { PRESENT, CORRECT } = charResultType;
const { EMOJIFY_BG, SHUFFLE_BG } = actionType;

type Props = {
    gameState: gameStateType;
    currentAttemptIdx: number;
    currentAttemptValue: string;
    previousAttempts: previousAttempt[];
    backgroundChars: string[];
    emojiBackgroundChars: string[];
};

function getEndscreenEmoji(gameState: gameStateType, index: number): string {
    if (gameState === WON) {
        return winChars[index % winChars.length];
    } else {
        return loseChars[index % loseChars.length];
    }
}

function BackgroundChars({
    backgroundChars,
    emojiBackgroundChars,
    gameState,
    currentAttemptValue,
    previousAttempts,
}: Props) {
    const dispatch = useContext(DispatchContext);
    const [presentChars, setPresentChars] = useState<string[]>([]);
    const [absentChars, setAbsentChars] = useState<string[]>([]);

    const wonOrLost = gameState === WON || gameState === LOST;

    useEffect(() => {
        const newPresentChars: string[] = [];
        const absentChars: string[] = [];

        previousAttempts.forEach((previousAttempt: previousAttempt) => {
            const { input, result } = previousAttempt;
            input.split('').forEach((char, i) => {
                const firstLetter = char[0];
                if (result[i] === CORRECT || result[i] === PRESENT) {
                    newPresentChars.push(firstLetter);
                } else {
                    absentChars.push(firstLetter);
                }
            });
        });

        setPresentChars(newPresentChars);
        setAbsentChars(absentChars);
    }, [previousAttempts]);

    useEffect(() => {
        dispatch({
            type: SHUFFLE_BG,
            payload: 5,
        });
    }, [previousAttempts, dispatch]);

    useEffect(() => {
        dispatch({
            type: SHUFFLE_BG,
            payload: 1,
        });
    }, [currentAttemptValue, dispatch]);

    useInterval(
        () => {
            dispatch({
                type: SHUFFLE_BG,
                payload: Math.round(Math.random() * 1) + 1,
            });
        },
        wonOrLost ? 500 : Math.floor(Math.random() * 5000) + 3000
    );

    useInterval(
        () => {
            dispatch({ type: EMOJIFY_BG });
        },
        wonOrLost ? 100 : null
    );

    return (
        <Flipper
            // perf optimization by mapping unique values to key
            flipKey={backgroundChars.join('')}
            spring={{ stiffness: 60, damping: 10 }}
        >
            <div className={styles.background_chars}>
                {backgroundChars.map((char, i) => {
                    // for rendering we're only interested in first character
                    const firstLetter = char[0];
                    const trueIndex = Number(char.slice(1));
             
                    const emoji = emojiBackgroundChars.includes(char)
                        ? getEndscreenEmoji(gameState, trueIndex)
                        : null;

                    const classNames = cx(styles.background_char, {
                        [styles.dim]: absentChars.includes(firstLetter),
                        [styles.highlight]: presentChars.includes(firstLetter) || currentAttemptValue.includes(firstLetter),
                    });

                    return (
                        <Flipped key={char} flipId={char}>
                            <span
                                key={`inner_${char}`}
                                className={classNames}
                                // when present, CSS rules apply
                                data-emoji={emoji}
                            >
                                {firstLetter}
                            </span>
                        </Flipped>
                    );
                })}
            </div>
        </Flipper>
    );
}

export default BackgroundChars;
