import { Game, MinimaxSearch } from '../index';
import { ticTacToeGame, DRAW, TTTState, TTTAction } from './tictactoe';

let tttGame = Game.create(ticTacToeGame);

describe('TicTacToe tests', () => {

  test('getInitialState equals to initialState', () => {
    expect(tttGame.getInitialState()).toBe(ticTacToeGame.initialState);
  });

  test('num of players is equal to 2', () => {
    expect(tttGame.getNumPlayers()).toBe(2);
  });

  test('The current player of the initial state is the first player (index #0)', () => {
    expect(tttGame.getPlayer(tttGame.getInitialState())).toBe(0);
  });

  test('initialState is not terminal', () => {
    expect(tttGame.isTerminal(tttGame.getInitialState())).toBe(false);
  });

  test('there must be 9 actions for the initialState', () => {
    expect(tttGame.getActions(tttGame.getInitialState()).length).toBe(9);
  });

  test('expected state when executed an action over the initialState', () => {
    let newState = tttGame.getResult(tttGame.getInitialState(), { x: 1, y: 1, player: 0 });
    let expectedState = {
      currentPlayer: 1,
      board: [[-1, -1, -1], [-1, 0, -1], [-1, -1, -1]]
    };
    expect(newState).toEqual(expectedState);
  });

  test('Execute random actions until terminal state is reached', () => {
    let currentState = tttGame.getInitialState();
    while (!tttGame.isTerminal(currentState)) {
      let actions = tttGame.getActions(currentState);
      let selectedAction = actions[Math.floor(Math.random() * actions.length)];
      currentState = tttGame.getResult(currentState, selectedAction);
    }
    expect(tttGame.isTerminal(currentState)).toBe(true);
  });

  test('DRAW utility value for a given terminal state', () => {
    let auxState: TTTState = { currentPlayer: 1, board: [[0, 0, 1], [1, 0, 0], [0, 1, 1]] };
    expect(tttGame.isTerminal(auxState)).toBe(true);
    expect(tttGame.utilityFunction(auxState, 1)).toBe(DRAW);
  });

});

let tttSearch = new MinimaxSearch(tttGame);

const testSamples: { input: TTTState, expectedResult: TTTAction, description: string }[] = [
  {
    input: { currentPlayer: 0, board: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]] },
    expectedResult: { x: 0, y: 0, player: 0 },
    description: 'best solution from initialState'
  },
  {
    input: { currentPlayer: 1, board: [[-1, -1, -1], [-1, 0, -1], [-1, -1, -1]] },
    expectedResult: { x: 0, y: 0, player: 1 },
    description: 'best solution when first player put "O" in the middle'
  },
  {
    input: { currentPlayer: 1, board: [[1, -1, -1], [-1, 0, -1], [-1, -1, 0]] },
    expectedResult: { x: 0, y: 2, player: 1 },
    description: 'best solution from a given state'
  },
  {
    input: { currentPlayer: 1, board: [[0, -1, 1], [-1, 0, -1], [0, -1, 1]] },
    expectedResult: { x: 1, y: 2, player: 1 },
    description: 'winner solution'
  },
  {
    input: { currentPlayer: 1, board: [[0, -1, 1], [-1, 0, 0], [-1, -1, 1]] },
    expectedResult: { x: 1, y: 0, player: 1 },
    description: 'winner solution'
  },
  {
    input: { currentPlayer: 1, board: [[0, -1, 1], [-1, 0, 0], [0, 1, 1]] },
    expectedResult: { x: 1, y: 0, player: 1 },
    description: 'winner solution'
  },
];

describe('TicTacToe MinimaxSearch tests', () => {

  testSamples.forEach((sample) => {
    test(sample.description, () => {
      expect(tttSearch.makeDecision(sample.input)).toEqual(sample.expectedResult);
    });
  });

});
