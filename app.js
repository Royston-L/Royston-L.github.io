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
let countdownId = " ";
let timeOut = setTimeout(loseATurn, 5000);

let current1 = 0;
let target1 = 6000;
let current2 = 0;
let target2 = 6000;
// window.onload, by default, is fired when the entire page loads, including its content (images, CSS, scripts, etc.).
// In some browsers it now takes over the role of document.onload and fires when the DOM is ready as well.

// document.onload is called when the DOM is ready which can be prior to images and other external content is loaded.
// Observered that the tiles were not loaded when document.onload was used. i.e. Not all DOM 

window.onload = function () {
    setButtonChoices(buttonAttributes);
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
    let timing1 = document.createElement("h2");
    timing1.setAttribute("id", 'firstPlayercountdown');
    document.getElementById("timing").append(timing1);
    let timing2 = document.createElement("h2");
    timing2.setAttribute("id", 'secondPlayercountdown');
    document.getElementById("timing").append(timing2);
};

function setPiece() {
    if (gameOver) {
        return;
    }

    clearTimeout(timeOut);
    // extract coordinates information from tile's <div> id.
    // 'this' refers to the tile element. 
    // convert the id from a single string to character and store in array
    // to be used as actual integer coordinates by converting the characters in array.
    // use parsInt to convert from string to integer.

    let coords = this.id.split("-"); // "0 - 0" => ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // select from array currColumns, the value 5 from the array's value at c.
    r = currColumns[c];
    // At r = 0, this is the top row, therefore no more tiles can be added.
    if (r < 0) {
        return;
    }

    // Condition block to take turns.
    // Extract first letter of currPlayers choosen color.
    if (turn === true) {
        currPlayer = firstPlayer.charAt(0);
        turn = false;
//         target1 = 6000;
//         current1 = 0;
        countdownId = "firstPlayercountdown";
        firstPlayercountdown(target1, current1);
        timeOut = setTimeout(loseATurn, 5000);
    } else {
        currPlayer = secondPlayer.charAt(0);
        turn = true;
//         target2 = 6000;
//         current2 = 0;
        countdownId = "secondPlayercountdown";
        secondPlayercountdown(target2, current2);
        timeOut = setTimeout(loseATurn, 5000);
    };

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        // set the current element (tile) to css attribute of red piece, which is red.
        // change countdown timer backround to the same color as current element (tile).   
        tile.classList.add("red-piece")
        document.getElementById(countdownId).classList.add("red-piece");
    } else if (currPlayer == playerYellow) {
        // set the current element (tile) to css attribute of yellow piece, which is yellow. 
        // change countdown timer backround to the same color as current element (tile).
        tile.classList.add("yellow-piece")
        document.getElementById(countdownId).classList.add("yellow-piece");
    } else if (currPlayer == playerLime) {
        // set the current element (tile) to css attribute of lime piece, which is lime. 
        // change countdown timer backround to the same color as current element (tile).
        tile.classList.add("lime-piece")
        document.getElementById(countdownId).classList.add("lime-piece");
    } else if (currPlayer == playerFuchsia) {
        // set the current element (tile) to css attribute of fuchsia piece, which is fuchsia. 
        // change countdown timer backround to the same color as current element (tile).
        tile.classList.add("fuchsia-piece")
        document.getElementById(countdownId).classList.add("fuchsia-piece");
    }
    // console.log(board); For testing. To display the player selection
    // update the row height. Since previous row is occupied, 
    // update the value to place the next selection at a row above current row.
    r -= 1

    // update column position, i.e. currColumns array's value. line 25. 
    // both updates will shift the tile one level down 
    currColumns[c] = r;

    checkWinner();
}

// function setButtonChoices creates the following buttons and other attributes:
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
    if (counter === 1) {
        firstPlayer = this.innerText;
        this.style.display = 'none';
    };
    if (counter === 2) {
        secondPlayer = this.innerText;
        document.getElementById("buttons").style.display = "none";
        document.getElementById("select color").style.display = "none";
        counter = 0;
        setGame();
    };
}

function firstPlayercountdown() {
    current1 += 1000;
    let diff1 = target1 - current1;
    let sec1 = (diff1 / 1000);

    if (diff1 <= 0) {
        return;
    };

    if (diff1 > 0) {
        document.getElementById('firstPlayercountdown').innerText = sec1;
        setTimeout(firstPlayercountdown, 1000);
    }
};

function secondPlayercountdown() {
    current2 += 1000;
    let diff2 = target2 - current2;
    let sec2 = (diff2 / 1000);

    if (diff2 <= 0) {
        return;
    };

    if (diff2 > 0) {
        document.getElementById('secondPlayercountdown').innerText = sec2;
        setTimeout(secondPlayercountdown, 1000);
    }
};

function loseATurn() {
    if (turn === true) {
        turn = false;
    } else {
        turn = true;
    }
};

function checkWinner() {
    // check horizontally across columns. Use 'sliding window' method.
    // checks from row 0 to 5; top to bottom
    // for each row check from column 0 to column 3, at the 3rd column, stop because
    // the rest of the condition statement will compare columns at 4th (c+1), 5th (c+2) and 6th (c+3) place  
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // check vertically, downwards. Use 'sliding window' method.
    // check from coumn 0 to 6, left to right
    // for each column check from row 0 to row 3, at the 3rd row, stop because
    // the rest of the condition statement will compare rows at 4th (r+1), 5th (r+2) and 6th (r+3) place
    for (let c = 0; c < columns; c++) {
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
    // exclude checking tiles with coordinates (3,0), (4,0), (4,1), (5,0), (5,1), (5,2); bottom left corner of board 
    // (0,4), (0,5), (0,6), (1,5), (1,6), (2,6); top right corner of board.
    // those corners cannot form 4 tiles in a row anti-diagonally  
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
    // exclude checking tiles with coordinates (3,7), (4,7), (5,7), (4,6), (5,4), (5,3); bottom right corner of board 
    // (0,0), (0,1), (0,2), (1,0), (1,1), (2,0); top left corner of board.
    // those corners cannot form 4 tiles in a row diagonally  
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
    document.getElementById("firstPlayercountdown").style.display = "none";
    document.getElementById("secondPlayercountdown").style.display = "none";
    document.getElementById("gameState").innerText = 'Game Over';
    gameOver = true;
}
