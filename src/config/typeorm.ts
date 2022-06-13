import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Currencies } from '../currencies/currencies.entity';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb+srv://mongo:mongopass@cluster0.es145.mongodb.net/exchange?retryWrites=true&w=majority',
  entities: [Currencies],
  synchronize: true,
  autoLoadEntities: true,
  useUnifiedTopology: true,
};
