import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';

export const getMongoDbConfig = (configService: ConfigService) => ({
  uri: configService.get<string>('MONGO_URI'),
  onConnectionCreate: (connection: Connection) => {
    connection.on('connected', () => console.log('MongoDB connected'));
    connection.on('disconnected', () => console.log('MongoDB disconnected'));

    return connection;
  },
});
