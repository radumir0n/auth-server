import { dataSource } from '../../db/data-source';
import { User } from '../../db/entities/user';
import { comparePassword, createJWT, hashPassword } from '../../middlewares/auth';
import { AppUser, UserCreation, UserCredentials, UserUpdate } from '../../models/user';

const CREDENTIALS_MIN_LENGTH = 6;

export const getUserById = async (id: string): Promise<AppUser> => {
    const user = await dataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .select('user')
        .where('user.id = :id', { id })
        .getOne();

    return user as AppUser;
}

export const getUserByUsername = async (username: string): Promise<AppUser> => {
    const user = await dataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .select('user')
        .where('user.username = :username', { username })
        .getOne();

    return user as AppUser;
}

export const getAllUsers = async (): Promise<AppUser[]> => {
    const users: AppUser[] = await dataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .getMany();
    
    return users;
}

export const createUser = async (user: UserCreation): Promise<AppUser> => {
    const { email, username, password } = user;
    const hashedPasword = await hashPassword(password);

    if (username.length < CREDENTIALS_MIN_LENGTH) {
        throw new Error('Username is not valid');
    }

    if (password.length < CREDENTIALS_MIN_LENGTH) {
        throw new Error('Password is not valid');
    }

    if (await getUserByUsername(username)) {
        throw new Error('Username is taken');
    }

    const id = await dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
            email,
            username,
            password: hashedPasword,
        })
        .execute();

    return await getUserById(id.raw[0].id);
}

export const updateUser = async (user: UserUpdate): Promise<AppUser> => {
    const { id, email, username } = user;

    if (!(await getUserById(id))) {
        throw new Error('Username is taken');
    }

    if (username.length < CREDENTIALS_MIN_LENGTH) {
        throw new Error('Username is not valid');
    }

    await dataSource
        .createQueryBuilder()
        .update(User)
        .set({ username, email })
        .where("id = :id", { id })
        .execute()

    return await getUserById(id);
}

export const deleteUserById = async (id: string): Promise<void> => {
    await dataSource
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id })
        .execute()
}

export const authenticateUser = async (userCredentials: UserCredentials): Promise<string> => {
    const { username, password } = userCredentials;
    const user = await getUserByUsername(username);
    console.log("TEST::: ", user)
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
        throw new Error('Password not valid');
    }

    const token = createJWT(user);
    
    return token;
}