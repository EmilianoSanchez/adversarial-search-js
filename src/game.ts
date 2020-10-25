import { IGame, IGameObject, IState } from './types';

class Game<S extends IState<P>, A, P> implements IGameObject<S, A, P>, IGame<S, A, P> {

  constructor(
    public initialState: S,
    public players: P[],
    public actionFunction: (state: S) => A[],
    public resultFunction: (state: S, action: A) => S,
    public terminalTest: (state: S) => boolean,
    public utilityFunction: (state: S, player: P) => number) {
  }

  static create<S extends IState<P>, A, P>(game: IGameObject<S, A, P>) {
    return new Game(game.initialState, game.players, game.actionFunction, game.resultFunction, game.terminalTest, game.utilityFunction);
  }

  getInitialState() {
    return this.initialState;
  }

  getPlayers() {
    return this.players;
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

  getUtility(state: S, player: P) {
    return this.utilityFunction(state, player);
  }
}

export default Game;
