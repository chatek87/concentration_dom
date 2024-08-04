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
        this.emojiList = generateEmojiList(this.difficulty);
    }
}

function getEmoji() {
// get emoji for specific card, remove it from the emoji list
}

function generateEmojiList(difficulty) {
    if (difficulty) {
        // dynamically generate an array of emojis based on game params (difficulty)

    } else {
        console.error("no difficulty provided");
        return null;
    }
}

function getDifficulty() {
// get difficulty based on user selection, use this as arg to generateEmojiList()
    const difficultySelector = document.getElementById("difficulty-selector");
    const selection = difficultySelector.querySelector('input[name="difficulty"]:checked');

    if (selection) {
        return selection.value;
    } else {
        console.error("no difficulty selected");
        return null;
    }

}

// U+1F600 - U+1FAAA

// make event handler for 'shuffle-deal' button
// it starts a new game based on difficulty level