import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '@/config';

export default async (cs): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURL(cs), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
};
