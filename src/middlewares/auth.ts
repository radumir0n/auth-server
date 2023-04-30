import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 5);
};

export const comparePassword = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

export const createJWT = ({ id, username }: any) => {
    const token = jwt.sign(
        {
            id,
            username,
        },
        process.env.JWT_SECRET || 'fallback',
    );

    return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.json({ message: 'Not Authorized!' });

        return;
    }

    if (bearer.toLowerCase().includes('bearer')) {
        const [, token] = bearer.split(' ');

        if (!token) {
            res.status(401);
            res.json({ message: 'Invalid token!' });

            return;
        }

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET || 'fallback');
            req.body = user;

            next();
        } catch (e: unknown) {
            res.status(401);
            res.json({ message: 'Not Authorized!', error: e });
            throw e;
        }
    } else {
        res.status(401);
        res.json({ message: 'Missing "Bearer" in token!' });

        return;
    }
};
