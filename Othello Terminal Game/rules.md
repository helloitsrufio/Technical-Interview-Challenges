RULES:
If an white piece is sandwiched between two pieces of the black color, that piece becomes black as well. 
    It can be for any # of pieces that are sandwiched. 
Has to be in a straight line, but that can be vertical, diagonal, or horizontal. 
You have to put a piece down that will cause your opponent's piece to flip over (can't just put a piece somewhere randomly). If you can't do that, your turn gets skipped and it will then be your opponent's turn. 
If you have no pieces left but your opponent does, you can take one of their pieces to make your move. 
You win by having the majority of the tiles on the board.

Matrix is a 2D grid/array (x-y grid). Array of arrays
60 total pieces - 30 each
Black always goes first
Playing 1 piece per turn

At the end of every turn, we print out the board in the terminal. 

Do edge cases last. They want to see train of thought, if you have level of technical mastery over node, and what your problem-solving skills are like. Say that you know of the edge case but will deal with it if you have enough time. 

Write the code that works first, then optimize, then make it pretty.

THE SETUP
- [x] 1. Set up board 
- [x] 2. Set up pieces 
- [x] 3. Beginning pieces come from the thirty pieces. Set up in a square diagonal format: black (diagonal), white (diagonal). So each player effectively starts with 30 pieces. 
- [x] 4. Black goes first

THE GAME LOOP (will repeat over and over until an end condition happens)
- [ ] 5. Check all the places that are valid to place a piece in.
- [ ] 6. If you have no pieces left but your opponent does, you can take one of their pieces to make your move.
- [ ] 7. Player places a piece so that at least one of your opponents pieces are flipped over 
- [ ] 8. Then one or more of the pieces gets flipped to player's color (in whatever direction, can cover multiple rows/columns/diagonals at once)
- [ ] 9. Switch players.

END OF THE GAME (what happens to stop the game loop)
- [ ] 10. IF the board is full or there are no more possible moves, then the game is over.
- [ ] 11. Whoever has the most points wins. 

EDGE CASES (for when we get the base case working)


```javascript
[
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', ],
    ['e', 'e', 'e', 'W', 'B', 'e', 'e', 'e', ],
    ['e', 'e', 'e', 'B', 'W', 'e', 'e', 'e', ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', ],
]
```