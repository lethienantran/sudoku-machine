import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.getElementById("webTitle").innerText = "Sudoku Home Page";
  }, []);
  return (
    <div
      id="homePage"
      className="w-full h-screen bg-black text-white flex-col flex items-center text-center py-4"
    >
      <div id="optionPage" className="w-full h-250 m-auto">
        <h1 className="sm:text-7xl md:text-8xl text-6xl font-RockSalt">
          Sudoku
        </h1>
        <br></br>
        <hr className="sm:w-64 md:w-80 w-52 m-auto"></hr>

        <div className="blob-1 w-48 h-16 mt-2 m-auto md:w-80 md:h-24 sm:w-60 sm:h-16 ">
          <button
            id="buttonNewGame"
            onClick={() => {
              navigate("/new-game");
            }}
            type="button"
            className="group overflow-hidden relative font-Schoolbell sm:text-2xl sm:w-52 sm:h-12 md:text-4xl md:w-72 md:h-20 text-xl w-40 h-12 mt-2 border-2 border-white transition-all cursor-pointer leading-pro ease-soft-in tracking-tight-soft hover:scale-102 active:bg-[#232B2B] active:text-white"
          >
            <span className="absolute left-0 top-7 mt-12 h-72 w-72 bg-[#232023] transition-all duration-300 ease-linear group-hover:-mt-24 group-hover:w-full group-hover:-rotate-35  "></span>
            <span className="relative">New Game</span>
          </button>
        </div>
        <div className="blob-1 w-48 h-16 mt-2 m-auto md:w-80 md:h-24 sm:w-60 sm:h-16">
          <button
            id="buttonSolveSudoku"
            onClick={() => {
              navigate("/solver");
            }}
            type="button"
            className="group overflow-hidden relative font-Schoolbell sm:text-2xl sm:w-52 sm:h-12 md:text-4xl md:w-72 md:h-20 text-xl w-40 h-12 mt-2 border-2 border-white transition-all cursor-pointer leading-pro ease-soft-in tracking-tight-soft hover:scale-102 active:bg-[#232B2B] active:text-white"
          >
            <span className="absolute left-0 top-7 mt-12 h-72 w-72 bg-[#232023] transition-all duration-300 ease-linear group-hover:-mt-24 group-hover:w-full group-hover:-rotate-35  "></span>
            <span className="relative">Solve Sudoku</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
