import { EntityManager } from '@mikro-orm/mysql';
import { Customer, CustomerId } from '../../../domain/entities/customer.entity';
import { ICustomerRepository } from '../../../../events/domain/repositories/customer-repository.interface';

export class CustomerMysqlRepository implements ICustomerRepository {
  constructor(private entityManager: EntityManager) {}

  async add(entity: Customer): Promise<void> {
    this.entityManager.persist(entity);
  }

  async findById(id: string | CustomerId): Promise<Customer | null> {
    return this.entityManager.findOne(Customer, {
      id: typeof id === 'string' ? new CustomerId(id) : id,
    });
  }

  async findAll(): Promise<Customer[]> {
    return this.entityManager.find(Customer, {});
  }

  async delete(entity: Customer): Promise<void> {
    this.entityManager.remove(entity);
  }
}
