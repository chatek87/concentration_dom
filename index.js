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
        // this.emojiList = []; // for debugging
        this.emojiList = generateEmojiListByDifficulty(this.difficulty);
    }
}
// let game;    // not sure whether we'll need to store 'game' in a global variable yet 

function getDifficulty() {
// get difficulty based on user selection, use this as arg to generateEmojiList()
    const difficultySelector = document.getElementById("difficulty-selector");
    const selection = difficultySelector.querySelector('input[name="difficulty"]:checked');

    if (selection) {
        console.log(selection.value);
        return selection.value;        
    } else {
        console.error("no difficulty selected");
        return null;
    }

}

function getEmoji() {
    // get emoji for specific card, remove it from the emoji list
}

function generateEmojiListByDifficulty(difficulty) {
    if (difficulty) {
        switch (difficulty) {
            case 'easy':
                generateEmojiList(6);
                break;
            case 'med':
                generateEmojiList(12);
                break;
            case 'hard':
                generateEmojiList(20);
                break;
            default:
                return console.error(`unhandled value for difficulty: '${difficulty}'`);
            }
        } else {
        return console.error("no difficulty provided");
    }
}
                
function generateEmojiList(numberOfPairs) {
    // U+1F600 - U+1FAAA
    // implement this based on a number supplied by user that specifies number of matched pairs in game
    // dynamically generate an array of emojis based on game params (difficulty)
}

document.addEventListener('DOMContentLoaded', function() {
    const shuffleDeal = document.getElementById('shuffle-deal');
    shuffleDeal.addEventListener('click', function() {
        const game = new Game();
        console.log(`game.difficulty after game instantiation: ${game.difficulty}`);

        let testEmoji = '🍉';
        game.emojiList.push(testEmoji);
        // Append the new div to the flex container
        // const flexContainer = document.querySelector(".flex-container");
        // flexContainer.appendChild(seedling.div);

        // attach click event listener to the new div
        // seedling.div.addEventListener('click', () => seedling.handleClick());
    });
});
