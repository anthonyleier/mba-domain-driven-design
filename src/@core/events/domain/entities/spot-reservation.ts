import { AggregateRoot } from 'src/@core/common/domain/aggregate-root';
import { CustomerId } from './customer.entity';
import { EventSpotId } from './event-spot';

export type SpotReservationCreateCommand = {
  spot_id: EventSpotId | string;
  customer_id: CustomerId;
};

export type SpotReservationConstructorProps = {
  spot_id: EventSpotId | string;
  customer_id: CustomerId;
  reservation_date: Date;
};

export class SpotReservation extends AggregateRoot {
  spot_id: EventSpotId;
  customer_id: CustomerId;
  reservation_date: Date;

  constructor(props: SpotReservationConstructorProps) {
    super();
    this.spot_id =
      props.spot_id instanceof EventSpotId
        ? props.spot_id
        : new EventSpotId(props.spot_id);

    this.customer_id =
      props.customer_id instanceof CustomerId
        ? props.customer_id
        : new EventSpotId(props.customer_id);

    this.reservation_date = props.reservation_date;
  }

  static create(command: SpotReservationCreateCommand) {
    return new SpotReservation({
      spot_id: command.spot_id,
      customer_id: command.customer_id,
      reservation_date: new Date(),
    });
  }

  changeReservation(customer_id: CustomerId) {
    this.customer_id = customer_id;
    this.reservation_date = new Date();
  }

  toJSON() {
    return {
      spot_id: this.spot_id.value,
      customer_id: this.customer_id.value,
      reservation_date: this.reservation_date,
    };
  }
}