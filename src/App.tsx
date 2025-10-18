import { useState } from 'react'
import './App.css'

type SquareValue = 'X' | 'O' | null

interface Move {
  squares: SquareValue[]
  row: number
  col: number
}

function calculateWinner(squares: SquareValue[]): { winner: 'X' | 'O' | null; line: number[] } {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as 'X' | 'O', line: lines[i] }
    }
  }
  return { winner: null, line: [] }
}

function Square({
  value,
  onSquareClick,
  isWinning,
}: {
  value: SquareValue
  onSquareClick: () => void
  isWinning: boolean
}) {
  return (
    <button
      className={`square ${isWinning ? 'winning' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

function Board({
  xIsNext,
  squares,
  onPlay,
  winningLine,
}: {
  xIsNext: boolean
  squares: SquareValue[]
  onPlay: (newSquares: SquareValue[]) => void
  winningLine: number[]
}) {
  function handleClick(index: number) {
    if (calculateWinner(squares).winner || squares[index]) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[index] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  const rows: React.ReactNode[] = []
  for (let row = 0; row < 3; row++) {
    const cols: React.ReactNode[] = []
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col
      const isWinning = winningLine.includes(index)
      cols.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          isWinning={isWinning}
        />
      )
    }
    rows.push(
      <div key={row} className="board-row">
        {cols}
      </div>
    )
  }

  return <div className="board">{rows}</div>
}

function Game() {
  const [history, setHistory] = useState<Move[]>([{ squares: Array(9).fill(null), row: -1, col: -1 }])
  const [currentMove, setCurrentMove] = useState(0)
  const [isAscending, setIsAscending] = useState(true)

  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove].squares
  const { winner, line: winningLine } = calculateWinner(currentSquares)

  function handlePlay(nextSquares: SquareValue[]) {
    const nextHistory = history.slice(0, currentMove + 1)
    const moveIndex = nextHistory.length
    const lastMove = nextHistory[moveIndex - 1]
    
    // Find which square changed
    let row = -1
    let col = -1
    for (let i = 0; i < 9; i++) {
      if (lastMove.squares[i] !== nextSquares[i]) {
        row = Math.floor(i / 3)
        col = i % 3
        break
      }
    }

    nextHistory.push({ squares: nextSquares, row, col })
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((_, move) => {
    const { row, col } = history[move]
    const description =
      move === 0 ? 'Go to game start' : `Go to move #${move} (${row}, ${col})`
    return (
      <li key={move}>
        {move === currentMove ? (
          <span className="current-move">You are at move #{move}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    )
  })

  const displayMoves = isAscending ? moves : [...moves].reverse()

  let status: string
  if (winner) {
    status = `Winner: ${winner}`
  } else if (currentMove === 9) {
    status = "It's a draw!"
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winningLine={winningLine}
        />
      </div>
      <div className="game-info">
        <button
          className="sort-button"
          onClick={() => setIsAscending(!isAscending)}
        >
          Sort: {isAscending ? 'Ascending' : 'Descending'}
        </button>
        <ol>{displayMoves}</ol>
      </div>
    </div>
  )
}

export default Game
