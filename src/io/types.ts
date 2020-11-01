export interface IPlayer<S, A> {
  makeDecision(currentState: S): Promise<A>
  notifyNewState(newState: S): Promise<void>
}
