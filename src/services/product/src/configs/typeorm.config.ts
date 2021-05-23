import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv/config');

export const typeOrmConfig: TypeOrmModuleOptions = {
    "type": "mysql",
    "host": process.env.host,
    "port": Number(process.env.portmyql),
    "keepConnectionAlive": true,
    "username": process.env.mysqluser,
    "password": process.env.password,
    "database": process.env.database,
    "entities": ["dist/**/*.model{.ts,.js}"],
    "synchronize": true
};