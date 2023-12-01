import { IRepository } from '../../../common/domain/repository-interface';
import { SpotReservation } from '../entities/spot-reservation';

export interface ISpotReservationRepository
  extends IRepository<SpotReservation> {}
