const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

(async () => {
  const c = await pool.connect();
  const tr = await c.query("SELECT id, sigla FROM traducoes");
  const lv = await c.query("SELECT id, slug, nome FROM livros WHERE slug IN ('genesis','joao','romanos','salmos','mateus','marcos','lucas','atos','exodo') ORDER BY slug");
  console.log("TRADUCOES:", JSON.stringify(tr.rows));
  console.log("LIVROS:", JSON.stringify(lv.rows));
  c.release();
  await pool.end();
})();
