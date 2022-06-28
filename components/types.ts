export enum actionType {
    INPUT_CHAR = 'INPUT_CHAR',
    REMOVE_CHAR = 'REMOVE_CHAR',
    GUESS_SECRET = 'GUESS_SECRET',
    NEW_GAME = 'NEW_GAME',
    EMOJIFY_BG = 'EMOJIFY_BG',
    SHUFFLE_BG = 'SHUFFLE_BG',
}

export interface Action {
    type: actionType;
    payload?: string | number;
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
    emojiBackgroundChars: string[];
};

export enum gameStateType {
    PLAYING = 'PLAYING',
    WON = 'WON',
    LOST = 'LOST',
}

export enum charResultType {
    PRESENT = '-',
    ABSENT = '_',
    CORRECT = '*',
}
