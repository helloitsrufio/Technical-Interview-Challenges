/*
The following is the Othello game that alexandersix_ and I began to code out in stream. We didn't get very far, but we did get the board down. This was all the information I was given before the interview:

First session (1h30m)
Part 1 - 1h30m programming problem.
You will be implementing a game that runs in the terminal. The core structure of the game will be provided and your task will be to implement the core logic of the program.

I found out that Othello was the game, so that's why we tried to code it. All of the following code was written pre-interview.
*/

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

//3 things to represent what state any square has at any given time: B, W, E
let gameBoard = [
  ["e", "e", "e", "e", "e", "e", "e", "e"],
  ["e", "e", "e", "e", "e", "e", "e", "e"],
  ["e", "e", "e", "e", "e", "e", "e", "e"],
  ["e", "e", "e", "w", "b", "e", "e", "e"],
  ["e", "e", "e", "b", "w", "e", "e", "e"],
  ["e", "e", "e", "e", "e", "e", "e", "e"],
  ["e", "e", "e", "e", "e", "e", "e", "e"],
  ["e", "e", "e", "e", "e", "e", "e", "e"],
];

for (i = 0; i < gameBoard.length; i++) {
  let row = "";
  for (p = 0; p < gameBoard[i].length; p++) {
    row += gameBoard[i][p];
    //NOT THIS ONE
  }
  console.log(row);
}

let blackPieces = 30;
let whitePieces = 30;

let player = "black";
let isWinner = false;

// Game Loop
while (!isWinner) {
  //take input from the user mkay
  readline.question(`Input please: `, userInput => {
    //get the user input
   
    //is the input a valid move? find out by comparing user input to whether that input is e or not? 
    let move = userInput
    //nah bro 
    //tell the ppl nah pick something else
    //if it is valid, then replace the string we pickin on with either b or w. 
    readline.close();
  });
  isWinner = true;
}

no empty getHeapSpaceStatisticsinvalid alertvalid if it captures one or more blackPieces
alternating truncateSyncif player doesn't have a vlaid move available, then it skips to new person. 
valid move checking, replacing piecees. Could implement a simple Animation. Your additions to program can be more than just 

// while(!isWinner){
//   readline.question(`Input please: `, userInput => {
//     for (i = 0; i < gameBoard.length; i++) {
//       for (p = 0; p < gameBoard[i].length; p++) {
//         if(gameBoard[i][p] === 'e'){

//         }
//       }

//     }
// }

//Make a function that will take in the move you want to take and the color of the person who is trying to move. 
//check all of the things you want to check 
  //and if that function returns true then you regenerate the board 
  //and if its false you do nothing and say they cant move
  /*
Just think about what you need and what you have. You need to check if you can make that move, in order to do that you need 
the board, 
the player who is making the move, and finally you need 
the move they are making. 
 3 params

 Is the position occupied by the opposite player?
    You can't do that, ERR
 Is the position sandwiching the opposite player's piece(s)?
    Yes; make all the pieces in that line the same color, that is, the color of the player.


You would start the function to see if the position they are in is occupied by a different player. if it is return false, then you could check to see if the move is even a valid move (meaning they are within the bounds of the board), you can also do some other checks.
If all of your checks are then valid then just return true from the function and then regenerate the board with the players new position updated
  */


writing the rules onplay. 
going to priint out ref error (a code r pad problem). Not defined. 
Move validation is already there.  
no parsing coord or if the move is necessarily valid. If not valid, say that it doesn't capture a piece or something like that. if move is valid switch to other player's truncateSync. 
alkso end of the gameBoard.a
//meant for it to be a meaty problem, np if you finish the problem. they want to see problem-solving approach, what you'd do next, what you've done already, etc. 

class Color {
  static BLACK = new Color('B');
  static WHITE = new Color('W');

  constructor(name) {
    this.name = name;
  }

  abbreviation() {
    return this.name;
  }

  toString() {
    switch (this.name) {
      case 'B':
        return 'black';
      case 'W':
        return 'white';
    }
    throw new Error(`Unknown color: ${this.name}`);
  }
}

class Coordinate {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }}
class Board {
  constructor(size) {
    this.size = size;
    this.positions = new Array(size).fill(null).map(() => new Array(size).fill(null));
  }
  const move = this.parseCoordinate(input);
  const board = new Board(Othello.SIZE);
  board.positions[3][3] = Color.BLACK;
  let turn = Color.BLACK

board.positions[move.row][move.col] = Color.BLACK;
