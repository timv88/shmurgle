import { gameStateType } from './types';
import { MAX_ATTEMPTS } from './constants';

const { WON, LOST } = gameStateType;

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
    if (gameState === WON) {
        statusString = `You won!!`;
    } else if (gameState === LOST) {
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
