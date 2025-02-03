import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';

export const getMongoDbConfig = (configService: ConfigService) => ({
  uri: configService.get<string>('MONGO_URI'),
  onConnectionCreate: (connection: Connection) => {
    connection.on('connected', () => console.log('Database connected'));
    connection.on('disconnected', () => console.log('Database disconnected'));

    return connection;
  },
});
