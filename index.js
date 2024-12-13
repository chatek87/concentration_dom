// replace with call to fetch emojis from api?
import { emojis } from "./emojis.js";
// difficulty levels
const easy = 6;
const med = 12;
const hard = 18;

(function () {
  "use strict";

  class Game {
    constructor(difficulty) {
      this.difficulty = difficulty;
      this.initialize();
    }

    // GAME SETUP STUFF...
    initialize() {
      this.emojiList = this.getEmojiListByDifficulty(this.difficulty);
      this.cards = this.createCardsFromEmojiList();
      // tracks whether first or second guess
      this.firstGuessMade = false;
      // tracks whether we are in 'guessing' mode (serves as a gate for whether handleClick() does anything or not)
      this.guessingInProgress = true;
      // holds card guesses for comparison
      this.firstGuess = null;
      this.secondGuess = null;
      this.numberOfGuessesMade = 0;
    }

    updateGuessesCounter() {
      const guessesCounter = document.getElementById("guesses-counter");
      guessesCounter.textContent = `Guesses Made: ${this.numberOfGuessesMade}`;
    }

    getEmojiListByDifficulty(difficulty) {
      if (difficulty) {
        switch (difficulty) {
          case "easy":
            return this.createEmojiList(easy);
          case "med":
            return this.createEmojiList(med);
          case "hard":
            return this.createEmojiList(hard);
          default:
            return console.error(
              `unhandled value for difficulty: '${difficulty}'`
            );
        }
      } else {
        return console.error("no difficulty provided");
      }
    }

    createCardsFromEmojiList() {
      let len = this.emojiList.length;
      let cards = [];

      for (let i = 0; i < len; i++) {
        let card = new Card(this.emojiList[i], i, this);
        cards.push(card);
      }

      return cards;
    }

    createEmojiList(numberOfPairs) {
      const emojiList = [];
      // populate list
      for (let i = 0; i < numberOfPairs; i++) {
        let emoji;
        do {
          emoji = this.randomEmojiFromRange();
        } while (emojiList.includes(emoji));
        // push two copies of the random emoji to the list
        emojiList.push(emoji);
        emojiList.push(emoji);
      }
      // shuffle list
      for (let i = emojiList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [emojiList[i], emojiList[j]] = [emojiList[j], emojiList[i]];
      }

      return emojiList;
    }

    randomEmojiFromRange() {
      let randomIndex = Math.floor(Math.random() * emojis.length);

      return emojis[randomIndex];
    }

    // GAMEPLAY STUFF ...
    async cardClicked(card) {
      if (this.guessingInProgress) {
        if (!card.matched && card !== this.firstGuess) {
          if (!this.firstGuessMade) {
            // check if card is already matched/uncovered?
            // first guess
            this.firstGuess = card;
            card.show();
            this.firstGuessMade = true;
          } else {
            // second guess
            // don't do stuff if card is shown
            if (card.cover.style.display === "block") {
              this.secondGuess = card;
              card.show();

              this.guessingInProgress = false;

              // compare guesses
              if (this.firstGuess.emoji === this.secondGuess.emoji) {
                this.firstGuess.matched = true;
                this.secondGuess.matched = true;
                console.log("successful match!");
              } else {
                await delay(1000);
                this.firstGuess.hide();
                this.secondGuess.hide();
              }
              // update guesses counter
              this.numberOfGuessesMade += 1;
              this.updateGuessesCounter();
              // reset for next turn
              this.firstGuess = null;
              this.secondGuess = null;
              this.firstGuessMade = false;
              this.guessingInProgress = true;
            }
          }
        }
      }
    }

    async showAllCardsBriefly(ms) {
      this.cards.forEach((card) => {
        card.show();
      });
      // how can i incorporate delay here of ms time
      await delay(ms);
      this.cards.forEach((card) => {
        card.hide();
      });
    }
  }

  class Card {
    constructor(emoji, index, game) {
      this.emoji = emoji;
      // this.selected = false;
      this.matched = false;
      this.timesClicked = 0;
      this.div = document.createElement("div");
      this.div.innerHTML = this.emoji;
      this.div.classList.add("card");
      this.div.setAttribute("data-index", index);
      this.div.addEventListener("click", this.handleClick.bind(this));

      this.cover = document.createElement("div");
      this.hide();
      this.cover.classList.add("cover");
      this.div.appendChild(this.cover);

      this.game = game; // reference to the game instance
    }

    hide() {
      this.cover.style.display = "block";
    }

    show() {
      this.cover.style.display = "none";
    }

    handleClick() {
      this.game.cardClicked(this);
    }
  }

  function getDifficulty() {
    // get difficulty based on user selection, use this as arg to generateEmojiList()
    const difficultySelector = document.getElementById("difficulty-selector");
    const selection = difficultySelector.querySelector(
      'input[name="difficulty"]:checked'
    );

    if (selection) {
      return selection.value;
    } else {
      console.error("no difficulty selected");
      return null;
    }
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  document.addEventListener("DOMContentLoaded", function () {
    const startGame = document.getElementById("start-game");
    startGame.addEventListener("click", async function () {
      // grab gameboard from html
      const gameboard = document.querySelector(".gameboard");
      // clear gameboard
      while (gameboard.firstChild) {
        gameboard.removeChild(gameboard.firstChild);
      }
      // grab the difficulty, use it to instantiate new game
      const difficulty = getDifficulty();
      const game = new Game(difficulty);
      game.updateGuessesCounter();
      console.log(`game started. difficulty: ${game.difficulty}`);
      // add event listener to each card, append card to gameboard
      game.cards.forEach((card) => {
        gameboard.appendChild(card.div);
      });
      // reset difficulty selector
      const difficultySelector = document.getElementById("difficulty-selector");
      const radios = difficultySelector.querySelectorAll(
        'input[name="difficulty"]'
      );
      radios.forEach((radio) => {
        radio.checked = false;
      });

      await game.showAllCardsBriefly(1000);
    });
  });
})();
