const express = require('express');
const app = express();

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    versao: '1.0.0',
    ambiente: process.env.NODE_ENV || 'production',
  });
});

app.get('/api/v1/biblia/testamentos', (req, res) => {
  res.json([
    { nome: 'Antigo Testamento', slug: 'antigo-testamento', ordem: 1, totalLivros: 39 },
    { nome: 'Novo Testamento', slug: 'novo-testamento', ordem: 2, totalLivros: 27 },
  ]);
});

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado', path: req.path });
});

module.exports = app;
