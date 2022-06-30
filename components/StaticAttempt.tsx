import cx from 'classnames';
import styles from '../styles/Attempts.module.css';
import Characters from './Characters';
import { charResultType } from './types';

const { CORRECT, PRESENT, ABSENT } = charResultType;

function StaticAttempt({
    attemptInput = '',
    attemptResult = '',
}: {
    attemptInput?: string;
    attemptResult?: string;
}) {
    const render = [];
    if (attemptInput.length === 0 && attemptResult.length === 0) {
        render.push(<Characters key="smth" input={attemptInput} />);
    } else {
        for (let i = 0; i < 5; i++) {
            const inputChar = attemptInput.charAt(i);
            const resultChar = attemptResult.charAt(i);

            const classNames = cx(styles.char, {
                [styles['is-correct']]: resultChar === CORRECT,
                [styles['is-present']]: resultChar === PRESENT,
                [styles['is-absent']]: resultChar === ABSENT,
            });

            render.push(
                <span key={i} className={classNames}>
                    {inputChar}
                </span>
            );
        }
    }

    return <div className={styles.attempt}>{render}</div>;
}

export default StaticAttempt;
