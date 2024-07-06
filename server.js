const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const tarefasRoutes = require('./routes/tarefas');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const config = {
    user: 'kg',
    password: 'kg123',
    server: 'BEDUIN',
    database: 'Kagenda',
    options: {
        trustServerCertificate: true,
        trustedConnection: true,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
    port: 1433
};

// Middleware para passar a configuração do banco de dados para as rotas
app.use((req, res, next) => {
    req.sqlConfig = config;
    next();
});

// Rotas
app.use('/tarefas', tarefasRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    return res.json({ message: 'Sou Backend' });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
