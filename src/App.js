import { useCallback, useEffect, useState } from 'react';

import { Board } from './components/Board';
import { DropDown } from './components/DropDown';
import { GenerationDisplay } from './components/GenerationDisplay';
import { MyButton } from './components/MyButton';
import { Slider } from './components/Slider';
import { countNeighbors, createBoardArray, isAlive } from './util/gameLogic';

import './App.css';

function App() {
  const [gameOptions, setGameOptions] = useState({
    boardSize: 4400,
    interval: 50,
    pattern: "random"
  });
  const [boardArray, setBoardArray] = useState(
    createBoardArray(gameOptions.boardSize, "clear")
  );
  const [running, setRunning] = useState(true);
  const [generation, setGeneration] = useState(0);

  const getNextBoard = useCallback(() => {
    let res = [];
    boardArray.forEach((cell, i) => {
      const sum = countNeighbors(i, boardArray);

      if (isAlive(cell)) {
        if (sum === 2 || sum === 3) res[i] = 1;
        else res[i] = 0;
      }
      else if (!isAlive(cell)) {
        if (sum === 3) res[i] = 1;
        else res[i] = 0;
      }
      else res[i] = cell;
    })
    return res;
  }, [boardArray])

  const updateBoard = useCallback(nextBoard => {
    setBoardArray(nextBoard);
  }, [setBoardArray])

  useEffect(() => {
    const nextBoard = createBoardArray(gameOptions.boardSize, gameOptions.pattern);
    updateBoard(nextBoard);
    setGeneration(0);
  }, [gameOptions.pattern, gameOptions.boardSize, updateBoard])

  useEffect(() => {
    if (running) {
      let myInterval = setInterval(() => {
        updateBoard(getNextBoard);
        setGeneration(prev => ++prev);
      }, gameOptions.interval * 10)
      return () => clearInterval(myInterval);
    }
  }, [running, gameOptions.interval, updateBoard, getNextBoard])

  return (
    <div className="App">
      <h1>Game of Life</h1>
      <Board boardArray={boardArray} setBoardArray={setBoardArray} />
      <br />
      <GenerationDisplay generation={generation} />
      <MyButton
        text={!running ? "START" : "STOP"}
        onClick={() => setRunning(!running)}
      />
      <br />
      <MyButton
        text="CLEAR"
        onClick={() => setBoardArray(createBoardArray(gameOptions.boardSize, "clear"))}
      />
      <br />
      <MyButton
        text="RESET"
        onClick={() => {
          setBoardArray(createBoardArray(gameOptions.boardSize, gameOptions.pattern));
          setGeneration(0);
        }}
      />
      <Slider
        interval={gameOptions.interval}
        setGameOptions={setGameOptions}
      />
      <DropDown
        setGameOptions={setGameOptions}
      />
    </div>
  );
}

export default App;
