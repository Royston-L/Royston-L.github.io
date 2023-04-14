# Connect 4 Game
The technologies used for the game are html, css and Javascript.

## Game Rules according to M. Bradley & Hasbro.
## Ojective:
To be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally).

## How to play:

  - First, decide who goes first and what color each player will have. 
  - Players must alternate turns, and only one disc can be 'dropped into' the table in each turn. 
  - On your turn, 'drop' one of your colored discs from the top into any of the seven slots. 
  - The game ends when there is a 4-in-a-row (either vertically, horizontally, or diagonally) or a stalemate.
  - The starter of the previous game goes second on the next game.

## Appoach Taken:
  - Use javascript loops to create the board for the game. Otherwise each individual slots need to be created 42 times (6 rows x 7 columns)
  - Loop allows each slot, represented by div tags to be given an unique id.
  - Create the following functions:
     1.  When window first load, run the function to create board (setGame); create main board, set the coordinates for each slot on the board, make the default position of disk to be at the last row for each column. 
     2.  Function to allow 2 players to select 2 colors from the 4 choices provided.
     3.  Function to keep track of each player's move. (setPiece) call another function to check whether that move is a wining move (checkWinner). A condition block to limit players time to decide where to put the disk. Each player is given 5 seconds. After which, the player will lose his/her turn .
     4.  Function to check whether the wining move was created (checkWinner). i.e. connected 4 disk of the same color (vertically, horizontally or diagonally). Call another function to declare who is the winner (setWinner). 
     5.  Function to declare the winner (setWinner).
     6.  Uses sliding window method to check for winner.
        
    ![Horizontal_Vertical](https://user-images.githubusercontent.com/64372755/232069267-30562a7e-53a7-4857-84a9-2689070baefc.png)
(<img align="left" width="200" height="200" src=https://user-images.githubusercontent.com/64372755/230723779-db5f6f40-5662-4d99-8a8a-22fdf22cef5a/to/img.png>)
    
    <img align="left" width="200" height="200" src=https://user-images.githubusercontent.com/64372755/230723785-125b8fb7-9cf1-4959-a9a3-eb42e0d49107.png>
    
    <img align="left" width="200" height="200" src=https://user-images.githubusercontent.com/64372755/230723798-b2f92aa4-5e14-4021-ac74-bdba0bd89bc1.png>

     
