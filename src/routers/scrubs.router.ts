import { Router as router } from 'express';
import { ScrubsController } from '../controllers/scrubs.controller.js';
import { logged } from '../interceptors/logged.js';
import { ScrubsMongoRepo } from '../repository/scrubs.mongo.repo.js';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';

// Se puede añadir la inyección de dependencias en el repo del modelo.

export const scrubsRouter = router();
const scrubRepo = new ScrubsMongoRepo();
const userRepo = new UsersMongoRepo();
const controller = new ScrubsController(scrubRepo, userRepo);

scrubsRouter.get('/', controller.getAll.bind(controller));
scrubsRouter.get('/:id', controller.getById.bind(controller));
scrubsRouter.post('/', logged, controller.post.bind(controller));
scrubsRouter.patch('/:id', logged, controller.patch.bind(controller));
scrubsRouter.delete('/:id', logged, controller.delete.bind(controller));
