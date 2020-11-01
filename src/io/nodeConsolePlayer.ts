import readline from 'readline';
import { IState, IGame } from '../types';
import { IPlayer } from './types';

export default abstract class NodeConsolePlayer<S extends IState, A> implements IPlayer<S, A> {

  private rl: readline.Interface;

  constructor(protected game: IGame<S, A>) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  makeDecision(state: S): Promise<A> {
    return new Promise((res) => {
      const actions = this.game.getActions(state);
      this.printActionsToChoose(actions);

      this.rl.question("Choose action by index? ", (input: string) => {
        let index = 0;
        try {
          index = parseInt(input);
          if (isNaN(index) || index < 0 || index >= actions.length) throw new Error();
        } catch (e) {
          index = 0;
          console.log('invalid input. Defaulting to action 0.')
        }
        res(actions[index]);
      });
    });
  }

  abstract printActionsToChoose(actions: A[]): void

  notifyNewState(newState: S): Promise<void> {
    return new Promise(() => {
      this.printNewState(newState);
    });
  }

  abstract printNewState(state: S): void
}
