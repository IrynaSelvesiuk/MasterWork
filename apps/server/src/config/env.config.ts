import { Environment } from 'src/enums/env.enum';

const configuration = () => ({
  port: Number(process.env.PORT),

  nodeEnv: process.env.NODE_ENV === Environment.DEVELOPMENT,

  database: {
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },

  hash: {
    salt: Number(process.env.SALT_ROUNDS),
  },
});

export default configuration;
export type ConfigType = ReturnType<typeof configuration>;
