import styles from '../styles/Shmurgle.module.css';
import { WORD_LENGTH } from './Shmurgle';

function Characters({ input }: { input: string }) {
    let chars: string[] = [];
    let count: number = 0;

    if (input.length > 0) {
        chars = input.split('');
    }
    while (chars.length < WORD_LENGTH) {
        chars.push('');
    }

    return (
        <>
            {chars.map((char, i) => (
                <span key={`${i}_${char}`} className={styles.attempt_char}>
                    {char}
                </span>
            ))}
        </>
    );
}

export default Characters;
