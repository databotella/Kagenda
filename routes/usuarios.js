const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretyKey = 'sua_chave_secreta';// Chave secreta para assinar o token

const router = express.Router();

// Endpoint para registrar um novo usuário
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    let pool = await sql.connect(req.sqlConfig);
    let result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, hashedPassword)
      .query('INSERT INTO Usuarios (nome, senha) VALUES (@username, @password)');
    // Salvar o usuário no banco de dados (adicione sua lógica aqui)
    // await saveUserToDatabase(username, hashedPassword);

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(500).send.json({ error: 'Erro ao registrar usuário' });
  }
});

// Endpoint para login de usuário
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar o usuário no banco de dados 
    // const user = await findUserByUsername(username);
      let pool = await sql.connect(req.sqlConfig);
      let result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM Usuarios WHERE nome = @username');
        // Verificar se o usuário existe e se a senha está correta
      
        const user = result.recordset[0];

      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, 'seu_segredo', { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Erro ao realizar login' });
  }
});


// ... Adicione rotas para atualizar e deletar usuários conforme necessário

module.exports = router;
