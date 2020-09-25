class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  getMarker() {
    return this.marker;
  }
}

class Board {
  constructor() {
    this.reset();
  }

  reset() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter += 1) {
      this.squares[String(counter)] = new Square();
    }
  }

  display() {
    console.log("\n     |     |");
    console.log(
      `  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`
    );
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(
      `  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`
    );
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(
      `  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`
    );
    console.log("     |     |\n");
  }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.isUnusedSquare(key));
  }

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.marker;
    });

    return markers.length;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  getScore() {
    return this.score;
  }

  incrementSore() {
    this.score += 1;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

let readline = require("readline-sync");

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    ["1", "2", "3"], // top row of board
    ["4", "5", "6"], // center row of board
    ["7", "8", "9"], // bottom row of board
    ["1", "4", "7"], // left column of board
    ["2", "5", "8"], // middle column of board
    ["3", "6", "9"], // right column of board
    ["1", "5", "9"], // diagonal: top-left to bottom-right
    ["3", "5", "7"], // diagonal: bottom-left to top-right
  ];

  static MATCH_GOAL = 3;

  static joinOr(choices, separator = ", ", conjunction = "or") {
    if (choices.length === 1) {
      return choices[0].toString();
    } else if (choices.length === 2) {
      return choices.join(` ${conjunction} `);
    } else {
      let lastChoice = choices.length - 1;
      let result = choices.slice(0, -1).join(separator);
      return `${result}, ${conjunction} ${lastChoice}`;
    }
  }

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    this.displayWelcomeMessage();
    this.playMatch();
    this.displayGoodbyeMessage();
  }

  playOneGame() {
    this.board.reset();
    this.board.display();
    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResults();
  }

  playMatch() {
    console.log(
      `First player to win ${TTTGame.MATCH_GOAL} games wins the match`
    );

    while (true) {
      this.playOneGame();
      this.updateMatchScore();
      this.displayMatchScore();

      if (this.matchOver() || !this.playAgain()) break;
    }

    this.displayMatchResults();
  }

  playAgain() {
    let answer;

    while (true) {
      answer = readline
        .question("Do you want to play again? (y/n) ")
        .toLowerCase();

      if (["y", "n"].includes(answer)) break;

      console.log("Sorry that is not a valid choice.\n");
    }

    console.clear();
    return answer === "y";
  }

  displayWelcomeMessage() {
    console.log("Welcome to Tic Tac Toe!");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  matchOver() {
    return this.isMatchWinner(this.human) || this.isMatchWinner(this.computer);
  }

  isMatchWinner(player) {
    return player.getScore() >= TTTGame.MATCH_GOAL;
  }

  updateMatchScore() {
    if (this.isWinner(this.human)) {
      this.human.incrementSore();
    } else if (this.isWinner(this.computer)) {
      this.computer.incrementSore();
    }
  }

  displayMatchScore() {
    let human = this.human.getScore();
    let computer = this.computer.getScore();
    console.log(
      `Current Match Score: [You: ${human}]   [Computer: ${computer}]`
    );
  }

  displayMatchResults() {
    if (this.human.getScore() > this.computer.getScore()) {
      console.log("You won this match! Congratulations!");
    } else if (this.human.getScore() < this.computer.getScore()) {
      console.log("Oh, boo hoo. You lost the match!");
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square(${TTTGame.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = this.offensiveComputerMove();

    if (!choice) {
      choice = this.defensiveComputerMove();
    }

    if (!choice) {
      choice = this.pickCenterSquare();
    }

    if (!choice) {
      choice = this.pickRandomSquare();
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  pickCenterSquare() {
    return this.board.isUnusedSquare("5") ? "5" : null;
  }

  pickRandomSquare() {
    let validChoices = this.board.unusedSquares();
    let choice;
    do {
      let randomNum = 9 * Math.random();
      choice = Math.floor(randomNum + 1).toString();
    } while (!validChoices.includes(choice));

    return choice;
  }

  defensiveComputerMove() {
    return this.findCriticalSquare(this.human);
  }

  offensiveComputerMove() {
    return this.findCriticalSquare(this.computer);
  }

  findCriticalSquare(player) {
    for (
      let index = 0;
      index < TTTGame.POSSIBLE_WINNING_ROWS.length;
      index += 1
    ) {
      let row = TTTGame.POSSIBLE_WINNING_ROWS[index];
      let key = this.criticalSquare(player, row);
      if (key) return key;
    }

    return null;
  }

  criticalSquare(player, row) {
    if (this.board.countMarkersFor(player, row) === 2) {
      let index = row.findIndex(key => this.board.isUnusedSquare(key));
      if (index >= 0) return row[index];
    }

    return null;
  }

  gameOver() {
    return this.board.isFull() || this.someOneWon();
  }

  someOneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }
}

let game = new TTTGame();
game.play();
