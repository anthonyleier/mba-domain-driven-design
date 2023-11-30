// event - agregado
//     sections - basico, camarote, vip (preço)
//         spots - tá reservado?, localização

import { AggregateRoot } from '../../../common/domain/aggregate-root';
import Uuid from '../../../common/domain/value-objects/uuid.vo';
import { PartnerId } from './partner.entity';
import { EventSection } from './event-section';
import {
  AnyCollection,
  ICollection,
  MyCollectionFactory,
} from 'src/@core/common/domain/my-collection';

export class EventId extends Uuid {}

export type AddSectionCommand = {
  name: string;
  description?: string | null;
  total_spots: number;
  price: number;
};

export type EventCreateCommand = {
  name: string;
  description?: string | null;
  date: Date;
  partner_id: PartnerId | string;
};

export type EventConstructorProps = {
  id?: EventId | string;
  name: string;
  description: string | null;
  date: Date;
  is_published: boolean;

  total_spots: number;
  total_spots_reserved: number;
  partner_id: PartnerId | string;
};

export class Event extends AggregateRoot {
  id: EventId;
  name: string;
  description: string | null;
  date: Date;
  is_published: boolean; // Desativar vendas, caso necessário
  private _sections: ICollection<EventSection>; // Array normal? E se tiver seções repetidas?

  total_spots: number;
  total_spots_reserved: number;
  partner_id: PartnerId;

  constructor(props: EventConstructorProps) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new EventId(props.id)
        : props.id ?? new EventId();

    this.name = props.name;
    this.description = props.description;
    this.date = props.date;
    this.is_published = props.is_published;
    this.total_spots = props.total_spots;
    this.total_spots_reserved = props.total_spots_reserved;

    this.partner_id =
      props.partner_id instanceof PartnerId
        ? props.partner_id
        : new PartnerId(props.partner_id);

    this._sections = MyCollectionFactory.create<EventSection>(this);
  }

  static create(command: EventCreateCommand) {
    return new Event({
      ...command,
      description: command.description ?? null,
      is_published: false,
      total_spots: 0,
      total_spots_reserved: 0,
    });
  }

  changeName(name: string) {
    this.name = name;
  }

  changeDescription(description: string | null) {
    this.description = description;
  }

  changeDate(date: Date) {
    this.date = date;
  }

  publish() {
    this.is_published = true;
  }

  unPublish() {
    this.is_published = false;
  }

  publishAll() {
    this.publish();
    this._sections.forEach((section) => section.publishAll());
  }

  addSection(command: AddSectionCommand) {
    const section = EventSection.create(command);
    this._sections.add(section);
    this.total_spots += section.total_spots;
  }

  get sections(): ICollection<EventSection> {
    return this._sections as ICollection<EventSection>;
  }

  set sections(sections: AnyCollection<EventSection>) {
    this._sections = MyCollectionFactory.create<EventSection>(sections);
  }

  toJSON() {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
      date: this.date,
      is_published: this.is_published,
      total_spots: this.total_spots,
      total_spots_reserved: this.total_spots_reserved,
      partner_id: this.partner_id,
      _sections: [...this._sections].map((section) => section.toJSON()),
    };
  }
}

// Dependendo da biblioteca de banco, não é necessário
// class EventMapper {
//   static toDomain(raw: any): Event {
//     return;
//   }

//   static toPersistence(event: Event): any {
//     return;
//   }
// }
