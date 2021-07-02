import { IGame, IState, IStrategy } from '../types';

export default class MinimaxSearch<S extends IState, A> implements IStrategy<S, A> {

  /**
   * Creates a new MinimaxSearch object for a given game.
   */
  constructor(public game: IGame<S, A>, private maxDepth = 5, private heuristic: (state: S) => number = () => 0.0) {
  }

  /**
   * Returns the action which appears to be the best at the given state.
   */
  makeDecision(state: S): A | undefined {
    let result;
    let resultValue = -Infinity;
    const playerId = this.game.getPlayer(state);
    this.game.getActions(state).forEach(action => {
      const value = this.minValue(this.game.getResult(state, action), playerId, 0);
      if (value > resultValue) {
        result = action;
        resultValue = value;
      }
    });
    return result;
  }

  // returns an utility value
  private minValue(state: S, playerId: number, depth: number) {
    if (this.game.isTerminal(state)) return this.game.getUtility(state, playerId);
    if (depth >= this.maxDepth) return this.heuristic(state);

    let value = +Infinity;
    this.game.getActions(state).forEach(action => {
      value = Math.min(value, this.maxValue(this.game.getResult(state, action), playerId, depth + 1));
    });
    return value;
  }

  // returns an utility value
  private maxValue(state: S, playerId: number, depth: number) {
    if (this.game.isTerminal(state)) return this.game.getUtility(state, playerId);
    if (depth >= this.maxDepth) return this.heuristic(state);

    let value = -Infinity;
    this.game.getActions(state).forEach(action => {
      value = Math.max(value, this.minValue(this.game.getResult(state, action), playerId, depth + 1));
    });
    return value;
  }
}
