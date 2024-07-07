const express = require('express');
const router = express.Router();
const sql = require('mssql');

// Adicionar um novo registro de atividade
router.post('/', (req, res) => {
  const { tarefa_id, usuario_id, data, tempo_realizado, categoria, local, descricao } = req.body;
  const query = `INSERT INTO RegistrosAtividades (tarefa_id, usuario_id, data, tempo_realizado, categoria, local, descricao) VALUES (${tarefa_id}, ${usuario_id}, '${data}', '${tempo_realizado}', '${categoria}', '${local}', '${descricao}')`;
  sql.query(query, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(201).send('Registro de atividade criado com sucesso');
  });
});

// Obter todos os registros de atividades
router.get('/', (req, res) => {
  const query = 'SELECT * FROM RegistrosAtividades';
  sql.query(query, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).json(result.recordset);
  });
});

// ... Adicione rotas para atualizar e deletar registros de atividades conforme necessário

module.exports = router;
