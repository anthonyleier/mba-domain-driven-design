import { IUnitOfWork } from '../../common/application/unit-of-work.interface';
import { IOrderRepository } from '../domain/repositories/order-repository.interface';

export class OrderService {
  constructor(
    private orderRepo: IOrderRepository,
    private uow: IUnitOfWork,
  ) {}

  list() {
    return this.orderRepo.findAll();
  }

  async create(input: { name: string; cpf: string }) {}
}
