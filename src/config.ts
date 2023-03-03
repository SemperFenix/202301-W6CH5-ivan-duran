import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

export const config = {
  user: process.env.DB_USER,
  passwd: process.env.DB_PASSWORD,
  cluster: process.env.DB_CLUSTER,
  collection: process.env.DB_NAME,
  secret: process.env.SECRET,
};

// Esto devuelve la carpeta del SO en la que estamos en forma de string
export const _dirname = path.dirname(fileURLToPath(import.meta.url));
