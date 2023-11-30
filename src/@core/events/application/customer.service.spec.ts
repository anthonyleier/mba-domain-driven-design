import { MikroORM } from '@mikro-orm/core';
import { CustomerSchema } from '../infra/db/schemas';
import { MySqlDriver } from '@mikro-orm/mysql';
import { CustomerMysqlRepository } from '../infra/db/repositories/customer-mysql.repository';
import { CustomerService } from './customer.service';
import { Customer } from '../domain/entities/customer.entity';

test('Deve listar os customers', async () => {
  const orm = await MikroORM.init<MySqlDriver>({
    entities: [CustomerSchema],
    dbName: 'events',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    type: 'mysql',
    forceEntityConstructor: true,
    debug: true,
  });

  await orm.schema.refreshDatabase();
  const em = orm.em.fork();

  const customerRepo = new CustomerMysqlRepository(em);
  const customerService = new CustomerService(customerRepo);

  const customer = Customer.create({
    name: 'Customer 1',
    cpf: '958.723.770-61',
  });
  await customerRepo.add(customer);

  await em.flush();
  await em.clear();

  const customers = await customerService.list();
  console.log(customers);

  await orm.close();
});

test('Deve registrar um customer', async () => {
  const orm = await MikroORM.init<MySqlDriver>({
    entities: [CustomerSchema],
    dbName: 'events',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    type: 'mysql',
    forceEntityConstructor: true,
    debug: true,
  });

  await orm.schema.refreshDatabase();
  const em = orm.em.fork();

  const customerRepo = new CustomerMysqlRepository(em);
  const customerService = new CustomerService(customerRepo);

  const customer = customerService.register({
    name: 'Roberto',
    cpf: '625.987.420-01',
  });

  await orm.close();
});
