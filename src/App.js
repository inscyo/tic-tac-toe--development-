import { useState, useEffect } from "react";
import oimg from "./icon-o.svg";
import ximg from "./icon-x.svg";

function App() {
  const boardInitial = new Array(9).fill(undefined);
  const [board] = useState(boardInitial);
  const [turn, setTurn] = useState(undefined);
  const [aiTurn, setAiTurn] = useState(false);
  const [history, setHistory] = useState([]);
  const [winner, setWinner] = useState(undefined);
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleTurn = (index) => {
    board[index] = 0;
    setTurn(0);
    setAiTurn(true);
    setHistory((prev) => [...prev, turn]);
    const aiTime = setTimeout(() => {
      ai();
      clearTimeout(aiTime);
    }, 2000);
  };

  const ai = () => {
    let aiMove = [];
    for (let i = board.length; i--; ) {
      if (board[i] === undefined) aiMove = [...aiMove, i];
    }
    let rand = aiMove[Math.round(Math.random() * aiMove.length)];
    !rand
      ? (board[aiMove[Math.round(Math.random() * aiMove.length)]] = 1)
      : (board[rand] = 1);

    setTurn(1);
    setHistory((prev) => [...prev, turn]);
    setAiTurn(false);
  };

  useEffect(() => {
    if (turn === undefined) return;
    for (let combination of combinations) {
      if (
        board[combination[0]] == turn &&
        board[combination[1]] == turn &&
        board[combination[2]] == turn
      ) {
        const timeout = setTimeout(() => {
          window.confirm(`"${turn == 1 ? "o" : "x"}"` + " won!");
          setWinner(true);
          clearTimeout(timeout);
          handleRestart();
        }, 100);
        return;
      }
    }
    if (history.length >= board.length && !winner) {
      const timeout = setTimeout(() => {
        window.confirm("draw!");
        clearTimeout(timeout);
        handleRestart();
      }, 0);
      return;
    }
  }, [turn]);

  const handleRestart = () => window.location.reload();

  return (
    <section id="gameplay" className="gameplay container d-grid">
      {!winner && (
        <div id="gameplay-board" className="gameplay__board">
          {board.map((a, i) => {
            return (
              <div
                key={i}
                className={`gameplay__card ${
                  a !== undefined ? (a == 0 ? "o" : "x") : null
                }`}
                onClick={() =>
                  !winner && !a && !aiTurn ? handleTurn(i) : false
                }
              >
                {a !== undefined ? (
                  a == 0 ? (
                    <img src={ximg} />
                  ) : (
                    <img src={oimg} />
                  )
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default App;
