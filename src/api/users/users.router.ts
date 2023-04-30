import { Router } from 'express';

import { 
    getUsers,
    getUser, 
    registerUser,
    loginUser,
    editUser, 
    deleteUser, 
} from './users.handler';

export const usersRouter = Router();

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', getUser);
usersRouter.post('/users/register', registerUser)
usersRouter.post('/users/login', loginUser)
usersRouter.patch('/users/:id', editUser);
usersRouter.delete('/users/:id', deleteUser);
