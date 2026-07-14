import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

function parseDatabaseUrl(url: string): DataSourceOptions {
  const parsed = new URL(url);
  return {
    type: 'postgres',
    host: parsed.hostname,
    port: parseInt(parsed.port, 10) || 5432,
    username: parsed.username,
    password: parsed.password,
    database: parsed.pathname.slice(1),
    ssl: { rejectUnauthorized: false },
  };
}

const url = process.env.DATABASE_URL;

const baseOptions: Omit<DataSourceOptions, 'type' | 'host' | 'port' | 'username' | 'password' | 'database' | 'ssl'> = {
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
};

export const dataSourceOptions: DataSourceOptions = url
  ? { ...parseDatabaseUrl(url), ...baseOptions }
  : {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'sola_scriptura',
      password: process.env.DB_PASSWORD || 'sola_scriptura',
      database: process.env.DB_NAME || 'sola_scriptura',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      ...baseOptions,
    };

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
