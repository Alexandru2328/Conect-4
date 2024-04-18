let appearanceOrder = 0;
let matrixGame = [
          [11, 21, 31, 41, 51, 61, 71,],
          [12, 22, 32, 42, 52, 62, 72,],
          [13, 23, 33, 43, 53, 63, 73,],
          [14, 24, 34, 44, 54, 64, 74,],   
          [15, 25, 35, 45, 55, 65, 75,], 
          [16, 26, 36, 46, 56, 66, 76,], 
        ];                               
let id = matrixGame.flat();

function resetGame() {
    window.location.reload();
}

function showWiner(winer) {
    let message = document.getElementById("message");
    let newGame = document.getElementById("newGame");
    let btnNewGame = document.createElement("button");
    btnNewGame.textContent = "NEW GAME ?";
    btnNewGame.id = "startGame";
    btnNewGame.addEventListener('click', function() {
        resetGame();
    });
    
    newGame.appendChild(btnNewGame);
    message.innerHTML = "PLAYER " + `${winer}` + " WIN!";
    let container = document.getElementById('container');
    let buttons = container.querySelectorAll('.gridBtn');
    buttons.forEach(button => {
        button.remove();
    }); 

}

function checkAllDiagonals(value) {
    for (let i = 0; i < 6; ++i) {
        let constSbqDiagonal1 = 0, constSbqDiagonal2 = 0;
        for (let j = 0; j + i < 6; ++j) {
            if (matrixGame[j][j + i] === value) {
                ++constSbqDiagonal1;
            } else {
                constSbqDiagonal1 = 0;
            }
            if (matrixGame[j][matrixGame.length - 1 - (j + i)] === value) {
                ++constSbqDiagonal2;
            } else {
                constSbqDiagonal2 = 0;
            }
            if (constSbqDiagonal1 >= 4 || constSbqDiagonal2 >= 4) {
                return true;
            }
        }
    }
    return false;
}


function checkSubsequence(value, line, column) {
    let constSbqLine = 0, constSbqColumn = 0;
    for (let j = 0; j < 7 ; ++j) {
        if (matrixGame[line][j] === value) {
            ++constSbqLine;
        } else {
            constSbqLine = 0;
        }
        if (constSbqLine >= 4) {
            break;
        }
    }
    for (let i = 0; i < 6 ; ++i) {
        if (matrixGame[i][column] === value) {
            ++constSbqColumn;
        } else {
            constSbqColumn = 0;
        }
        if (constSbqColumn >= 4) {
            break;
        }
    }
    if (constSbqLine >= 4 || constSbqColumn >= 4) {
        return true;
    }
    return false;
}

function checkStatus() {
    for (let i = 0; i < 6; ++i) {
        for (let j = 0; j < 7; ++j) {
            if (matrixGame[i][j] === 1 || matrixGame[i][j] === 2) {
                if (checkSubsequence(matrixGame[i][j], i, j) === true) {
                    return matrixGame[i][j];
                } else if (checkAllDiagonals(matrixGame[i][j]) === true) {
                    return matrixGame[i][j];
                }
            }
        }
    }
    return 0;
}

function showColor(number1, number2, buttonid) {
    if (number2 >= 0) {
        ++appearanceOrder;
        let fieldId = matrixGame[number2][number1];
        let field = document.getElementById(fieldId);
        let message = document.getElementById("message");
        if (appearanceOrder % 2 !== 0) {
            field.style.backgroundColor = "red";
            matrixGame[number2][number1] = 2;
            message.innerHTML = "IT'S PLAYER 2 TURN";
        } else {
            field.style.backgroundColor = "yellow";
            matrixGame[number2][number1] = 1;
            message.innerHTML = "IT'S PLAYER 1 TURN";
        }
        --number2;
        document.getElementById(buttonid).setAttribute('onclick',
             `showColor(${number1}, ${number2}, '${buttonid}')`);
        let winer = checkStatus();
        if (winer !== 0) {
            showWiner(winer);
        }
    }
}

function startGame() {
    let gridContainer = document.getElementById("container");
    let btnStart = document.getElementById("startGame");
    btnStart.remove();
    gridContainer.style.display = "grid";
    for (let i = 0; i < 42; ++i) {
        let newField = document.createElement("div");
        newField.className = "griItem";
        newField.id = id[i];
        gridContainer.appendChild(newField);
    }
}