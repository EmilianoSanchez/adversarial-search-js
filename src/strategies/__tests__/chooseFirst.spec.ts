import { chooseFirstFactory } from '../chooseFirst';

const gameMock = { getActions: jest.fn(() => [0, 1, 2, 3]) };

test('chooseFirstFactory', () => {

  // @ts-expect-error gameMock is missing some properties from IGame
  const chooseFirst = chooseFirstFactory(gameMock);
  expect(chooseFirst.makeDecision({ currentPlayer: 0 })).toBe(0);

});
