import { EntityManager } from '@mikro-orm/mysql';
import { EventSpotId } from 'src/@core/events/domain/entities/event-spot';
import { SpotReservation } from 'src/@core/events/domain/entities/spot-reservation';
import { ISpotReservationRepository } from 'src/@core/events/domain/repositories/spot-reservation-repository';

export class SpotReservationMysqlRepository
  implements ISpotReservationRepository
{
  constructor(private entityManager: EntityManager) {}

  async add(entity: SpotReservation): Promise<void> {
    this.entityManager.persist(entity);
  }

  async findById(id: string | EventSpotId): Promise<SpotReservation | null> {
    return this.entityManager.findOne(SpotReservation, {
      id: typeof id === 'string' ? new EventSpotId(id) : id,
    });
  }

  async findAll(): Promise<SpotReservation[]> {
    return this.entityManager.find(SpotReservation, {});
  }

  async delete(entity: SpotReservation): Promise<void> {
    this.entityManager.remove(entity);
  }
}
