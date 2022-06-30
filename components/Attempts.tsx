import Characters from './Characters';
import styles from '../styles/Attempts.module.css';
import { previousAttempt, gameStateType } from './types';
import { MAX_ATTEMPTS } from './constants';

function Attempts({
    previousAttempts,
    currentAttemptIdx,
    currentAttemptValue,
    gameState,
}: {
    previousAttempts: previousAttempt[];
    currentAttemptIdx: number;
    gameState: gameStateType;
    currentAttemptValue: string;
}) {
    const toRender: JSX.Element[] = [];

    previousAttempts.forEach((attempt, index) => {
        toRender.push(
            <div key={`prev_${index}`} className={styles.attempt}>
                <Characters
                    value={attempt.input}
                    valueContext={attempt.result}
                />
            </div>
        );
    });
    if (gameState === gameStateType.PLAYING) {
        toRender.push(
            <div className={styles.attempt} key="currentAttempt">
                <Characters value={currentAttemptValue} isCurrentTurn />
            </div>
        );
    }
    for (let i = currentAttemptIdx; i < MAX_ATTEMPTS; i++) {
        toRender.push(
            <div className={styles.attempt} key={`next_${i}`}>
                <Characters value="" />
            </div>
        );
    }

    return <div className={styles['attempts-container']}>{toRender}</div>;
}

export default Attempts;
