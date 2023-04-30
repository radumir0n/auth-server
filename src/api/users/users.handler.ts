import { NextFunction, Request, Response } from 'express';
import { createJWT } from '../../middlewares/auth';

import { UserCreation, UserCredentials, UserUpdate } from '../../models/user';
import { 
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUserById,
    authenticateUser
} from './users.service';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ users })
    } catch (err) {
        return next(err);
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await getUserById(id);
    
        res.status(200).json({ user })
    } catch (err) {
        return next(err);
    }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser: UserCreation = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };
        const user = await createUser(newUser);
        const token = createJWT(user);
    
        res.status(201).json({ user, token });
    } catch (err) {
        return next(err);
    }
};

export const editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedUser: UserUpdate = {
            id: req.params.id,
            username: req.body.username,
            email: req.body.email
        };
        const user = await updateUser(updatedUser);

        res.status(200).json({ user });
    } catch (err) {
        return next(err);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteUserById(req.params.id);

        res.status(204).json({ message: 'User has been deleted successfully' });
    } catch (err) {
        return next(err);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCredentials: UserCredentials = {
            username: req.body.username,
            password: req.body.password
        };
        const token = await authenticateUser(userCredentials);

        res.status(200).json({ token });
    } catch (err) {
        return next(err);
    }
}
