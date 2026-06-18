export interface EnvConfig {
  // Database
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;

  // Redis
  REDIS_HOST: string;
  REDIS_PORT: number;

  // Elasticsearch
  ES_HOST: string;

  // Neo4j
  NEO4J_URI: string;
  NEO4J_USER: string;
  NEO4J_PASSWORD: string;

  // RabbitMQ
  RABBITMQ_HOST: string;
  RABBITMQ_PORT: number;
  RABBITMQ_USER: string;
  RABBITMQ_PASSWORD: string;

  // OpenAI
  OPENAI_API_KEY: string;
  OPENAI_MODEL: string;
  OPENAI_EMBEDDING_MODEL: string;

  // MinIO / S3
  STORAGE_ENDPOINT: string;
  STORAGE_BUCKET: string;
  STORAGE_ACCESS_KEY: string;
  STORAGE_SECRET_KEY: string;

  // App
  PORT: number;
  CORS_ORIGIN: string;
  JWT_SECRET: string;
}

export default (): EnvConfig => ({
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432'),
  DB_USERNAME: process.env.DB_USERNAME || 'scholar',
  DB_PASSWORD: process.env.DB_PASSWORD || 'scholar_secret',
  DB_DATABASE: process.env.DB_DATABASE || 'bible_scholar',

  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379'),

  ES_HOST: process.env.ES_HOST || 'http://localhost:9200',

  NEO4J_URI: process.env.NEO4J_URI || 'bolt://localhost:7687',
  NEO4J_USER: process.env.NEO4J_USER || 'neo4j',
  NEO4J_PASSWORD: process.env.NEO4J_PASSWORD || 'scholar_secret',

  RABBITMQ_HOST: process.env.RABBITMQ_HOST || 'localhost',
  RABBITMQ_PORT: parseInt(process.env.RABBITMQ_PORT || '5672'),
  RABBITMQ_USER: process.env.RABBITMQ_USER || 'scholar',
  RABBITMQ_PASSWORD: process.env.RABBITMQ_PASSWORD || 'scholar_secret',

  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4o',
  OPENAI_EMBEDDING_MODEL: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-large',

  STORAGE_ENDPOINT: process.env.STORAGE_ENDPOINT || 'http://localhost:9000',
  STORAGE_BUCKET: process.env.STORAGE_BUCKET || 'bible-scholar',
  STORAGE_ACCESS_KEY: process.env.STORAGE_ACCESS_KEY || 'scholar',
  STORAGE_SECRET_KEY: process.env.STORAGE_SECRET_KEY || 'scholar_secret',

  PORT: parseInt(process.env.PORT || '4000'),
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production',
});
