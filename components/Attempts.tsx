import Characters from './Characters';
import StaticAttempt from './StaticAttempt';
import styles from '../styles/Attempts.module.css';
import { previousAttempt, gameStateType } from './types';

function Attempts({
    previousAttempts,
    maxAttempts,
    currentAttemptIdx,
    currentAttemptValue,
    gameState,
}: {
    previousAttempts: previousAttempt[];
    maxAttempts: number;
    currentAttemptIdx: number;
    gameState: gameStateType;
    currentAttemptValue: string;
}) {
    const toRender: JSX.Element[] = [];

    previousAttempts.forEach((attempt, index) => {
        toRender.push(
            <StaticAttempt
                key={`prev_${index}`}
                attemptInput={attempt.input}
                attemptResult={attempt.result}
            />
        );
    });
    if (gameState === gameStateType.PLAYING) {
        toRender.push(
            <div className={styles.attempt} key="currentAttempt">
                <Characters input={currentAttemptValue} current />
            </div>
        );
    }
    for (let i = currentAttemptIdx; i < maxAttempts; i++) {
        toRender.push(<StaticAttempt key={`${currentAttemptIdx}_${i}`} />);
    }

    return (
        <div className={styles.attempts_container}>{toRender}</div>
    );
}

export default Attempts;
