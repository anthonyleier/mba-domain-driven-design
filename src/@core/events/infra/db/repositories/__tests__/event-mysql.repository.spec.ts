import { MikroORM, MySqlDriver } from '@mikro-orm/mysql';
import {
  EventSchema,
  EventSectionSchema,
  EventSpotSchema,
  PartnerSchema,
} from '../../schemas';
import { Partner } from '../../../../domain/entities/partner.entity';
import { EventMysqlRepository } from '../event-mysql.repository';
import { PartnerMysqlRepository } from '../partner-mysql.repository';

test('event repository', async () => {
  const orm = await MikroORM.init<MySqlDriver>({
    entities: [EventSchema, EventSectionSchema, EventSpotSchema, PartnerSchema],
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

  const eventRepo = new EventMysqlRepository(em);
  const partnerRepo = new PartnerMysqlRepository(em);

  const partner = Partner.create({ name: 'Partner 1' });
  await partnerRepo.add(partner);

  const event = partner.initEvent({
    name: 'Event 1',
    date: new Date(),
    description: 'Event 1 Description',
  });
  await eventRepo.add(event);
  await em.flush();

  await orm.close();
});
