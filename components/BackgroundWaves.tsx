import { mix } from '@theme-ui/color';
import styles from '../styles/BackgroundWaves.module.css';
import { gameStateType } from './types';
import { MAX_ATTEMPTS } from './constants';
import { useEffect, useState } from 'react';

const { LOST, WON } = gameStateType;

const baseColor = 'rgb(21,177,239)';
const loseColor = 'rgb(211, 47, 47)';
const winColor = 'rgb(0,192,118)';

function getBackgroundColor(
    gameState: gameStateType,
    currentAttemptIdx: number
) {
    let color = mix(
        baseColor,
        loseColor,
        1 - currentAttemptIdx / (MAX_ATTEMPTS + 1)
    )({});

    if (gameState === WON) {
        color = winColor;
    } else if (gameState === LOST) {
        color = loseColor;
    }

    return color;
}

function BackgroundWaves({
    gameState,
    currentAttemptIdx
}: {
    gameState: gameStateType;
    currentAttemptIdx: number;
}) {
    const [offsetY, setOffsetY] = useState('30vh');
    const [color, setColor] = useState(baseColor);

    useEffect(() => {
        const newOffsetY = gameState === LOST || gameState === WON
            ? `100vh`
            : `${currentAttemptIdx * 12 + 30}vh`;

        setOffsetY(newOffsetY);
        setColor(getBackgroundColor(gameState, currentAttemptIdx));
    }, [gameState, currentAttemptIdx]);

    return (
        <div className={styles['background-waves-container']}>
            <svg
                className={styles.waves}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shapeRendering="auto"
            >
                <defs>
                    <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </defs>
                <g className={styles.parallax}>
                    <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="0"
                        fill={color}
                        style={{ opacity: 0.6 }}
                    />
                    <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="3"
                        fill={color}
                        style={{ opacity: 0.4 }}
                    />
                    <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="5"
                        fill={color}
                        style={{ opacity: 0.2 }}
                    />
                    <use
                        xlinkHref="#gentle-wave"
                        x="48"
                        y="8"
                        fill={color}
                        style={{ opacity: 1 }}
                    />
                </g>
            </svg>
            <div
                className={styles.grower}
                style={{ height: offsetY, backgroundColor: color }}
            />
        </div>
    );
}

export default BackgroundWaves;
