import { IGame, IState, IStrategy } from "./types";

class MinimaxSearch<S extends IState<P>, A, P> implements IStrategy<S, A> {

  /**
   * Creates a new MinimaxSearch object for a given game.
   */
  constructor(private game: IGame<S, A, P>) {
  }

  /**
 * Returns the action which appears to be the best at the given state.
 */
  makeDecision(state: S) {
    let result = undefined;
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
  private minValue(state: S, playerId: P) {
    if (this.game.isTerminal(state))
      return this.game.getUtility(state, playerId);
    let value = +Infinity;
    for (let action of this.game.getActions(state))
      value = Math.min(value,
        this.maxValue(this.game.getResult(state, action), playerId));
    return value;
  }

  // returns an utility value
  private maxValue(state: S, playerId: P) {
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
