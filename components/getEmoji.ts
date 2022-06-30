import { loseChars, winChars } from "./constants";
import { gameStateType } from "./types";

function getEmoji(gameState: gameStateType, index?: number): string {
    if (typeof index !== "number") {
        index = Math.floor(Math.random() * winChars.length);
    }

    if (gameState === gameStateType.WON) {
        return winChars[index % winChars.length];
    } else {
        return loseChars[index % loseChars.length];
    }
}

export default getEmoji;
