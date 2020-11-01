import { IGame, IState, IStrategy } from "../types";

export function chooseRandomFactory<S extends IState, A>(game: IGame<S, A>): IStrategy<S, A> {
  return {
    game,
    makeDecision(state: S) {
      const actions = game.getActions(state);
      return actions.length ? actions[Math.floor(Math.random() * actions.length)] : undefined;
    }
  }

}