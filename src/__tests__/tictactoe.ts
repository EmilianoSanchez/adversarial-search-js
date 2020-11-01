import { IGameObject, IState } from '../types';

const checkLines = [
  [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
  [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
  [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
  [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
  [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
  [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }],
  [{ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 }]
];

const DRAW = 0.5;
const WIN = 1.0;
const LOSE = 0.0;

type TTTBoardValue = -1 | 0 | 1
type TTTBoardRow = [TTTBoardValue, TTTBoardValue, TTTBoardValue]
type TTTBoard = [TTTBoardRow, TTTBoardRow, TTTBoardRow]

export interface TTTState extends IState {
  currentPlayer: 0 | 1
  board: TTTBoard
  winner?: number
}

export interface TTTAction {
  player: 0 | 1
  x: 0 | 1 | 2
  y: 0 | 1 | 2
}

const ticTacToeGame: IGameObject<TTTState, TTTAction> = {

  initialState: {
    currentPlayer: 0,
    board: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]
  },

  players: [0, 1],

  actionFunction: function (state) {
    let actions: TTTAction[] = [];
    for (let x = 0; x < 3; x++)
      for (let y = 0; y < 3; y++)
        if (state.board[x][y] == -1)
          actions.push({ x: x as 0 | 1 | 2, y: y as 0 | 1 | 2, player: state.currentPlayer });
    return actions;
  },

  resultFunction: function (state, action) {
    // reduce state with action, keeping input state immutable
    let result: TTTState = { ...state, board: [...state.board] };
    result.board[action.x] = [...state.board[action.x]];
    result.board[action.x][action.y] = action.player;
    result.currentPlayer++;
    result.currentPlayer %= 2;
    return result;
  },

  terminalTest: function (state) {
    for (let elem of checkLines) {
      if (state.board[elem[0].x][elem[0].y] != -1 &&
        state.board[elem[0].x][elem[0].y] == state.board[elem[1].x][elem[1].y] &&
        state.board[elem[0].x][elem[0].y] == state.board[elem[2].x][elem[2].y]) {
        state.winner = state.board[elem[0].x][elem[0].y];
        return true;
      }
    }
    for (let x = 0; x < 3; x++)
      for (let y = 0; y < 3; y++)
        if (state.board[x][y] == -1)
          return false;
    state.winner = -1;
    return true;
  },

  // 1: win, 0: loss, 0.5: draw
  utilityFunction: function (state, player) {
    if (state.winner == undefined || state.winner == -1)
      return DRAW;
    else {
      if (player == state.winner)
        return WIN;
      else
        return LOSE;
    }
  }
};

export { ticTacToeGame, DRAW, WIN, LOSE };
