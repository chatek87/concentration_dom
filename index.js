(function() {
    // let game;    // not sure whether we'll need to store 'game' in a global variable yet 

    class Card {
        constructor(emoji) {
            this.emoji = emoji;
            this.hidden = true;
            this.matched = false;
            this.div = document.createElement("div");
            this.div.innerHTML = this.emoji;
        }
    }

    class Game {
        constructor(difficulty) {
            this.difficulty = difficulty;
            this.initialize();
        }
        
        initialize() {
            this.emojiList = this.getEmojiListByDifficulty(this.difficulty);
            this.cards = this.getCardsFromEmojiList();
        }

        getEmojiListByDifficulty(difficulty) {
            if (difficulty) {
                switch (difficulty) {
                    case 'easy':
                        this.generateEmojiList(6);
                        break;
                    case 'med':
                        this.generateEmojiList(12);
                        break;
                    case 'hard':
                        this.generateEmojiList(20);
                        break;
                    default:
                        return console.error(`unhandled value for difficulty: '${difficulty}'`);
                    }
                } else {
                return console.error("no difficulty provided");
            }
        }

        generateEmojiList(numberOfPairs) {
            const emojiList = [];
            // POPULATE LIST
            for (let i = 0; i < numberOfPairs; i++) {
                let emoji;
                do {
                    emoji = this.randomEmojiFromRange();
                } while (emojiList.includes(emoji));
        
                emojiList.push(emoji);
                emojiList.push(emoji);
            }
            // start LIST
            for (let i = emojiList.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [emojiList[i], emojiList[j]] = [emojiList[j], emojiList[i]];
            }
        
            return emojiList;
        }

        getCardsFromEmojiList() {  
            len = this.emojiList.length;
            let cards = [];

            for (let i = 0; i < len; i++) {
                let card = new Card(this.emojiList[i]);
                cards.push(card);
            }

            return cards;
        }

        randomEmojiFromRange() {
            // hard coded for now, maybe these belong in the global scope or are set dynamically based on difficulty selection?
            // U+1F600 - U+1FAAA    // unicode range for emojis
            const min = 0x1F600;
            const max = 0x1FAAA;
        
            const minDecimal = parseInt(min, 16);
            const maxDecimal = parseInt(max, 16);
        
            const randDecimal = Math.floor(Math.random() * (maxDecimal - minDecimal + 1)) + minDecimal;
        
            const randHex = randDecimal.toString(16).padStart(4, '0');
        
            return randHex;
        }

    }

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


    document.addEventListener('DOMContentLoaded', function() {
        const startGame = document.getElementById('start-game');
        startGame.addEventListener('click', function() {

            const difficulty = getDifficulty();
            const game = new Game(difficulty);

            console.log(`game.difficulty after game instantiation: ${game.difficulty}`);

            const gameboard = document.querySelector(".gameboard");
            game.cards.forEach(card => {
                gameboard.appendChild(card.div);
                card.div.addEventListener('click', () => card.handleClick());
            });
        });
    });
})();
