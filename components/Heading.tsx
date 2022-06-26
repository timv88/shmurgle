import { gameStateType } from './types';
import { MAX_ATTEMPTS } from './Shmurgle';

function Heading({
    gameState,
    currentAttemptIdx,
    secretWord,
}: {
    gameState: gameStateType;
    currentAttemptIdx: number;
    secretWord: string;
}) {
    let statusString = `turn ${currentAttemptIdx + 1}/${MAX_ATTEMPTS + 1}`;
    if (gameState === gameStateType.WON) {
        statusString = `You won!!`;
    } else if (gameState === gameStateType.LOST) {
        statusString = `You lost. The correct answer is ${secretWord}`;
    } else if (currentAttemptIdx === MAX_ATTEMPTS) {
        statusString = `Last attempt`;
    }

    return (
        <>
            <h1>Shmurgle</h1>
            <p>{statusString}</p>
        </>
    );
}

export default Heading;
