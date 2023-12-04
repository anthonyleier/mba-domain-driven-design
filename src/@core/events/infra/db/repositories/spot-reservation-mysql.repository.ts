import { EntityManager } from '@mikro-orm/mysql';
import { EventSpotId } from '../../../../events/domain/entities/event-spot';
import { SpotReservation } from '../../../../events/domain/entities/spot-reservation.entity';
import { ISpotReservationRepository } from '../../../../events/domain/repositories/spot-reservation-repository.interface';

export class SpotReservationMysqlRepository
  implements ISpotReservationRepository
{
  constructor(private entityManager: EntityManager) {}

  async add(entity: SpotReservation): Promise<void> {
    this.entityManager.persist(entity);
  }

  async findById(spot_id: string | EventSpotId): Promise<SpotReservation | null> {
    return this.entityManager.findOne(SpotReservation, {
      spot_id: typeof spot_id === 'string' ? new EventSpotId(spot_id) : spot_id,
    });
  }

  async findAll(): Promise<SpotReservation[]> {
    return this.entityManager.find(SpotReservation, {});
  }

  async delete(entity: SpotReservation): Promise<void> {
    this.entityManager.remove(entity);
  }
}
