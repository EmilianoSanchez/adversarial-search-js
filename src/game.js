class Game {

  constructor(initialState, players, actionFunction, resultFunction, terminalTest, utilityFunction) {
    this.initialState = initialState;
    this.players = players;
    this.actionFunction = actionFunction;
    this.resultFunction = resultFunction;
    this.terminalTest = terminalTest;
    this.utilityFunction = utilityFunction;
  }

  static create(game) {
    return new Game(game.initialState, game.players, game.actionFunction, game.resultFunction, game.terminalTest, game.utilityFunction);
  }

  getInitialState() {
    return this.initialState;
  }

  getPlayers() {
    return this.players;
  }

  getPlayer(state) {
    return state.currentPlayer;
  }

  getActions(state) {
    return this.actionFunction(state);
  }

  getResult(state, action) {
    return this.resultFunction(state, action);
  }

  isTerminal(state) {
    return this.terminalTest(state);
  }

  getUtility(state, player) {
    return this.utilityFunction(state, player);
  }
}

export default Game;
