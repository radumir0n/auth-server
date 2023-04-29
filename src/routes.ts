import { Router } from 'express';

import { usersRouter } from './api/users/users.router';

export const routes = Router();

routes.use(usersRouter);