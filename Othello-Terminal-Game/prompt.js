//This was the prompt given to me in the technical interview. They wrote out the logic for the board and I was supposed to write the game logic around line 184. 
//-------------

const readline = require("readline");

/*
Othello, also known as Reversi, is a game between two players, denoted by black and white. 

Play happens on an 8x8 grid. Game pieces are discs with a black side and a white side. The face-up side of a piece indicates its current owner.

The game begins with two black pieces and two white pieces, as shown:
  a b c d e f g h
1
2
3
4       B W
5       W B
6
7
8

Players alternate turns, beginning with black.

A player's turn consists of placing a new piece of their color on an empty space and then flipping the opponent's pieces.

A player flips lines of one or more opposing pieces when they are bookended (surrounded) by the newly placed piece and one of their existing pieces. The line including the bookends must be contiguous (no gaps). Lines of flipped pieces can be othogonal or diagonal. Multiple lines may be flipped in a single turn.

For example, in the following game, black plays g6. THis move flips the white pieces at c6, d6, e6, f5, and f6 to black.

  a b c d e f g h        a b c d e f g h      a b c d e f g h  
1                     1                    1
2                     2                    2
3       W B W         3        W B W       3        W B W
4     W B B W B       4      W B B W B     4      W B B W B
5   W B W B W         5    W B W B *       5    W B W B B
6   B W W W W         6    B * * * * B     6    B B B B B B
7                     7                    7
8                     8                    8

Every move must flip at least one piece. If a player cannot move, their turn is skipped.

For example, in the following game, white has no legal move:

  a b c d e f g h
1       W W W   W
2     W W W W   W
3   W W W B W W W
4     W B B W B W
5 W W W W W W B W
6   W W W W W W W
7     W W W W W W
8 B B B B B B B W

When neither player can move, the game ends.

At the end of the game, the player with the most pieces wins. If players have the same number of pieces, the game is a tie.

Write a program that two people can use to play a game of Othello.

A fully working program should:
    * Validate attempted moves
    * Execute moves
    * Skip turns
    * End the game
    * Display then winner

If you have extra time, create a simple AI to play the game.

Pace your development such that the program works as much as possible by the end of the alloted time; i.e. it should not be in a "broken" state.

The beginnings of a program are provided. Feel free to modify the program as desired.

*/

class Coordinate {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  toString() {
    return `Coordinate(row=${this.row}, col=${this.col})`;
  }
}

class Color {
  static BLACK = new Color("B");
  static WHITE = new Color("W");

  constructor(name) {
    this.name = name;
  }

  abbreviation() {
    return this.name;
  }

  toString() {
    switch (this.name) {
      case "B":
        return "black";
      case "W":
        return "white";
    }
    throw new Error(`Unknown color: ${this.name}`);
  }
}

class Board {
  constructor(size) {
    this.size = size;
    this.positions = new Array(size)
      .fill(null)
      .map(() => new Array(size).fill(null));
  }

  toString() {
    let result = "";
    result += " ";

    for (let col = 0; col < this.size; col++) {
      result += String.fromCharCode("a".charCodeAt(0) + col);
      result += " ";
    }
    result += "\n";

    for (let row = 0; row < this.size; row++) {
      result += String.fromCharCode("1".charCodeAt(0) + row);
      result += " ";
      for (let col = 0; col < this.size; col++) {
        const position = this.positions[row][col];
        result += position !== null ? position.abbreviation() : " ";
        if (col < this.size - 1) {
          result += " ";
        }
      }
      result += "\n";
    }
    return result;
  }
}

class CoordinateParseException extends Error {}

class Othello {
  static SIZE = 8;

  parseCoordinate(input) {
    if (input.length !== 2) {
      throw new CoordinateParseException("Input must be length 2");
    }
    const row = input.charCodeAt(1) - "1".charCodeAt(0);
    if (row < 0 || Othello.SIZE <= row) {
      throw new CoordinateParseException("Row out of bounds");
    }
    const col = input.charCodeAt(0) - "a".charCodeAt(0);
    if (col < 0 || Othello.SIZE <= col) {
      throw new CoordinateParseException("Column out of bounds");
    }
    return new Coordinate(row, col);
  }

  async play() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    const board = new Board(Othello.SIZE);
    board.positions[3][3] = Color.BLACK;
    board.positions[3][4] = Color.WHITE;
    board.positions[4][3] = Color.WHITE;
    board.positions[4][4] = Color.BLACK;

    let turn = Color.BLACK;

    while (true) {
      console.log(`\n${board.toString()}`);
      try {
        const input = await new Promise((res) =>
          rl.question(`Enter move for ${turn}:`, res)
        );
        const move = this.parseCoordinate(input);

        //TODO: implement 
        board.positions[move.row][move.col] = Color.BLACK;
      } catch (e) {
        if (e instanceof CoordinateParseException) {
          console.log(`Invalid move: ${e.message}`);
          console.log();
          continue;
        } else {
          throw e;
        }
      }
    }
  }
}

const othello = new Othello();
othello.play;
