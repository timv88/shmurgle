import styles from '../styles/Characters.module.css';
import cx from 'classnames';
import { VALID_STR_LENGTH } from './constants';
import { charResultType } from './types';

const { CORRECT, PRESENT, ABSENT } = charResultType;

function Characters({
    value,
    valueContext, // not to be confused with react "context"
    isCurrentTurn,
    className = '',
}: {
    value: string;
    valueContext?: string;
    isCurrentTurn?: boolean;
    className?: string;
}) {
    let chars: string[] = [];

    if (value.length > 0) {
        chars = value.split('');
    }
    while (chars.length < VALID_STR_LENGTH) {
        chars.push('');
    }

    return (
        <>
            {chars.map((char, i) => {
                const resultChar = valueContext?.charAt(i);
                const classNames = cx(styles.char, className, {
                    [styles['is-correct']]: resultChar === CORRECT,
                    [styles['is-present']]: resultChar === PRESENT,
                    [styles['is-absent']]: resultChar === ABSENT,
                    [styles['is-current-turn']]: isCurrentTurn,
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
