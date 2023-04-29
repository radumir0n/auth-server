import { z } from 'zod';

const env = z.object({
    PORT: z.string(),
    DB_CONTAINER_NAME: z.string(),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
});

env.parse(process.env);

declare global {
    namespace NodeJS {
        interface ProcessEnv 
            extends z.infer<typeof env> {}
    }
}
