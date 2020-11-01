import { IGame, IGameObject, IState } from './types';

export default class Game<S extends IState, A> implements IGameObject<S, A>, IGame<S, A> {

  constructor(
    public initialState: S,
    public numPlayers: number,
    public actionFunction: (state: S) => A[],
    public resultFunction: (state: S, action: A) => S,
    public terminalTest: (state: S) => boolean,
    public utilityFunction: (state: S, player: number) => number) {
  }

  static create<S extends IState, A, P>(game: IGameObject<S, A>) {
    return new Game(game.initialState, game.numPlayers, game.actionFunction, game.resultFunction, game.terminalTest, game.utilityFunction);
  }

  getInitialState() {
    return this.initialState;
  }

  getNumPlayers() {
    return this.numPlayers;
  }

  getPlayer(state: S) {
    return state.currentPlayer;
  }

  getActions(state: S): A[] {
    return this.actionFunction(state);
  }

  getResult(state: S, action: A): S {
    return this.resultFunction(state, action);
  }

  isTerminal(state: S): boolean {
    return this.terminalTest(state);
  }

  getUtility(state: S, player: number) {
    return this.utilityFunction(state, player);
  }
}
