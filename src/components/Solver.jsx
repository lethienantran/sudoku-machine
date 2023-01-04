import React, { useEffect } from "react";
import { Alert } from "react-alert";
import { useNavigate } from "react-router-dom";
const Solver = () => {
  const setRC = new Set();
  let navigate = useNavigate();
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
  const generateNewBoard = () => {
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
        let solvingBoard = document.getElementById("solvingBoard");
        solvingBoard.style.width = "342px";
        solvingBoard.style.height = "342px";
        tile.style.width = "38px";
        tile.style.height = "38px";
        tile.style.fontSize = "16px";
        ans.style.fontSize = "16px";
      }
      ans.addEventListener("input", updateSol);
      ans.className = "input";
      function updateSol(e) {
        let val = e.target.value;
        sol[row][column] = val;
        console.log(
          "row: " + row + " column: " + column + "value: " + sol[row][column]
        );
      }
      ans.maxLength = 1;
      ans.setAttribute("min", 1);
      ans.setAttribute("max", 9);
      tile.appendChild(ans);
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
      document.getElementById("solvingBoard").appendChild(tile);
    }
  };

  const checkValidEnteredSudoku = () => {
    const set = new Set();
    for (let i = 0; i < sol.length; i++) {
      for (let j = 0; j < sol[0].length; j++) {
        const val = sol[i][j];
        if (val !== -1) {
          const rowString = `${val} at row ${i}`;
          const colString = `${val} at col ${j}`;
          const boxString = `${val} at box ${Math.floor(i / 3)}, ${Math.floor(
            j / 3
          )}`;

          if (set.has(rowString) || set.has(colString) || set.has(boxString)) {
            document.getElementById("announce").style.color = "red";
            document.getElementById("announce").innerText =
              "Invalid Sudoku. Try Again!";
            return false;
          } else {
            set.add(rowString);
            set.add(colString);
            set.add(boxString);
          }
        }
      }
    }
    document.getElementById("announce").style.color = "green";
    document.getElementById("announce").innerText =
      "This is a valid sudoku. Click solve if you want us to solve!";
    return true;
  };
  const checkButtonSol = () => {
    if (checkValidEnteredSudoku)
      document.getElementById("announce").innerText =
        "The Sudoku Is Valid. Click Solve If You Want To Solve the Sudoku!";
    else
      document.getElementById("announce").innerText =
        "The Sudoku Is Invalid And Cannot Be Solved! Try Again!";
  };
  const displaySolution = () => {
    for (let i = 0; i < 81; i++) {
      let row = Math.floor(i / 9);
      let column = i % 9;
      let tile = document.createElement("div");
      tile.id = row.toString() + column.toString();
      if (setRC.has(tile.id)) tile.style.color = "red";
      if (
        window.screen.width > 1000 &&
        window.screen.height <= 600 &&
        window.screen.height > 450
      ) {
        let solvingBoard = document.getElementById("solvingBoard");
        solvingBoard.style.width = "342px";
        solvingBoard.style.height = "342px";
        tile.style.width = "38px";
        tile.style.height = "38px";
        tile.style.fontSize = "16px";
      }
      tile.innerText = sol[row][column];
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
      document.getElementById("solvingBoard").appendChild(tile);
    }
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
        if (board[r][c] == "-1") {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, r, c, num)) {
              board[r][c] = `${num}`;
              setRC.add(r.toString() + c.toString());
              if (sudokuSolver(board)) {
                return true;
              } else {
                board[r][c] = "-1";
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  const sudokoSolverFunction = () => {
    if (checkValidEnteredSudoku() === true) {
      sudokuSolver(sol);
      let parent = document.getElementById("solvingBoard");
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
      displaySolution();
      document.getElementById("announce").style.color = "green";
      document.getElementById("announce").innerText =
        "The Sudoku Has Been Solved Successfully!";
    } else {
      alert("Unsolvable :( Try Again!");
      navigate("/");
    }
  };

  useEffect(() => {
    document.getElementById("webTitle").innerText = "Sudoku Solver";
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
        className="text-white w-full h-8 md:h-12 items-center  text-center lg:text-2xl md:text-xl sm:text-lg text-xs font-bold"
      >
        <h4 id="announce" className="mt-2">
          {" "}
          Enter the sudoku you want to solve!{" "}
        </h4>
      </div>
      <div id="solvingBoard" className=" text-white"></div>
      <div
        id="optionSolving"
        className="w-full sm:w-9/12 md:w-9/12 h-18 items-center flex gap-4 justify-between mt-0 mb-2 font-Schoolbell text-base sm:text-lg md:text-xl"
      >
        <button
          onClick={checkValidEnteredSudoku}
          id="checkValidBoardButton"
          className="ml-2"
        >
          Check Valid Sudoku
        </button>
        <button onClick={sudokoSolverFunction} id="checkValidBoardButton">
          Solve The Sudoku
        </button>

        <button
          onClick={() => navigate("/")}
          id="home"
          className="button py-3 mr-2"
        >
          <h1>⌂</h1>
        </button>
      </div>
    </div>
  );
};

export default Solver;
