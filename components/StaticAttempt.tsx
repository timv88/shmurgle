import { Word } from './words';
import cx from 'classnames';
import styles from '../styles/Shmurgle.module.css';
import Characters from './Characters';

function StaticAttempt({
    attemptInput = '',
    attemptResult = '',
}: {
    attemptInput?: Word;
    attemptResult?: Word;
}) {
    const render = [];
    if (attemptInput.length === 0 && attemptResult.length === 0) {
        render.push(<Characters key="smth" input={attemptInput} />);
    } else {
        for (let i = 0; i < 5; i++) {
            const inputChar = attemptInput.charAt(i);
            const resultChar = attemptResult.charAt(i);

            const classNames = cx(styles.attempt_char, {
                [styles.attempt_char__correct]: resultChar === 'X',
                [styles.attempt_char__present]: resultChar === 'O',
                [styles.attempt_char__absent]: resultChar === '_',
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
