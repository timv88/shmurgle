import styles from '../styles/Attempts.module.css';
import { VALID_STR_LENGTH } from './Shmurgle';
import cx from 'classnames';

function Characters({ input, current }: { input: string; current?: boolean }) {
    let chars: string[] = [];

    if (input.length > 0) {
        chars = input.split('');
    }
    while (chars.length < VALID_STR_LENGTH) {
        chars.push('');
    }

    const classNames = cx(styles.attempt_char, {
        [styles.current]: current,
    });

    return (
        <>
            {chars.map((char, i) => (
                <span key={`${i}_${char}`} className={classNames}>
                    {char}
                </span>
            ))}
        </>
    );
}

export default Characters;
