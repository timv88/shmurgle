import { render, screen } from '@testing-library/react';
import Heading from './Heading';

import { gameStateType } from './types';
const { PLAYING } = gameStateType;

describe('Heading', () => {
    it('renders', () => {
        const gameState = PLAYING;
        const currentAttemptIdx = 0;
        const secretWord = 'secrt';

        render(
            <Heading
                gameState={gameState}
                currentAttemptIdx={currentAttemptIdx}
                secretWord={secretWord}
            />
        );

        const heading = screen.getByRole('heading', {
            name: /S h m u r g l e/i,
        });

        expect(heading).toBeInTheDocument();
    });
});
