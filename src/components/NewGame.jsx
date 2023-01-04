import React, { useEffect } from "react";
import { Alert } from "react-alert";
import { useNavigate } from "react-router-dom";
const NewGame = () => {
  let navigate = useNavigate();
  const generateRandomWithRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  let startTime = Math.floor(Date.now() / 1000);
  let errors = 0;
  let numberOfMissingBox = generateRandomWithRange(30, 72);
  let sol = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  let digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const validCol = (boardTile, col, val) => {
    for (let row = 0; row < 9; row++)
      if (boardTile[row][col] === val) return false;
    return true;
  };

  const validRow = (boardTile, row, val) => {
    for (let col = 0; col < 9; col++)
      if (boardTile[row][col] === val) return false;
    return true;
  };

  const validBoxTile = (box, boxTileRow, boxTileCol, val) => {
    for (let row = 0; row < 3; row++)
      for (let col = 0; col < 3; col++)
        if (box[boxTileRow + row][boxTileCol + col] === val) return false;
    return true;
  };

  const validPlace = (boxTile, row, col, val) => {
    return (
      validCol(boxTile, col, val) &&
      validRow(boxTile, row, val) &&
      validBoxTile(boxTile, row - (row % 3), col - (col % 3), val) &&
      val !== 0
    );
  };
  const checkEmptyPlace = (boxTile, position) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (boxTile[row][col] === 0) {
          position.row = row;
          position.col = col;
          return true;
        }
      }
    }
    return false;
  };

  const createBoardArray = (boardSize) => {
    let boardArray = new Array(boardSize);
    for (let i = 0; i < boardSize; i++) {
      boardArray[i] = new Array(boardSize);
    }
    for (let i = 0; i < 81; i++) {
      boardArray[Math.floor(i / boardSize)][i % boardSize] = 0;
    }
    return boardArray;
  };
  const shuffle = (arr) => {
    let arrLength = arr.length;
    while (arrLength !== 0) {
      let rand = Math.floor(Math.random() * arrLength);
      arrLength -= 1;

      let temp = arr[arrLength];
      arr[arrLength] = arr[rand];
      arr[rand] = temp;
    }
    return arr;
  };
  const isComplete = (boxTile) => {
    return boxTile.every((row, i) => {
      return row.every((value, j) => {
        return value !== 0;
      });
    });
  };
  const createSudoku = (boxTile) => {
    let emptyPos = {
      row: -1,
      col: -1,
    };

    if (!checkEmptyPlace(boxTile, emptyPos)) return true;

    let numberArray = shuffle([...digits]),
      row = emptyPos.row,
      col = emptyPos.col;

    numberArray.forEach((currNum, i) => {
      if (validPlace(boxTile, row, col, currNum)) {
        boxTile[row][col] = currNum;
        if (isComplete(boxTile)) return true;
        else if (createSudoku(boxTile)) return true;
        boxTile[row][col] = 0;
      }
    });

    return isComplete(boxTile);
  };

  const rand = () => {
    return Math.floor(Math.random() * 9);
  };
  const createBlankTile = (sudoku, boxMissing) => {
    let boxLeft = boxMissing;
    let result = [...sudoku];
    while (boxLeft > 0) {
      let row = rand();
      let col = rand();
      while (result[row][col] === 0) {
        row = rand();
        col = rand();
      }
      result[row][col] = 0;
      boxLeft--;
    }
    return result;
  };
  const generateSudoku = (level) => {
    let sudoku = createBoardArray(9);
    let sudokuCreate = createSudoku(sudoku);
    if (sudokuCreate) {
      return createBlankTile(sudoku, level);
    }
    return undefined;
  };

  const isValid = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      const r = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const c = 3 * Math.floor(col / 3) + (i % 3);
      if (board[row][i] == num || board[i][col] == num || board[r][c] == num) {
        return false;
      }
    }
    return true;
  };

  const sudokuSolver = (board) => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] == 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, r, c, num)) {
              board[r][c] = `${num}`;
              if (sudokuSolver(board)) {
                return true;
              } else {
                board[r][c] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const startGame = (difficulty) => {
    let count = 0;
    startTime = Math.floor(Date.now() / 1000);
    startTheTimer();
    let difficultTitle = document.getElementById("difficultLabel");
    document.getElementById("errorLabel").innerText =
      "Errors: " + errors + "/3";
    if (difficulty <= 35) {
      difficultTitle.innerText = "Difficulty: Easy";
      document.getElementById("webTitle").innerText = "Easy - Sudoku";
    } else if (difficulty > 35 && difficulty < 55) {
      difficultTitle.innerText = "Difficulty: Medium";
      document.getElementById("webTitle").innerText = "Medium - Sudoku";
    } else {
      difficultTitle.innerText = "Difficulty: Hard";
      document.getElementById("webTitle").innerText = "Hard - Sudoku";
    }
    let regenerate = document.getElementById("random");
    regenerate.addEventListener("click", randomRegenerateSudoku);
    let easy = document.getElementById("easy");
    easy.addEventListener("click", easyRegenerateSudoku);
    let medium = document.getElementById("medium");
    medium.addEventListener("click", mediumRegenerateSudoku);
    let hard = document.getElementById("hard");
    hard.addEventListener("click", hardRegenerateSudoku);
    let sudokuBoard = [];
    sudokuBoard = generateSudoku(difficulty);
    for (let i = 0; i < sudokuBoard.length; i++) {
      for (let j = 0; j < sudokuBoard[0].length; j++)
        sol[i][j] = sudokuBoard[i][j];
    }
    sudokuSolver(sol);
    for (let i = 0; i < 81; i++) {
      let row = Math.floor(i / 9);
      let column = i % 9;
      let tile = document.createElement("div");
      tile.id = row.toString() + " " + column.toString();
      let ans = document.createElement("INPUT");
      if (
        window.screen.width > 1000 &&
        window.screen.height <= 600 &&
        window.screen.height > 450
      ) {
        let board = document.getElementById("board");
        let divOption = document.getElementById("divOption");
        board.style.width = "342px";
        board.style.height = "342px";
        tile.style.width = "38px";
        tile.style.height = "38px";
        tile.style.fontSize = "16px";
        divOption.style.fontSize = "16px";
        divOption.style.width = "75%";
        regenerate.style.width = "120px";
        easy.style.width = "120px";
        medium.style.width = "120px";
        hard.style.width = "120px";
        ans.style.fontSize = "16px";
      }

      if (sudokuBoard[row][column] != "0") {
        tile.innerText = sudokuBoard[row][column];
        tile.classList.add("startNumber");
      } else {
        ans.addEventListener("input", checkTile);
        ans.className = "input";
        function checkTile(e) {
          let val = e.target.value;

          if (val != sol[row][column] && val != "") {
            errors += 1;
            document.getElementById("errorLabel").innerText =
              "Errors: " + errors + "/3";
            console.log(count);
            if (errors >= 3) {
              alert("You have made more than 3 errors. You Lose! Try Again");

              randomRegenerateSudoku();
            }
            console.log(sol[row][column]);
          } else {
            count++;
            if (count >= difficulty + 1) {
              alert(
                "Congratulations! You have solved this sudoku in " +
                  calculateTime()
              );
              randomRegenerateSudoku();
            }
          }
        }
        ans.maxLength = 1;
        ans.setAttribute("min", 1);
        ans.setAttribute("max", 9);
        tile.appendChild(ans);
      }

      if (
        (row <= 2 && column <= 2) ||
        (row <= 2 && column >= 6) ||
        (row > 2 && row < 6 && column > 2 && column < 6) ||
        (row > 5 && column <= 2) ||
        (row > 5 && column > 5)
      ) {
        tile.classList.add("blueTile");
      }

      tile.classList.add("tile");
      document.getElementById("board").appendChild(tile);
    }
  };
  const generateNewBoard = () => {
    numberOfMissingBox = generateRandomWithRange(35, 74);
    startGame(numberOfMissingBox);
  };

  const randomRegenerateSudoku = () => {
    let parent = document.getElementById("board");
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    errors = 0;
    numberOfMissingBox = generateRandomWithRange(30, 74);
    startGame(numberOfMissingBox);
  };
  const easyRegenerateSudoku = () => {
    let parent = document.getElementById("board");
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    errors = 0;
    numberOfMissingBox = generateRandomWithRange(15, 35);
    startGame(numberOfMissingBox);
  };
  const mediumRegenerateSudoku = () => {
    let parent = document.getElementById("board");
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    errors = 0;
    numberOfMissingBox = generateRandomWithRange(40, 55);
    startGame(numberOfMissingBox);
  };
  const hardRegenerateSudoku = () => {
    let parent = document.getElementById("board");
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    errors = 0;
    numberOfMissingBox = generateRandomWithRange(56, 74);
    startGame(numberOfMissingBox);
  };
  const startTheTimer = () => {
    var now = Math.floor(Date.now() / 1000);
    var diff = now - startTime;
    var m = Math.floor(diff / 60);
    var s = Math.floor(diff % 60);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("timerLabel").innerText = "Timer: " + m + ":" + s;
    var t = setTimeout(startTheTimer, 500);
  };

  const calculateTime = () => {
    var now = Math.floor(Date.now() / 1000);
    var diff = now - startTime;
    var m = Math.floor(diff / 60);
    var s = Math.floor(diff % 60);
    m = checkTime(m);
    s = checkTime(s);
    return m + ":" + s;
  };
  const checkTime = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  useEffect(() => {
    generateNewBoard();
  }, []);
  return (
    <div
      id="wrapper"
      className="w-full h-screen bg-black flex flex-col text-center items-center"
    >
      <div
        id="title"
        className="w-full h-20 md:h-28 text-white text-center items-center py-1 font-Kalam sm:text-7xl md:text-8xl text-6xl"
      >
        {" "}
        <h3>Sudoku</h3>
      </div>
      <div
        id="info"
        className="text-white w-full h-8 md:h-12 items-center flex justify-between gap-4 lg:text-2xl md:text-xl sm:text-lg text-xs font-bold"
      >
        <div></div>
        <div id="errorDiv" className="ml-4">
          <h4 id="errorLabel">Errors: 0</h4>
        </div>
        <div id="difficultDiv">
          <h4 id="difficultLabel">Difficult: Hard</h4>
        </div>
        <div id="timerDiv">
          <h4 id="timerLabel">Timer: 00:00</h4>
        </div>
        <div className="mr-4">
          <button onClick={() => navigate("/")}>
            <h3 className="text-4xl inline-block">⌂</h3> Home
          </button>
        </div>
        <div></div>
      </div>
      <div id="board"></div>
      <div
        id="divOption"
        className="w-full sm:w-9/12 md:w-6/12 h-16 items-center flex justify-between mt-0 mb-2 font-Schoolbell"
      >
        <button
          id="random"
          className="randomButton text-black ml-2 text-base p-0 sm:text-lg sm:p-1 md:text-xl md:p-2 lg:text-2xl lg:p-2"
        >
          ⟳
        </button>
        <button
          id="easy"
          className="button text-black text-base p-0 sm:text-lg sm:p-1 md:text-xl md:p-2 lg:text-2xl lg:p-2"
        >
          Easy
        </button>
        <button
          id="medium"
          className="button text-black text-base p-0 sm:text-lg sm:p-1 md:text-xl md:p-2 lg:text-2xl lg:p-2"
        >
          Medium
        </button>
        <button
          id="hard"
          className="button text-black text-base p-0 mr-2 sm:text-lg sm:p-1 md:text-xl md:p-2 lg:text-2xl lg:p-2"
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default NewGame;
