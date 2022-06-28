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

type Props = {
    gameState: gameStateType;
    currentAttemptIdx: number;
    currentAttemptValue: string;
    previousAttempts: previousAttempt[];
    backgroundChars: string[];
    backgroundEmojisIdx: number[];
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
    backgroundEmojisIdx,
    gameState,
    currentAttemptValue,
    previousAttempts,
}: Props) {
    const dispatch = useContext(DispatchContext);
    const [presentChars, setPresentChars] = useState<string[]>([]);
    const [absentChars, setAbsentChars] = useState<string[]>([]);

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

    useInterval(
        () => {
            dispatch({ type: actionType.RANDOMNIZE_BG_EMOJI_IDX });
        },
        (gameState === WON || gameState === LOST) ? 90 : null
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
                    const emoji = backgroundEmojisIdx.includes(i)
                        ? getEndscreenEmoji(gameState, i)
                        : null;

                    const classNames = cx(styles.background_char, {
                        [styles.present]: presentChars.includes(firstLetter),
                        [styles.absent]: absentChars.includes(firstLetter),
                        [styles.pulsate]:
                            winChars.includes(firstLetter) ||
                            loseChars.includes(firstLetter),
                        [styles.highlight]:
                            currentAttemptValue.includes(firstLetter) &&
                            Math.random() > 0.25,
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
