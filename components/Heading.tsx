import { gameState } from './Shmurgle';

function Heading({
    gameState,
    currentAttemptNo,
    maxAttempts,
    secretWord,
}: {
    gameState: gameState;
    currentAttemptNo: number;
    maxAttempts: number;
    secretWord: string;
}) {
    let statusString = `turn ${currentAttemptNo + 1}/${maxAttempts + 1}`;
    if (gameState === 'won') {
        statusString = `You won!!`;
    } else if (gameState === 'lost') {
        statusString = `You lost. The correct answer is ${secretWord}`;
    } else if (currentAttemptNo === maxAttempts) {
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
