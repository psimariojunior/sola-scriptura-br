#!/bin/sh
set -e

echo "Running migrations..."
node -e "
const {DataSource}=require('typeorm');
const ds=new DataSource({
  type:'postgres',
  host:process.env.DB_HOST||'postgres',
  port:parseInt(process.env.DB_PORT)||5432,
  username:process.env.DB_USER||'sola_scriptura',
  password:process.env.DB_PASSWORD||'SOLAScriptura2024!',
  database:process.env.DB_NAME||'sola_scriptura',
  entities:['dist/**/*.entity.js'],
  migrations:['dist/infra/database/migrations/*.js'],
  synchronize:false
});
ds.initialize().then(async()=>{
  try{await ds.runMigrations();console.log('Migrations OK')}catch(e){console.log('Migration skip:',e.message)}
  await ds.destroy();process.exit(0);
}).catch(e=>{console.error(e);process.exit(1);})
"

echo "Checking seed..."
node -e "
const {DataSource}=require('typeorm');
const ds=new DataSource({
  type:'postgres',
  host:process.env.DB_HOST||'postgres',
  port:parseInt(process.env.DB_PORT)||5432,
  username:process.env.DB_USER||'sola_scriptura',
  password:process.env.DB_PASSWORD||'SOLAScriptura2024!',
  database:process.env.DB_NAME||'sola_scriptura',
  entities:['dist/**/*.entity.js'],
  synchronize:false
});
ds.initialize().then(async()=>{
  const count=await ds.query('SELECT COUNT(*) FROM livros');
  if(parseInt(count[0].count)>0){console.log('Already seeded');await ds.destroy();process.exit(0)}
  console.log('Empty DB - seed needed via manual command');
  await ds.destroy();process.exit(0);
}).catch(e=>{console.error(e);process.exit(1);})
"

echo "Starting backend..."
exec node dist/main