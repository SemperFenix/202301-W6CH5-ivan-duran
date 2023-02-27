import { Router as router } from 'express';
import { ScrubsController } from '../controllers/scrubs.controller.js';
import { ScrubsFileRepo } from '../repository/scrubs.file.repo.js';

export const scrubsRouter = router();
export const repo = new ScrubsFileRepo();
const controller = new ScrubsController(repo);

scrubsRouter.get('/', controller.getAll.bind(controller));
scrubsRouter.get('/:id', controller.getById.bind(controller));
scrubsRouter.post('/', controller.post.bind(controller));
scrubsRouter.patch('/:id', controller.patch.bind(controller));
scrubsRouter.delete('/:id', controller.delete.bind(controller));
