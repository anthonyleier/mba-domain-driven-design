import { EventSection } from '../event-section';
import { EventSpot } from '../event-spot';
import { Event } from '../event.entity';
import { PartnerId } from '../partner.entity';

test('Deve criar um evento', () => {
  const event = Event.create({
    name: 'Evento 1',
    description: 'Descrição do evento 1',
    date: new Date(),
    partner_id: new PartnerId(),
  });

  const section = EventSection.create({
    name: 'Sessão 1',
    description: 'Descrição da sessão 1',
    total_spots: 100,
    price: 1000,
  });

  const spot = EventSpot.create();

  section.spots.add(spot);
  event.sections.add(section);

  console.dir(event.toJSON(), {depth: 10});
});
