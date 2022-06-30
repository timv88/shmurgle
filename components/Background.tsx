import { mix } from '@theme-ui/color';
import BackgroundWaves from './BackgroundWaves';
import BackgroundChars from './BackgroundChars';
import { gameStateType, previousAttempt } from './types';
import styles from '../styles/Shmurgle.module.css';
import { MAX_ATTEMPTS } from './constants';

const { LOST, WON } = gameStateType;

function getBackgroundColor(gameState: gameStateType, currentAttemptIdx: number) {
    const baseColor = 'rgb(21,177,239)';
    const loseColor = 'rgb(211, 47, 47)';
    const winColor = 'rgb(0,192,118)';

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

function Background({
    gameState,
    currentAttemptIdx,
    currentAttemptValue,
    previousAttempts,
    backgroundChars,
    emojiBackgroundChars,
}: {
    gameState: gameStateType;
    currentAttemptIdx: number;
    currentAttemptValue: string;
    previousAttempts: previousAttempt[];
    backgroundChars: string[];
    emojiBackgroundChars: string[];
}) {
    const offsetY =
        gameState === LOST || gameState === WON
            ? `100vh`
            : `${currentAttemptIdx * 12 + 30}vh`;

    const color = getBackgroundColor(gameState, currentAttemptIdx);

    return (
        <div className={styles['background-container']}>
            <BackgroundWaves color={color} offsetY={offsetY} />
            <BackgroundChars
                backgroundChars={backgroundChars}
                emojiBackgroundChars={emojiBackgroundChars}
                gameState={gameState}
                currentAttemptIdx={currentAttemptIdx}
                currentAttemptValue={currentAttemptValue}
                previousAttempts={previousAttempts}
            />
        </div>
    );
}

export default Background;
