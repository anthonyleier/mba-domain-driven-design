import Cpf from '../../../common/domain/value-objects/cpf.vo';
import { Customer, CustomerId } from '../customer.entity';

test('Deve criar um cliente', () => {
  const customer = Customer.create({
    name: 'João',
    cpf: '879.943.000-22',
  });
  console.log(customer);
  expect(customer).toBeInstanceOf(Customer);
  expect(customer.id).toBeDefined();
  expect(customer.id).toBeInstanceOf(CustomerId);
  expect(customer.name).toBe('João');
  expect(customer.cpf.value).toBe('87994300022');

  // Não é valido
  // customer = new Customer({
  //     id: '1234',
  //     name: 'João',
  //     cpf: '879.943.000-22',
  // });

  const customer2 = new Customer({
    id: new CustomerId(customer.id.value),
    name: 'Bruno',
    cpf: new Cpf('909.088.790-32'),
  });
  expect(customer.equals(customer2)).toBe(true);
});
