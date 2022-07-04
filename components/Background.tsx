import clx from 'classnames';
import BackgroundWaves from './BackgroundWaves';
import BackgroundChars from './BackgroundChars';
import { gameStateType, previousAttempt } from './types';
import styles from '../styles/Shmurgle.module.css';

function Background({
    gameState,
    currentAttemptIdx,
    currentAttemptValue,
    previousAttempts,
    backgroundChars,
    emojiBackgroundChars,
    className = null,
}: {
    gameState: gameStateType;
    currentAttemptIdx: number;
    currentAttemptValue: string;
    previousAttempts: previousAttempt[];
    backgroundChars: string[];
    emojiBackgroundChars: string[];
    className: string | null;
}) {
    return (
        <div className={clx(className, styles['background-container'])}>
            <BackgroundWaves 
                gameState={gameState}
                currentAttemptIdx={currentAttemptIdx}
            />
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
