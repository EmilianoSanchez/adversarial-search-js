import { IGame, IState, IPlayer } from '../types';

export default async function runGame<S extends IState, A, TGame extends IGame<S, A>, TPlayer extends IPlayer<S, A>>(game: TGame, players: TPlayer[]) {

  let currentState = game.getInitialState();

  while (!game.isTerminal(currentState)) {
    await players.map(player => player.notifyNewState(currentState));

    let chosenAction = await players[currentState.currentPlayer].makeDecision(currentState);

    currentState = game.getResult(currentState, chosenAction);
  }

  console.log(`Game ended. Results:`);
  for (let p = 0; p < game.getNumPlayers(); p++) console.log(`Utility of player ${p}: ${game.getUtility(currentState, p)}`)

  await players.map(player => player.notifyNewState(currentState));

}
