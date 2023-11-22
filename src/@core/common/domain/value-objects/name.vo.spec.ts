import { Name } from './name.vo';

test('Deve criar um nome válido', () => {
  const name = new Name('Anthony');
  expect(name.value).toBe('Anthony');
});
