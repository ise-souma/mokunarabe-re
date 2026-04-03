// "use client";
// import { STORE_KEY_PANEL_SIZE_PREFIX } from 'next/dist/next-devtools/dev-overlay/shared';
// import { SegmentPrefixRSCPathnameNormalizer } from 'next/dist/server/normalizers/request/segment-prefix-rsc';
// import { useState } from 'react'

// function Square({value, onSquareClick}){
//     return (
//         <button className = "square text-black" onClick={onSquareClick}>{value}</button>
//     );
// }

// function calculateWinner(squares, size, winnum){

//     const ren = [
//         { dx: 1, dy: 0 },  // 右
//         { dx: 0, dy: 1 },  // 下
//         { dx: 1, dy: 1 },  // 右下
//         { dx: -1, dy: 1 }  // 左下
//     ];

//     for(let i = 0; i < squares.length; i++){
//         if(!squares[i]) continue;

//         const x = i % size;
//         const y = Math.floor(i/size);
//         const player = squares[i];
//         for(const {dx, dy} of ren){
//             let count = 1;
//             for(let step = 1; step < winnum; step++){
//                 const nx = x + dx*step;
//                 const ny = y + dy*step;

//                 if(nx >= 0 && nx < size && ny >= 0 && ny < size){
//                     if(squares[ny *size + nx] === player){
//                         count++;
//                     } else {
//                         break;
//                     }
//                 } else {
//                     break;
//                 }
//             }
//             if(count == winnum) return player;
//         }
//     }
//     return null;
// }


// function Board({xIsNext, hidesquares, seesquares, onPlay, size, sizechange, winchange, winnum}){
//     const [parcentnow, setparcent] = useState(20);

//     function handleClick(i){
//         if(hidesquares[i] || calculateWinner(hidesquares, size, winnum)){
//             return;
//         }
//         const nexthideSquares = hidesquares.slice();
//         const nextseeSquares = seesquares.slice();
//         if(xIsNext){
//             nexthideSquares[i] = "X";
//             if(Math.random()* 100 > parcentnow){
//                 nextseeSquares[i] = "X";
//             } else {
//                 nextseeSquares[i] = "?";
//             }
//         } else {
//             nexthideSquares[i] = "O";
//             if(Math.random()*100 > parcentnow){
//                 nextseeSquares[i] = "O";
//             } else {
//                 nextseeSquares[i] = "?"
//             }
//         }
//         onPlay(nextseeSquares,nexthideSquares);
//     }

//     function parcentchange(par){
//         setparcent(par);
//     }

//     let num = 0;
//     let column1 = [];
//     for(let i = 0; i < size; i++){
//         let column2 = [];
//         for(let j = 0; j < size; j++){
//             const k = num;
//             column2.push(<Square key = {k} value={seesquares[k]} onSquareClick={()=>handleClick(k)}/>);
//             num++;
//         }
//         column1.push(<div key = {i} className = 'board-row'>{column2}</div>);
//     }

//     const winner = calculateWinner(hidesquares, size, winnum);
//     let status;
//     if(winner){
//         status = 'Winner: ' + winner;
//     } else {
//         status = 'Next player: ' + (xIsNext ? 'X' : 'O');
//     }

//     return (
//         <>
//             <div>
//                 <label>Inbisible parcent:
//                     <input type= "number" defaultValue="20" min = "0" max = "100" className = "winnum-input" onChange={(e)=>parcentchange(Number(e.target.value))}></input>
//                 </label>
//                 <label>Win Condition:
//                     <input type="number" defaultValue="5" min="3" max="10" className = "winnum-input" onChange={(e)=>winchange(Number(e.target.value))}></input>
//                 </label>
//             </div>
//             <div className = "status">{status}</div>
//             {column1}
//         </>
//     )
// }

// export default function Game(){
//     const [winnownum, setwinnum] = useState(5);
//     const [sizenow, setsize] = useState(10);    //fielde size change
//     const [xIsNext, setXIsNext] = useState(true);
//     const [seehistory, setseeHistory] = useState([Array(sizenow*sizenow).fill(null)]);
//     const [hidehistory, sethideHistory] = useState([Array(sizenow*sizenow).fill(null)]);
//     const [currentMove, setCurrentMove] = useState(0);
//     const hideSquares = hidehistory[currentMove];
//     const seeSquares = seehistory[currentMove];
    
//     function handlePlay(nextseeSquares, nexthideSquares){
//         const nexthideHistory = [...hidehistory.slice(0, currentMove+1), nexthideSquares];
//         const nextseeHistory = [...seehistory.slice(0, currentMove+1), nextseeSquares];
//         sethideHistory(nexthideHistory);
//         setseeHistory(nextseeHistory);
//         setCurrentMove(nexthideHistory.length-1);
//         setXIsNext(!xIsNext);
//     }

//     function jumpTo(nextMove){
//         setCurrentMove(nextMove);
//         setXIsNext(nextMove % 2 === 0);
//     }

//     function sizechange(newsize){
//         setsize(newsize);
//         setseeHistory([Array(newsize*newsize).fill(null)]);
//         sethideHistory([Array(newsize*newsize).fill(null)]);
//         setCurrentMove(0);
//     }

//     function winnumchange(newwinnum){
//         setwinnum(newwinnum);
//     }

//     const moves = hidehistory.map((squares, move)=>{
//         let description;
//         if(move > 0){
//             description = 'Go to move #' + move;
//         } else {
//             description = 'Go to game start';
//         }
//         return (
//             <li key={move}>
//                 <button onClick={()=>jumpTo(move)}>{description}</button>
//             </li>
//         )
//     })

