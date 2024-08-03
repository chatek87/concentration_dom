class Card {
    constructor() {
        this.emoji = getEmoji();
        this.hidden = true;
        this.matched = false;
        this.div = document.createElement("div");
        this.div.innerHTML = this.emoji;
    }
}

class Game {
    constructor() {
        this.difficulty = getDifficulty();
        this.emojiList = generateEmojiList();
    }
}

function getEmoji() {
// get emoji for specific card, remove it from the emoji list
}

function generateEmojiList() {
// dynamically generate an array of emojis based on game params (difficulty)
}

function getDifficulty() {
// get difficulty based on user selection, use this as arg to generateEmojiList()
}