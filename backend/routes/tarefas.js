const express = require('express');
const sql = require('mssql');
const router = express.Router();

// Endpoint para obter todas as tarefas
router.get('/', async (req, res) => {
  try {
    let pool = await sql.connect(req.sqlConfig);
    let result = await pool.request().query('SELECT * FROM Tarefas');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Endpoint para criar uma nova tarefa
router.post('/', async (req, res) => {
  const { titulo, descricao } = req.body;

  try {
    let pool = await sql.connect(req.sqlConfig);
    let result = await pool.request()
      .input('titulo', sql.VarChar, titulo)
      .input('descricao', sql.VarChar, descricao)
      .query('INSERT INTO Tarefas (titulo, descricao) VALUES (@titulo, @descricao)');
    res.status(201).json({ message: 'Tarefa criada com sucesso!' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Adicione rotas para atualizar e deletar tarefas conforme necessário

module.exports = router;