//     return (
        
//         <div className="game">
//             <div className="game-board">
//                 <Board 
//                     key = {sizenow} 
//                     xIsNext={xIsNext} 
//                     hidesquares={hideSquares} 
//                     seesquares = {seeSquares} 
//                     onPlay={handlePlay} 
//                     size={sizenow} 
//                     sizechange = {sizechange}
//                     winchange = {winnumchange}
//                     winnum = { winnownum}/>
//             </div>
//             <div className="game-info">
//                 <ol>{moves}</ol>
//             </div>
//         </div>
//     )
// }
"use client";
import { useState } from 'react';

// --- 型の定義 (Interfaces) ---

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

interface BoardProps {
  xIsNext: boolean;
  hidesquares: (string | null)[];
  seesquares: (string | null)[];
  onPlay: (nextSee: (string | null)[], nextHide: (string | null)[]) => void;
  size: number;
  sizechange: (newSize: number) => void;
  winchange: (newWinNum: number) => void;
  winnum: number;
}

// --- コンポーネントとロジック ---

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square text-black" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares: (string | null)[], size: number, winnum: number): string | null {
  const ren = [
    { dx: 1, dy: 0 },  // 右
    { dx: 0, dy: 1 },  // 下
    { dx: 1, dy: 1 },  // 右下
    { dx: -1, dy: 1 }  // 左下
  ];

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) continue;

    const x = i % size;
    const y = Math.floor(i / size);
    const player = squares[i];

    for (const { dx, dy } of ren) {
      let count = 1;
      for (let step = 1; step < winnum; step++) {
        const nx = x + dx * step;
        const ny = y + dy * step;

        if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
          if (squares[ny * size + nx] === player) {
            count++;
          } else {
            break;
          }
        } else {
          break;
        }
      }
      if (count === winnum) return player;
    }
  }
  return null;
}

function Board({ xIsNext, hidesquares, seesquares, onPlay, size, winchange, winnum }: BoardProps) {
  const [parcentnow, setparcent] = useState(20);

  function handleClick(i: number) {
    if (hidesquares[i] || calculateWinner(hidesquares, size, winnum)) {
      return;
    }
    const nexthideSquares = hidesquares.slice();
    const nextseeSquares = seesquares.slice();

    const currentPlayer = xIsNext ? "X" : "O";
    nexthideSquares[i] = currentPlayer;

    if (Math.random() * 100 > parcentnow) {
      nextseeSquares[i] = currentPlayer;
    } else {
      nextseeSquares[i] = "?";
    }

    onPlay(nextseeSquares, nexthideSquares);
  }

  function parcentchange(par: number) {
    setparcent(par);
  }

  // 盤面の生成
  let num = 0;
  let rows = [];
  for (let i = 0; i < size; i++) {
    let rowContent = [];
    for (let j = 0; j < size; j++) {
      const k = num;
      rowContent.push(
        <Square key={k} value={seesquares[k]} onSquareClick={() => handleClick(k)} />
      );
      num++;
    }
    rows.push(<div key={i} className='board-row'>{rowContent}</div>);
  }

  const winner = calculateWinner(hidesquares, size, winnum);
  let status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <>
      <div>
        <label>Invisible percent:
          <input type="number" defaultValue="20" min="0" max="100" className="winnum-input" onChange={(e) => parcentchange(Number(e.target.value))} />
        </label>
        <label>Win Condition:
          <input type="number" defaultValue="5" min="3" max="10" className="winnum-input" onChange={(e) => winchange(Number(e.target.value))} />
        </label>
      </div>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

export default function Game() {
  const [winnownum, setwinnum] = useState(5);
  const [sizenow, setsize] = useState(10);
  const [xIsNext, setXIsNext] = useState(true);
  
  // 初期状態の配列生成を関数化して型を安定させる
  const createEmptyBoard = (size: number) => Array(size * size).fill(null);

  const [seehistory, setseeHistory] = useState<(string | null)[][]>([createEmptyBoard(10)]);
  const [hidehistory, sethideHistory] = useState<(string | null)[][]>([createEmptyBoard(10)]);
  const [currentMove, setCurrentMove] = useState(0);

  const hideSquares = hidehistory[currentMove];
  const seeSquares = seehistory[currentMove];

  function handlePlay(nextseeSquares: (string | null)[], nexthideSquares: (string | null)[]) {
    const nexthideHistory = [...hidehistory.slice(0, currentMove + 1), nexthideSquares];
    const nextseeHistory = [...seehistory.slice(0, currentMove + 1), nextseeSquares];
    sethideHistory(nexthideHistory);
    setseeHistory(nextseeHistory);
    setCurrentMove(nexthideHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  function sizechange(newsize: number) {
    setsize(newsize);
    setseeHistory([createEmptyBoard(newsize)]);
    sethideHistory([createEmptyBoard(newsize)]);
    setCurrentMove(0);
    setXIsNext(true);
  }

  function winnumchange(newwinnum: number) {
    setwinnum(newwinnum);
  }

  const moves = hidehistory.map((_, move) => {
    const description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          key={sizenow}
          xIsNext={xIsNext}
          hidesquares={hideSquares}
          seesquares={seeSquares}
          onPlay={handlePlay}
          size={sizenow}
          sizechange={sizechange}
          winchange={winnumchange}
          winnum={winnownum}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}