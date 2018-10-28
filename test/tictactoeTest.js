import * as assert from "assert";
import Game from "../src/game";
import { ticTacToeGame } from "./tictactoe";

let tttGame = Game.create(ticTacToeGame);

describe("TicTacToe tests", () => {

  it("getInitialState equals to initialState", () => {
    assert.equal(tttGame.getInitialState(), ticTacToeGame.initialState);
  });

  it("num of players is equal to 2", () => {
    assert.equal(tttGame.getPlayers().length, 2);
  });

  it("player of initial state is the first (index #0)", () => {
    assert.equal(tttGame.getPlayer(tttGame.getInitialState()), 0);
  });

  it("initialState is not terminal", () => {
    assert.equal(tttGame.isTerminal(tttGame.getInitialState()), false);
  });

  it("there must be 9 actions for the initialState", () => {
    assert.equal(tttGame.getActions(tttGame.getInitialState()).length, 9);
  });

  it("new expected state", () => {
    let newState = tttGame.getResult(tttGame.getInitialState(), tttGame.getActions(tttGame.getInitialState())[4]);
    let expectedState = {
      currentPlayer: 1,
      board: [[-1, -1, -1], [-1, 0, -1], [-1, -1, -1]]
    };
    assert.deepEqual(newState, expectedState);
  });

  it("actions until terminal state", () => {
    let currentState = tttGame.getInitialState();
    while (!tttGame.isTerminal(currentState)) {
      let actions = tttGame.getActions(currentState);
      let selectedAction = actions[Math.floor(Math.random() * actions.length)];
      currentState = tttGame.getResult(currentState, selectedAction);
    }
    assert.equal(tttGame.isTerminal(currentState), true);
  });
});
