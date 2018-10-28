class MinimaxSearch {

  /**
   * Creates a new MinimaxSearch object for a given game.
   */
  constructor(game) {
    this.game = game;
  }

  /**
 * Returns the action which appears to be the best at the given state.
 */
  makeDecision(state) {
    let result = null;
    let resultValue = -Infinity;
    let playerId = this.game.getPlayer(state);
    for (let action of this.game.getActions(state)) {
      let value = this.minValue(this.game.getResult(state, action), playerId);
      if (value > resultValue) {
        result = action;
        resultValue = value;
      }
    }
    return result;
  }

  // returns an utility value
  minValue(state, playerId) {
    if (this.game.isTerminal(state))
      return this.game.getUtility(state, playerId);
    let value = +Infinity;
    for (let action of this.game.getActions(state))
      value = Math.min(value,
        this.maxValue(this.game.getResult(state, action), playerId));
    return value;
  }

  // returns an utility value
  maxValue(state, playerId) {
    if (this.game.isTerminal(state))
      return this.game.getUtility(state, playerId);
    let value = -Infinity;
    for (let action of this.game.getActions(state))
      value = Math.max(value,
        this.minValue(this.game.getResult(state, action), playerId));
    return value;
  }
}

export default MinimaxSearch;
