let playerRed = "R";
let playerYellow = "Y";
let playerLime = "L";
let playerFuchsia = "F";
let firstPlayer = " ";
let secondPlayer = " ";
let currPlayer = " ";
let buttonAttributes = [
    { colorName: "Red", style: "background-color:red", id: "red-piece", class: "button" },
    { colorName: "Yellow", style: "background-color:yellow", id: "yellow-piece", class: "button" },
    { colorName: "Lime", style: "background-color:lime", id: "lime-piece", class: "button" },
    { colorName: "Fuchsia", style: "background-color:fuchsia", id: "fuchsia-piece", class: "button" }
];

let gameOver = false;
let board;
let currColumns;

let rows = 6;
let columns = 7;
let counter = 0;
let turn = true;
// window.onload, by default, is fired when the entire page loads, including its content (images, CSS, scripts, etc.).
// In some browsers it now takes over the role of document.onload and fires when the DOM is ready as well.

// document.onload is called when the DOM is ready which can be prior to images and other external content is loaded.
// Observered that the tiles were not loaded when document.onload was used. i.e. Not all DOM 

window.onload = function () {
    setButtonChoices(buttonAttributes);
    setGame();
};

function setGame() {
    board = [];
    // Preset row value to the last row, 5, for all 7 columns.  
    currColumns = [5, 5, 5, 5, 5, 5, 5];
   
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // Javascript JS
            // create blank space for each column.
            row.push(" ");

            // HTML
            // Use JS to create the div tag with attributes 
            // <div id = "0-0" class = "tile"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();

            // using className replace all existing classes with new class.
            // using classList add a class do not replace existing classes.
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        // Creates an array for the 6 rows to store value of user selection.
        // Store "R" in that specific array selected by playerRed
        // Store "Y" in that specific array playerYellow
        // 0: (7) [' ', ' ', ' ', ' ', ' ', ' ', ' ']
        // 1: (7) [' ', ' ', ' ', ' ', ' ', ' ', ' ']
        // 2: (7) [' ', ' ', ' ', ' ', ' ', ' ', ' ']
        // 3: (7) [' ', ' ', ' ', ' ', ' ', ' ', ' ']
        // 4: (7) [' ', 'R', ' ', ' ', ' ', ' ', ' ']
        // 5: (7) ['R', 'Y', ' ', ' ', ' ', ' ', ' ']

        board.push(row);
    }
    
};

function setPiece() {
    if (gameOver) {
        return;
    }

    // extract coordinates information from tile's <div> id.
    // 'this' refers to the tile element. 
    // convert the id from a single string to character and store in array
    // to be used as actual integer coordinates by converting the characters in array.
    // use parsInt to convert from string to integer.
    let coords = this.id.split("-"); // "0 - 0" => ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // select from line 25, the value 5 from the array's value at c.
    r = currColumns[c];
    // At r = 0, this is the top row, therefore no more tiles can be added.
    if (r < 0) {
        return;
    }

    // Condition block to take turns
    if (turn === true) {
        currPlayer = firstPlayer.charAt(0);
        turn = false;
        setTimeout(loseATurn, 5000);
    } else {
        currPlayer = secondPlayer.charAt(0);
        turn = true;
        setTimeout(loseATurn, 5000);
    };

    board[r][c] = currPlayer; // Extract first letter of currPlayers choosen color. 
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        // set the current element (tile) to css attribute of red piece, which is red. 
        tile.classList.add("red-piece")
    } else if (currPlayer == playerYellow) {
        // set the current element (tile) to css attribute of yellow piece, which is yellow. 
        tile.classList.add("yellow-piece")
    } else if (currPlayer == playerLime) {
        // set the current element (tile) to css attribute of lime piece, which is lime. 
        tile.classList.add("lime-piece")
    } else if (currPlayer == playerFuchsia){
        // set the current element (tile) to css attribute of fuchsia piece, which is fuchsia. 
        tile.classList.add("fuchsia-piece")
    }
    // console.log(board); For testing. To display the player selection
    //update the row height. Since previous row is occupied, 
    // update the value to place the next selection at a row above current row.
    r -= 1

    // update column position, i.e. currColumns array's value. line 25. 
    // both updates will shift the tile one level down 
    currColumns[c] = r;

    checkWinner();
}

// function myFunction() {
//     let x = document.getElementById("myDIV");
//     if (window.getComputedStyle(x).display === "none") {
//       // Do something..
//     }
//   }


// function setButtonChoices creates the following buttons and theor attributes:
// <button id = "red-piece" style="background-color:red" class="button">Red</button>
// <button id = "yellow-piece" style="background-color:yellow"; class="button">Yellow</button>
// <button id = "lime-piece" style="background-color:lime"; class="button">Lime</button>
// <button id = "fuchsia-piece" style="background-color:fuchsia"; class="button">Fuchsia</button>

function setButtonChoices(buttonAttributes) {
    for (attributes in buttonAttributes) {
        let button = document.createElement("button");
        button.setAttribute("id", buttonAttributes[attributes].id);
        button.setAttribute("style", buttonAttributes[attributes].style);
        button.setAttribute("class", buttonAttributes[attributes].class);
        button.innerHTML = buttonAttributes[attributes].colorName;
        button.addEventListener("click", hide);
        document.getElementById("buttons").append(button);
    };
};

function hide() {
    counter += 1;
    turn += 1;
    if (counter === 1) {
        firstPlayer = this.innerText;
        this.style.display = 'none';
    };
    if (counter === 2) {
        secondPlayer = this.innerText;
        document.getElementById("buttons").style.display = "none";
        document.getElementById("select color").style.display = "none";
        counter = 0;
    };
}

function loseATurn() {
    if (turn === true) {
        turn = false;
    } else {
        turn = true;
    }
};

function checkWinner() {
    // check horizontally. Use 'sliding window' method.
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[c][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // check vertically. 
    for (let c = 0; c < columns - 3; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != " ") {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // check anti-diagonally (back slash)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != " ") {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // check diagonally (forward slash)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != " ") {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";
    } else if (board[r][c] == playerYellow) {
        winner.innerText = "Yellow Wins";
    }
    else if (board[r][c] == playerLime) {
        winner.innerText = "Lime Wins";
    }
    else {
        winner.innerText = "Fuchsia Wins";
    };
    gameOver = true;
}