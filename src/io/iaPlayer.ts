import MinimaxSearch from '../strategies/minimaxSearch';
import { IState, IGame, IStrategy, IPlayer } from '../types';

export default class IAPlayer<S extends IState, A> implements IPlayer<S, A> {

  constructor(private game: IGame<S, A>, private algorithm: IStrategy<S, A> = new MinimaxSearch(game)) {
  }

  makeDecision(state: S): Promise<A> {
    return new Promise((res) => {
      const action = this.algorithm.makeDecision(state);
      res(action);
    })
  }
  notifyNewState(newState: S) {
    // no-operation
    return Promise.resolve();
  }

}