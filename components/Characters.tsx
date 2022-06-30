import styles from '../styles/Characters.module.css';
import cx from 'classnames';
import { VALID_STR_LENGTH } from './constants';
import { charResultType } from './types';

const { CORRECT, PRESENT, ABSENT } = charResultType;

function Characters({
    attemptInput,
    attemptResult,
    current,
}: {
    attemptInput: string;
    attemptResult?: string;
    current?: boolean;
}) {
    let chars: string[] = [];

    if (attemptInput.length > 0) {
        chars = attemptInput.split('');
    }
    while (chars.length < VALID_STR_LENGTH) {
        chars.push('');
    }

    return (
        <>
            {chars.map((char, i) => {
                const resultChar = attemptResult?.charAt(i);
                const classNames = cx(styles.char, {
                    [styles['is-correct']]: resultChar === CORRECT,
                    [styles['is-present']]: resultChar === PRESENT,
                    [styles['is-absent']]: resultChar === ABSENT,
                    [styles['is-current-turn']]: current,
                });

                return (
                    <span key={`${i}_${char}`} className={classNames}>
                        {char}
                    </span>
                );
            })}
        </>
    );
}

export default Characters;
