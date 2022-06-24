import { mix } from '@theme-ui/color';
import BackgroundWaves from './BackgroundWaves';
import BackgroundChars from './BackgroundChars';
import { previousAttempt } from './Shmurgle';

function Background({
    gameState,
    currentAttemptNo,
    maxAttempts,
    currentAttemptValue,
    previousAttempts,
}: {
    gameState: string;
    currentAttemptNo: number;
    maxAttempts: number;
    currentAttemptValue: string;
    previousAttempts: previousAttempt[];
}) {
    const offsetY =
        gameState === 'lost' || gameState === 'won'
            ? `100vh`
            : `${currentAttemptNo * 12 + 30}vh`;

    const primary = 'rgb(21,177,239)';
    const lose = 'rgb(239,83,21)';
    const win = 'rgb(0,192,118)';

    let color = mix(primary, lose, 1 - currentAttemptNo / maxAttempts)({});
    if (gameState === 'won') {
        color = win;
    }
    return (
        <>
            <BackgroundWaves color={color} offsetY={offsetY} />
            <BackgroundChars
                color={color}
                gameState={gameState}
                currentAttemptNo={currentAttemptNo}
                maxAttempts={maxAttempts}
                currentAttemptValue={currentAttemptValue}
                previousAttempts={previousAttempts}
            />
        </>
    );
}

export default Background;
