export enum actionType {
    INPUT_CHAR = 'INPUT_CHAR',
    REMOVE_CHAR = 'REMOVE_CHAR',
    GUESS_SECRET = 'GUESS_SECRET',
    NEW_GAME = 'NEW_GAME',
    SET_RANDOM_BACKGROUND_CHAR = 'SET_RANDOM_BACKGROUND_CHAR',
}

export interface Action {
    type: actionType;
    payload?: string;
}

export type previousAttempt = {
    input: string;
    result: string;
};

export type State = {
    gameState: gameStateType;
    currentAttemptIdx: number;
    currentAttemptValue: string;
    previousAttempts: previousAttempt[];
    secretWord: string;
    backgroundChars: string[];
};

export enum gameStateType {
    PLAYING = 'PLAYING',
    WON = 'WON',
    LOST = 'LOST',
}

export enum charResultType {
    PRESENT = 'O',
    ABSENT = '_',
    CORRECT = 'X',
}
