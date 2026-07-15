#!/bin/sh
set -e

echo "=== Sola Scriptura Backend ==="
echo "Waiting for database..."
sleep 5

echo "Running migrations..."
node -e "
const{DataSource}=require('typeorm');
const ds=new DataSource({
  type:'postgres',
  host:process.env.DB_HOST||'postgres',
  port:parseInt(process.env.DB_PORT)||5432,
  username:process.env.DB_USER||'sola_scriptura',
  password:process.env.DB_PASSWORD||'sola_scriptura',
  database:process.env.DB_NAME||'sola_scriptura',
  ssl:false,
  entities:['dist/**/*.entity.js'],
  migrations:['dist/infra/database/migrations/*.js'],
  synchronize:false
});
ds.initialize().then(async()=>{
  try{await ds.runMigrations();console.log('Migrations OK')}
  catch(e){console.log('Migration skip:',e.message)}
  await ds.destroy();process.exit(0);
}).catch(e=>{console.error(e);process.exit(1);})
"

echo "Checking if seed is needed..."
node -e "
const{DataSource}=require('typeorm');
const ds=new DataSource({
  type:'postgres',
  host:process.env.DB_HOST||'postgres',
  port:parseInt(process.env.DB_PORT)||5432,
  username:process.env.DB_USER||'sola_scriptura',
  password:process.env.DB_PASSWORD||'sola_scriptura',
  database:process.env.DB_NAME||'sola_scriptura',
  ssl:false,
  entities:['dist/**/*.entity.js'],
  synchronize:false
});
ds.initialize().then(async()=>{
  const c=await ds.query('SELECT COUNT(*) FROM livros');
  const count=parseInt(c[0].count);
  if(count>0){
    console.log('Database already seeded ('+count+' livros)');
    await ds.destroy();process.exit(0);
  }
  console.log('Empty database detected. Running seed...');
  await ds.destroy();process.exit(0);
}).catch(e=>{console.error(e);process.exit(1);})
"

# Check if seed needs to run by re-reading the count
SEED_COUNT=$(node -e "
const{DataSource}=require('typeorm');
const ds=new DataSource({
  type:'postgres',
  host:process.env.DB_HOST||'postgres',
  port:parseInt(process.env.DB_PORT)||5432,
  username:process.env.DB_USER||'sola_scriptura',
  password:process.env.DB_PASSWORD||'sola_scriptura',
  database:process.env.DB_NAME||'sola_scriptura',
  ssl:false,
  entities:['dist/**/*.entity.js'],
  synchronize:false
});
ds.initialize().then(async()=>{
  const c=await ds.query('SELECT COUNT(*) FROM livros');
  console.log(c[0].count);
  await ds.destroy();process.exit(0);
}).catch(e=>{console.error('0');process.exit(0);})
")

if [ "$SEED_COUNT" = "0" ]; then
  echo "Running seed..."
  node dist/infra/database/seed.js || echo "Seed failed, will need manual execution"
fi

echo "Starting backend..."
exec node dist/main
