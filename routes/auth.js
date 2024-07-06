const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = 'sua_chave_secreta'; // Use uma chave secreta segura

// Endpoint para registrar um novo usuário
router.post('/register', async (req, res) => {
    console.log('Recebendo requisição de registro de usuário'); // Log para debug
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        let pool = await sql.connect(req.sqlConfig);
        let result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, hashedPassword)
            .query('INSERT INTO Usuarios (username, password) VALUES (@username, @password)');
        console.log('Usuário registrado com sucesso!'); // Log para debug
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint para login de usuário
router.post('/login', async (req, res) => {
    console.log('Recebendo requisição de login'); // Log para debug     
    const { username, password } = req.body;

    try {
        let pool = await sql.connect(req.sqlConfig);
        let result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Usuarios WHERE nome = @username');

        const user = result.recordset[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
            console.log('Login realizado com sucesso!'); // Log para debug
            res.json({ token });
        } else {
            console.log('Credenciais inválidas'); // Log para debug 
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {

        console.error('Erro ao realizar login', error); // Log para debug
        res.status(500).send(error);
    }
});

module.exports = router;
