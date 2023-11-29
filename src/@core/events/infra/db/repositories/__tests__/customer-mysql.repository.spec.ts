import { MikroORM, MySqlDriver } from '@mikro-orm/mysql';
import { CustomerSchema } from '../../schemas';
import { Customer } from '../../../../domain/entities/customer.entity';
import { CustomerMysqlRepository } from '../customer-mysql.repository';

test('customer repository', async () => {
  const orm = await MikroORM.init<MySqlDriver>({
    entities: [CustomerSchema],
    dbName: 'events',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    type: 'mysql',
    forceEntityConstructor: true,
  });

  await orm.schema.refreshDatabase();
  const em = orm.em.fork();

  const customerRepo = new CustomerMysqlRepository(em);

  const customer = Customer.create({ name: 'Customer 1', cpf: '973.025.420-66' });
  customerRepo.add(customer);

  await em.flush();
  await em.clear();

  let customerFound = await customerRepo.findById(customer.id);
  expect(customerFound.id.equals(customer.id)).toBeTruthy();
  expect(customerFound.name).toBe(customer.name);

  customer.changeName('Customer 2');
  await customerRepo.add(customer);
  await em.flush();
  await em.clear();

  customerFound = await customerRepo.findById(customer.id);
  expect(customerFound.id.equals(customer.id)).toBeTruthy();
  expect(customerFound.name).toBe(customer.name);
  expect(customerFound.cpf.value).toBe('97302542066')

  console.log(await customerRepo.findAll());

  customerRepo.delete(customer);
  await em.flush();
  await em.clear();

  console.log(await customerRepo.findAll());
  await orm.close();
});
