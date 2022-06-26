import { gameStateType } from './types';

function Heading({
    gameState,
    currentAttemptIdx,
    maxAttempts,
    secretWord,
}: {
    gameState: gameStateType;
    currentAttemptIdx: number;
    maxAttempts: number;
    secretWord: string;
}) {
    let statusString = `turn ${currentAttemptIdx + 1}/${maxAttempts + 1}`;
    if (gameState === gameStateType.WON) {
        statusString = `You won!!`;
    } else if (gameState === gameStateType.LOST) {
        statusString = `You lost. The correct answer is ${secretWord}`;
    } else if (currentAttemptIdx === maxAttempts) {
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
