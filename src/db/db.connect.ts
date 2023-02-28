import mongoose from 'mongoose';
import { config } from '../config';

const { user, passwd, cluster, collection } = config;

export const dbConnect = () => {
  const uri = `mongodb+srv://${user}:${passwd}@${cluster}/${collection}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
