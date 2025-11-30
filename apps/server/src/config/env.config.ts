import { Environment } from '../enums/env.enum';

const configuration = () => ({
  port: Number(process.env.PORT),

  nodeEnv: process.env.NODE_ENV === Environment.DEVELOPMENT,

  frontEndUrl: process.env.FRONT_END_URL,

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

  jwt: {
    accessSecret: process.env.ACCESS_SECRET,
    accessExpiresIn: process.env.ACCESS_EXPIRES_IN,

    refreshSecret: process.env.REFRESH_SECRET,
    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN,
  },
});

export default configuration;
export type ConfigType = ReturnType<typeof configuration>;
