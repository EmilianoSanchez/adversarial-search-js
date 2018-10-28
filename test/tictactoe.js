"use strict";

var _ = require("lodash");

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

const ticTacToeGame = {

  initialState: {
    currentPlayer: 0,
    board: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]
  },

  players: ["O", "X"],

  actionFunction: function (state) {
    let actions = [];
    for (let x = 0; x < 3; x++)
      for (let y = 0; y < 3; y++)
        if (state.board[x][y] == -1)
          actions.push({ x: x, y: y, player: state.currentPlayer });
    return actions;
  },

  resultFunction: function (state, action) {
    let result = _.cloneDeep(state);
    result.board[action.x][action.y] = action.player;
    result.currentPlayer++;
    result.currentPlayer %= 2;
    return result;
  },

  terminalTest: function (state) {
    return checkLines.some(elem => {
      if (state.board[elem[0].x][elem[0].y] != -1 &&
          state.board[elem[0].x][elem[0].y] == state.board[elem[1].x][elem[1].y] &&
          state.board[elem[0].x][elem[0].y] == state.board[elem[2].x][elem[2].y]){
        state.winner=state.board[elem[0].x][elem[0].y];
        return true;
      }else
        return false;
    });
  },

  // 1: win, 0: loss, 0.5: draw
  utilityFunction: function (state, player) {
    if(state.winner==undefined)
      return DRAW;
    else{
      if(player==state.winner)
        return WIN;
      else
        return LOSE;
    }
  }
};

export { ticTacToeGame , DRAW, WIN, LOSE};
