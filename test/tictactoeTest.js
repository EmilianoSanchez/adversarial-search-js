import * as assert from "assert";
import { Game, MinimaxSearch } from "../src/index";
import { ticTacToeGame, DRAW } from "./tictactoe";

let tttGame = Game.create(ticTacToeGame);

describe("TicTacToe tests", () => {

  it("getInitialState equals to initialState", () => {
    assert.equal(tttGame.getInitialState(), ticTacToeGame.initialState);
  });

  it("num of players is equal to 2", () => {
    assert.equal(tttGame.getPlayers().length, 2);
  });

  it("The current player of the initial state is the first player (index #0)", () => {
    assert.equal(tttGame.getPlayer(tttGame.getInitialState()), 0);
  });

  it("initialState is not terminal", () => {
    assert.equal(tttGame.isTerminal(tttGame.getInitialState()), false);
  });

  it("there must be 9 actions for the initialState", () => {
    assert.equal(tttGame.getActions(tttGame.getInitialState()).length, 9);
  });

  it("expected state when executed an action over the initialState", () => {
    let newState = tttGame.getResult(tttGame.getInitialState(), { x: 1, y: 1, player: 0 });
    let expectedState = {
      currentPlayer: 1,
      board: [[-1, -1, -1], [-1, 0, -1], [-1, -1, -1]]
    };
    assert.deepEqual(newState, expectedState);
  });

  it("Execute random actions until terminal state is reached", () => {
    let currentState = tttGame.getInitialState();
    while (!tttGame.isTerminal(currentState)) {
      let actions = tttGame.getActions(currentState);
      let selectedAction = actions[Math.floor(Math.random() * actions.length)];
      currentState = tttGame.getResult(currentState, selectedAction);
    }
    assert.equal(tttGame.isTerminal(currentState), true);
  });

  it("DRAW utility value for a given terminal state", () => {
    let auxState = { currentPlayer: 1, board: [[0, 0, 1], [1, 0, 0], [0, 1, 1]] };
    assert.equal(tttGame.isTerminal(auxState), true);
    assert.equal(tttGame.utilityFunction(auxState, 1), DRAW);
  });

});

let tttSearch = new MinimaxSearch(tttGame);

const testSamples = [
  {
    input: { currentPlayer: 0, board: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]] },
    expectedResult: { x: 0, y: 0, player: 0 },
    description: "best solution from initialState"
  },
  {
    input: { currentPlayer: 1, board: [[-1, -1, -1], [-1, 0, -1], [-1, -1, -1]] },
    expectedResult: { x: 0, y: 0, player: 1 },
    description: "best solution when first player put 'O' in the middle"
  },
  {
    input: { currentPlayer: 1, board: [[1, -1, -1], [-1, 0, -1], [-1, -1, 0]] },
    expectedResult: { x: 0, y: 2, player: 1 },
    description: "best solution from a given state"
  },
  {
    input: { currentPlayer: 1, board: [[0, -1, 1], [-1, 0, -1], [0, -1, 1]] },
    expectedResult: { x: 1, y: 2, player: 1 },
    description: "winner solution"
  },
  {
    input: { currentPlayer: 1, board: [[0, -1, 1], [-1, 0, 0], [-1, -1, 1]] },
    expectedResult: { x: 1, y: 0, player: 1 },
    description: "winner solution"
  },
  {
    input: { currentPlayer: 1, board: [[0, -1, 1], [-1, 0, 0], [0, 1, 1]] },
    expectedResult: { x: 1, y: 0, player: 1 },
    description: "winner solution"
  },
];

describe("TicTacToe MinimaxSearch tests", function () {
  this.timeout(30000);

  testSamples.forEach((sample) => {
    it(sample.description, () => {
      assert.deepEqual(tttSearch.makeDecision(sample.input), sample.expectedResult);
    });
  });

});
