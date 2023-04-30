export interface AppUser {
    id: string,
    email: string,
    username: string,
    password: string,
    updatedAt: Date
}

export type UserCreation = Omit<AppUser, 'id' | 'updatedAt'>;
export type UserUpdate = Omit<AppUser, 'password' | 'updatedAt'>;
export type UserCredentials = Omit<AppUser, 'id' | 'email' | 'updatedAt'>;
