import { IGame, IState, IStrategy } from '../types';

export function chooseFirstFactory<S extends IState, A>(game: IGame<S, A>): IStrategy<S, A> {
  return {
    game,
    makeDecision(state: S) {
      const actions = game.getActions(state);
      return actions.length ? actions[0] : undefined;
    }
  };
}