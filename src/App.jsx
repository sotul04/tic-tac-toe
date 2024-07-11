import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {

  const [players, setPlayers] = useState({
    'X': "Player 1",
    'O': "Player 2",
  });

  const [gameTurns, setGameTurns] = useState([]);

  let activePlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X')
    activePlayer = 'O';

  const gameBoard = [...initialGameBoard.map((value) => [...value])];

  gameTurns.map((data) => {
    gameBoard[data.square.row][data.square.col] = data.player;
  })

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const block1 = gameBoard[combination[0].row][combination[0].column];
    const block2 = gameBoard[combination[1].row][combination[1].column];
    const block3 = gameBoard[combination[2].row][combination[2].column];

    if (block1 && block1 === block2 && block2 === block3) {
      winner = players[block1];
      console.log(winner);
      break;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {

    setGameTurns((prevTurns) => {
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    })
  }

  function handleRamatch() {
    setGameTurns([]);
  }

  function handlePlayerChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerChange}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRamatch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
