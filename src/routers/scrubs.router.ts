import { Router as router } from 'express';
import { ScrubsController } from '../controllers/scrubs.controller.js';
import { ScrubsMongoRepo } from '../repository/scrubs.mongo.repo.js';

// Se puede añadir la inyección de dependencias en el repo del modelo.

export const scrubsRouter = router();
export const repo = new ScrubsMongoRepo();
const controller = new ScrubsController(repo);

scrubsRouter.get('/', controller.getAll.bind(controller));
scrubsRouter.get('/:id', controller.getById.bind(controller));
scrubsRouter.post('/', controller.post.bind(controller));
scrubsRouter.patch('/:id', controller.patch.bind(controller));
scrubsRouter.delete('/:id', controller.delete.bind(controller));
