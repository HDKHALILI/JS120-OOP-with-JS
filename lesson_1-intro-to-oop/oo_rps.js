const readline = require("readline-sync");

function createPlayer() {
  return {
    move: null,
    score: 0,

    updateScore() {
      this.score += 1;
    },

    resetScore() {
      this.score = 0;
    },
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose(choices) {
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();
  let humanObject = {
    choose(choices) {
      let choice;

      while (true) {
        console.log(`Choose one: ${choices.join(", ")}`);
        choice = readline.question();
        if (choices.includes(choice)) break;
        console.log("Sorr, invalid choice.");
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

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

const RPSGAME = {
  human: createHuman(),
  computer: createComputer(),
  results: RESULTS,
  choices: ["rock", "scissors", "paper", "spock", "lizard"],
  winner: null,

  displayWelcomeMessage() {
    console.log(`Welcome to ${this.choices.join(", ")}!`);
  },

  displayGoodByeMessage() {
    console.log(`Thanks for playing ${this.choices.join(", ")}.Goodbye!`);
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
    if (this.winner === "player") {
      console.log("You win the match!");
    } else if (this.winner === "computer") {
      console.log("Computer wins the match!");
    }
  },

  displayScore() {
    console.log(
      `Your score: ${this.human.score}, Computer score: ${this.computer.score}`
    );
  },

  playAgain() {
    console.log("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === "y";
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose(this.choices);
      this.computer.choose(this.choices);
      this.displayMoves();
      this.displayWinner();
      this.displayScore();
      this.winner = this.compareScores(this.human.score, this.computer.score);
      if (this.winner) {
        this.displayMatchWinner();
        if (!this.playAgain) break;
        this.human.resetScore();
        this.computer.resetScore();
      }
      if (!this.playAgain()) break;
    }
    this.displayGoodByeMessage();
  },
};

RPSGAME.play();
