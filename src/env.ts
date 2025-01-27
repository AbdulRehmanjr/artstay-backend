import { cleanEnv, str, port } from 'envalid';

export const env = cleanEnv(process.env, {
    PORT: port({ default: 3000 }),
    NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
    DATABASE_URL: str(),
    JWT_SECRET: str(),
    COOKIE_SECRET: str()
});