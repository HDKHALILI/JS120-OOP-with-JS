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
    }
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
        console.log(`Choose one: ${choices.join(', ')}`);
        choice = readline.question();
        if (choices.includes(choice)) break;
        console.log("Sorr, invalid choice.");
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createMove() {
  return {
    // possible state: type of move (paper, rock, scissors)
  };
}

function createRule() {
  return {
    // possible state? not clear whether rules need state
  };
}

// Since we don't know where to put 'compare', let's define
// it as an ordinary function.
let compare = function (move1, move2) {
  // not yet implemented
};

// engine needs to compare moves and determine the winner

const RESULTS = {
  rock: {
    beats: ['scissors', 'lizard'],
    messages: {
      scissors: "Rock crushed the Scissors",
      lizard: "Rock crushed the Lizard"
    }
  },
  scissors: {
    beats: ['paper', 'lizard'],
    messages: {
      paper: "Scissors cut the Paper",
      lizard: "Scissors decaptitated the Lizard"
    }
  },
  paper: {
    beats: ['rock', 'spock'],
    messages: {
      rock: "Paper covered the Rock",
      spock: "Paper disproved Spock"
    }
  },
  spock: {
    beats: ['rock', 'scissors'],
    messages: {
      rock: "Spock vaporized the Rock",
      scissors: "Spock smashed the Scissors"
    }
  },
  lizard: {
    beats: ['paper', 'spock'],
    messages: {
      paper: "Lizard ate the Paper",
      spock: "Lizard poisoned Spock"
    }
  }
};

const RPSGAME = {
  human: createHuman(),
  computer: createComputer(),
  results: RESULTS,
  choices: ['rock', 'scissors', 'paper', 'spock', 'lizard'],

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },

  displayGoodByeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
  },

  compare(humanMove, computerMove) {
    if (this.results[humanMove].beats.includes(computerMove)) {
      this.human.updateScore();
      return 'player';
    } else if (this.results[computerMove].beats.includes(humanMove)) {
      this.computer.updateScore();
      return 'computer';
    } else {
      return 'tie';
    }
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    let winner = this.compare(humanMove, computerMove);
    console.log(`You chose: ${humanMove}`);
    console.log(`The computer chose: ${computerMove}`);

    if (winner === 'player') {
      console.log("You win!");
    } else if (winner === 'computer') {
      console.log("Computer Wins!");
    } else {
      console.log("It's a tie");
    }
  },

  displayScore() {
    console.log(`Your score: ${this.human.score}, Computer score: ${this.computer.score}`);
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
      this.displayWinner();
      this.displayScore();
      if (!this.playAgain()) break;
    }

    this.displayGoodByeMessage();
  },
};

RPSGAME.play();
