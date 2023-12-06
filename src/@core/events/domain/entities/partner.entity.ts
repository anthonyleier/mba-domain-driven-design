import { AggregateRoot } from '../../../common/domain/aggregate-root';
import Uuid from '../../../common/domain/value-objects/uuid.vo';
import { PartnerChangedName } from '../domain-events/partner-changed-name';
import { PartnerCreated } from '../domain-events/partner-created.event';
import { Event } from './event.entity';

export class PartnerId extends Uuid {}

export type PartnerConstructorProps = {
  id?: PartnerId | string;
  name: string;
};

export type InitEventCommand = {
  name: string;
  description?: string | null;
  date: Date;
};

export class Partner extends AggregateRoot {
  id: PartnerId;
  name: string;

  constructor(props: PartnerConstructorProps) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new PartnerId(props.id)
        : props.id ?? new PartnerId();
    this.name = props.name;
  }

  static create(command: { name: string }) {
    const partner = new Partner({
      name: command.name,
    });

    partner.addEvent(new PartnerCreated(partner.id, partner.name));
    // disparar o evento ou apenas registrar o evento?
    // registrar o evento e disparar depois é mais controlado

    return partner;
  }

  initEvent(command: InitEventCommand) {
    return Event.create({
      ...command,
      partner_id: this.id,
    });
  }

  changeName(name: string) {
    this.name = name;
    this.addEvent(new PartnerChangedName(this.id, this.name));
  }

  toJSON() {
    return {
      id: this.id.value,
      name: this.name,
    };
  }
}
