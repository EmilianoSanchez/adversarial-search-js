/** Core and IA */

export interface IState {
  currentPlayer: number
}

/**
 * @param <S> Type which is used for states in the game.
 * @param <A> Type which is used for actions in the game.
 */
export interface IGame<S extends IState, A> {
  getInitialState(): S
  getNumPlayers(): number
  getPlayer(state: S): number
  getActions(state: S): A[]
  getResult(state: S, action: A): S
  isTerminal(state: S): boolean
  getUtility(state: S, player: number): number
}

export interface IStrategy<S extends IState, A> {
  game: IGame<S, A>
  makeDecision(state: S): A | undefined
}

export interface IGameObject<S extends IState, A> {
  initialState: S
  numPlayers: number
  actionFunction: (state: S) => A[]
  resultFunction: (state: S, action: A) => S
  terminalTest: (state: S) => boolean
  utilityFunction: (state: S, player: number) => number
}

/** Input/Output */

export interface IPlayer<S, A> {
  makeDecision(currentState: S): Promise<A>
  notifyNewState(newState: S): Promise<void>
}
