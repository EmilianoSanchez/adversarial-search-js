import { IGame, IState, IStrategy } from './types';

export default class MinimaxSearch<S extends IState, A> implements IStrategy<S, A> {

  /**
   * Creates a new MinimaxSearch object for a given game.
   */
  constructor(private game: IGame<S, A>, private maxDepth = 5, private heuristic = (state: S) => 0.5) {
  }

  /**
   * Returns the action which appears to be the best at the given state.
   */
  makeDecision(state: S) {
    let result = undefined;
    let resultValue = -Infinity;
    let playerId = this.game.getPlayer(state);
    for (let action of this.game.getActions(state)) {
      let value = this.minValue(this.game.getResult(state, action), playerId, 0);
      if (value > resultValue) {
        result = action;
        resultValue = value;
      }
    }
    return result;
  }

  // returns an utility value
  private minValue(state: S, playerId: number, depth: number) {
    if (this.game.isTerminal(state)) return this.game.getUtility(state, playerId);
    if (depth >= this.maxDepth) return this.heuristic(state);

    let value = +Infinity;
    for (let action of this.game.getActions(state))
      value = Math.min(value,
        this.maxValue(this.game.getResult(state, action), playerId, depth + 1));
    return value;
  }

  // returns an utility value
  private maxValue(state: S, playerId: number, depth: number) {
    if (this.game.isTerminal(state)) return this.game.getUtility(state, playerId);
    if (depth >= this.maxDepth) return this.heuristic(state);

    let value = -Infinity;
    for (let action of this.game.getActions(state))
      value = Math.max(value,
        this.minValue(this.game.getResult(state, action), playerId, depth + 1));
    return value;
  }
}
