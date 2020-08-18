const readline = require("readline-sync");
const RESULTS = {
  rock: {
    beats: ["scissors", "lizard"],
    messages: {
      scissors: "Rock crushed the Scissors",
      lizard: "Rock crushed the Lizard",
    },
  },
  scissors: {
    beats: ["paper", "lizard"],
    messages: {
      paper: "Scissors cut the Paper",
      lizard: "Scissors decaptitated the Lizard",
    },
  },
  paper: {
    beats: ["rock", "spock"],
    messages: {
      rock: "Paper covered the Rock",
      spock: "Paper disproved Spock",
    },
  },
  spock: {
    beats: ["rock", "scissors"],
    messages: {
      rock: "Spock vaporized the Rock",
      scissors: "Spock smashed the Scissors",
    },
  },
  lizard: {
    beats: ["paper", "spock"],
    messages: {
      paper: "Lizard ate the Paper",
      spock: "Lizard poisoned Spock",
    },
  },
};

const VALID_CHOICES = {
  r: "rock",
  sc: "scissors",
  p: "paper",
  sp: "spock",
  l: "lizard",
};

function createPlayer() {
  return {
    move: null,
    score: 0,
    moves: [],

    updateScore() {
      this.score += 1;
    },

    resetScore() {
      this.score = 0;
    },

    addMoves() {
      this.moves = [...this.moves, this.move];
    },
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose(choices, humanScore, humanMoves) {
      let newChoices = this.updateChoices(choices, humanScore, humanMoves);
      let randomIndex = Math.floor(Math.random() * newChoices.length);
      this.move = newChoices[randomIndex];
      this.addMoves();
    },

    getLosingMovesFrequency(humanMoves) {
      let losingMovesFreq = {};
      this.moves.forEach((move, index) => {
        losingMovesFreq[move] = losingMovesFreq[move] || 0;
        if (RESULTS[humanMoves[index]].beats.includes(move)) {
          losingMovesFreq[move] += 1;
        }
      });
      return losingMovesFreq;
    },

    getMoveLosePercentage(moveLoseFreq, losingMoves) {
      let losingTotal = Object.values(losingMoves).reduce(
        (sum, num) => sum + num,
        0
      );
      return (moveLoseFreq / losingTotal) * 100;
    },

    updateChoices(choices, humanScore, humanMoves) {
      if (humanScore >= this.score && this.moves.length >= 5) {
        let losingMoves = this.getLosingMovesFrequency(humanMoves);
        let newChoices = Object.keys(losingMoves).filter(
          (move) =>
            this.getMoveLosePercentage(losingMoves[move], losingMoves) < 50
        );
        return newChoices.concat(choices);
      } else {
        return choices;
      }
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();
  let humanObject = {
    choose(choices) {
      let choice;
      let instruction = Object.keys(choices).map((key) => {
        return `[${key}/${choices[key]}]`;
      });
      while (true) {
        console.log(`Choose one: ${instruction.join(", ")}`);
        choice = readline.prompt();

        if (Object.keys(choices).includes(choice)) {
          this.move = choices[choice];
          break;
        } else if (Object.values(choices).includes(choice)) {
          this.move = choice;
          break;
        }
        console.log("Sorry, invalid choice.");
      }
      this.addMoves();
    },
  };

  return Object.assign(playerObject, humanObject);
}

const RPSGAME = {
  human: createHuman(),
  computer: createComputer(),
  results: RESULTS,
  choices: VALID_CHOICES,
  matchWinner: null,

  displayWelcomeMessage() {
    console.log(
      `*** Welcome to ${Object.values(this.choices).join(", ")}! ***`
    );
    console.log(">>> First player to win 5 games win the match! <<<");
  },

  displayGoodByeMessage() {
    console.log(
      `*** Thanks for playing ${Object.values(this.choices).join(
        ", "
      )}. Goodbye! ***`
    );
  },

  compareMoves(humanMove, computerMove) {
    if (this.results[humanMove].beats.includes(computerMove)) {
      this.human.updateScore();
      return "player";
    } else if (this.results[computerMove].beats.includes(humanMove)) {
      this.computer.updateScore();
      return "computer";
    } else {
      return "tie";
    }
  },

  compareScores(humanScore, computerScore) {
    if (humanScore >= 5) {
      return "player";
    } else if (computerScore >= 5) {
      return "computer";
    } else {
      return null;
    }
  },

  displayMoves() {
    console.clear();
    console.log(`Your moves: ${this.human.moves.join(", ")}`);
    let computerMoves = `Computer's moves: ${this.computer.moves.join(", ")}`;
    console.log(computerMoves);
    console.log("=".repeat(computerMoves.length));
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    let gameWinner = this.compareMoves(humanMove, computerMove);

    if (gameWinner === "player") {
      console.log(this.results[humanMove].messages[computerMove]);
      console.log("You win!");
    } else if (gameWinner === "computer") {
      console.log(this.results[computerMove].messages[humanMove]);
      console.log("Computer Wins!");
    } else {
      console.log("It's a tie");
    }
  },

  displayMatchWinner() {
    if (this.matchWinner === "player") {
      console.log("*** You win the match! ***");
    } else if (this.matchWinner === "computer") {
      console.log(">>> Computer wins the match! <<<");
    }
  },

  displayScore() {
    let message = `Your score: ${this.human.score}, Computer score: ${this.computer.score}`;
    console.log(message);
    console.log("=".repeat(message.length));
  },

  playAgain() {
    let gameOrMatch = this.matchWinner ? "match" : "game";
    let answer;
    while (true) {
      console.log(
        `Would you like to play another ${gameOrMatch}? [y/yes] or [n/no]`
      );
      answer = readline.prompt().toLowerCase();
      if (["y", "yes", "n", "no"].includes(answer)) break;
      console.log("Invalid response. Please enter: [y/yes] or [n/no]");
    }
    return answer.toLowerCase()[0] === "y";
  },

  reset() {
    this.human.resetScore();
    this.computer.resetScore();
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose(this.choices);
      this.computer.choose(
        Object.values(this.choices),
        this.human.score,
        this.human.moves
      );
      this.displayMoves();
      this.displayWinner();
      this.displayScore();
      this.matchWinner = this.compareScores(
        this.human.score,
        this.computer.score
      );
      if (this.matchWinner) {
        this.displayMatchWinner();
        if (!this.playAgain) break;
        this.reset();
      }
      if (!this.playAgain()) break;
    }
    this.displayGoodByeMessage();
  },
};

RPSGAME.play();
