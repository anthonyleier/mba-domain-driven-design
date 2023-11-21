import { Customer } from 'src/@core/domain/entities/customer.entity';
import { Name } from './name.vo';

test('Deve criar um nome válido', () => {
  const name = new Name('Anthony');
  expect(name.value).toBe('Anthony');

  const customer = new Customer({
    cpf: '111.222.333-44',
    name,
  });

  // customer.name.value = 'Bruno'; // Não fazer
  customer.name = new Name('Bruno');
});
