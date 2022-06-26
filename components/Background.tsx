import { mix } from '@theme-ui/color';
import BackgroundWaves from './BackgroundWaves';
import BackgroundChars from './BackgroundChars';
import { gameStateType, previousAttempt } from './Shmurgle';
import styles from '../styles/Shmurgle.module.css';

function Background({
    gameState,
    currentAttemptIdx,
    maxAttempts,
    currentAttemptValue,
    previousAttempts,
    backgroundChars,
}: {
    gameState: gameStateType;
    currentAttemptIdx: number;
    maxAttempts: number;
    currentAttemptValue: string;
    previousAttempts: previousAttempt[];
    backgroundChars: string[];
}) {
    const { LOST, WON } = gameStateType;
    const offsetY =
        gameState === LOST || gameState === WON
            ? `100vh`
            : `${currentAttemptIdx * 12 + 30}vh`;

    const primary = 'rgb(21,177,239)';
    const lose = 'rgb(211, 47, 47)';
    const win = 'rgb(0,192,118)';

    let color = mix(primary, lose, 1 - currentAttemptIdx / maxAttempts)({});
    if (gameState === WON) {
        color = win;
    }
    return (
        <div className={styles.background_container}>
            <BackgroundWaves color={color} offsetY={offsetY} />
            <BackgroundChars
                characters={backgroundChars}
                gameState={gameState}
                currentAttemptIdx={currentAttemptIdx}
                currentAttemptValue={currentAttemptValue}
                previousAttempts={previousAttempts}
            />
        </div>
    );
}

export default Background;
