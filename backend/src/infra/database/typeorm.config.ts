import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

const url = process.env.DATABASE_URL;

let dataSourceOptions: DataSourceOptions;

if (url) {
  const parsed = new URL(url);
  dataSourceOptions = {
    type: 'postgres',
    host: parsed.hostname,
    port: parseInt(parsed.port, 10) || 5432,
    username: parsed.username,
    password: parsed.password,
    database: parsed.pathname.slice(1),
    ssl: false,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
  };
} else {
  dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || 'sola_scriptura',
    password: process.env.DB_PASSWORD || 'sola_scriptura',
    database: process.env.DB_NAME || 'sola_scriptura',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
  };
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
