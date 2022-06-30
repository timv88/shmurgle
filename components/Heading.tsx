import { charResultType, gameStateType } from './types';
import { MAX_ATTEMPTS } from './constants';
import Characters from './Characters';
import styles from '../styles/Heading.module.css';
import getEmoji from './getEmoji';
import { useEffect, useState } from 'react';

const { CORRECT, PRESENT, ABSENT } = charResultType;
const { WON, LOST } = gameStateType;

function getRandomCharacterContext(length: number = 0): string {
    const options = [ CORRECT, PRESENT, ABSENT ];
    let result = '';
    for (let i = 0; i < length; i++) {
        result += options[Math.floor(Math.random() * options.length)];
    }
    return result;
}
function Heading({
    gameState,
    currentAttemptIdx,
    secretWord,
}: {
    gameState: gameStateType;
    currentAttemptIdx: number;
    secretWord: string;
}) {
    const [subHeading, setSubHeading] = useState('');
    const [headerContext, setHeaderContext] = useState('');

    useEffect(() => {
        let newSubHeading = `Turn ${currentAttemptIdx + 1}/${MAX_ATTEMPTS + 1}`;
        if (gameState === WON) {
            newSubHeading = `You won!! ${getEmoji(gameState)}`;
        } else if (gameState === LOST) {
            newSubHeading = `You lost ${getEmoji(
                gameState
            )} The correct answer was ${secretWord}`;
        } else if (currentAttemptIdx === MAX_ATTEMPTS) {
            newSubHeading = `Last attempt`;
        }

        setSubHeading(newSubHeading);
        
    }, [gameState, currentAttemptIdx, secretWord]);

    useEffect(() => {
        const newHeaderContext = getRandomCharacterContext('Shmurgle'.length)
        setHeaderContext(newHeaderContext);
    }, []);

    return (
        <>
            <h1 className={styles.heading}>
                <Characters
                    value={'Shmurgle'}
                    valueContext={headerContext}
                    className={styles['heading-char']}
                />
            </h1>
            <p className={styles.subheading}>
                {subHeading}
            </p>
        </>
    );
}

export default Heading;
