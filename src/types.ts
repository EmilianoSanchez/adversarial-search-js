// @TODO if `P` of number type is the only use case, remove generic `P`
export interface IState<P = number> {
  currentPlayer: P
}

/**
 * @param <S> Type which is used for states in the game.
 * @param <A> Type which is used for actions in the game.
 * @param <P> Type which is used for players in the game. `number` is the default is a simple id of players
 */
export interface IGame<S extends IState<P>, A, P = number> {
  getInitialState(): S
  getPlayers(): P[]
  getPlayer(state: S): P
  getActions(state: S): A[]
  getResult(state: S, action: A): S
  isTerminal(state: S): boolean
  getUtility(state: S, player: P): number
}

export interface IStrategy<S extends IState<any>, A> {
  makeDecision(state: S): A | undefined
}

export interface IGameObject<S extends IState<P>, A, P = number> {
  initialState: S
  players: P[]
  actionFunction: (state: S) => A[]
  resultFunction: (state: S, action: A) => S
  terminalTest: (state: S) => boolean
  utilityFunction: (state: S, player: P) => number
}
