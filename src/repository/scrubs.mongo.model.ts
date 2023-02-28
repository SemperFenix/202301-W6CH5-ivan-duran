import { model, Schema, SchemaTypes } from 'mongoose';
import { Scrub } from '../entities/scrub.model.js';

const scrubSchema = new Schema<Scrub>({
  name: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  img: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  occupattion: {
    type: SchemaTypes.String,
    required: true,
    unique: false,
  },
  personality: {
    type: SchemaTypes.String,
    required: true,
  },
  extendPerso: {
    type: SchemaTypes.String,
    required: true,
  },
});

export const ScrubModel = model('Scrub', scrubSchema, 'scrubs');
