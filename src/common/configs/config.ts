import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      server: process.env.DATABASE_SERVER,
      password: process.env.DATABASE_PASSWORD,
      user: process.env.DATABASE_USER,
      port: process.env.DATABASE_PORT,
    },
    jwtSecret: process.env.JWT_SECRET,
    portApp: process.env.PORT_APP,
  };
});