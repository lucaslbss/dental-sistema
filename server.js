const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let db;

// Função para iniciar o Banco de Dados e as Tabelas
async function iniciarBanco() {
    db = await open({
        filename: path.join(__dirname, 'banco.sqlite'),
        driver: sqlite3.Database
    });

    // 1. Cria a Tabela de Pagamentos
    await db.exec(`
        CREATE TABLE IF NOT EXISTS pagamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente TEXT NOT NULL,
            valor REAL NOT NULL,
            formaPagamento TEXT NOT NULL,
            emissor TEXT,
            vencimento TEXT,
            dataRegistro TEXT NOT NULL
        )
    `);

    // 2. Cria a Tabela de Usuários
    await db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL
        )
    `);

    // 3. Criação do Usuário Padrão (se não existir nenhum)
    const totalUsuarios = await db.get('SELECT COUNT(*) as total FROM usuarios');
    
    if (totalUsuarios.total === 0) {
        console.log("Nenhum usuário encontrado. Criando usuário 'admin' padrão...");
        const salt = await bcrypt.genSalt(10); 
        const senhaHash = await bcrypt.hash('1234', salt); // Criptografa a senha "1234"
        
        await db.run('INSERT INTO usuarios (usuario, senha) VALUES (?, ?)', ['admin', senhaHash]);
        console.log("Usuário 'admin' criado com sucesso!");
    }

    console.log("Banco de dados SQLite pronto e seguro!");
}

iniciarBanco();

// --- ROTAS DO SISTEMA ---

// Rota de Login (Validação com Bcrypt)
app.post('/api/login', async (req, res) => {
    try {
        const { usuario, senha } = req.body;
        const usuarioBanco = await db.get('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
        
        if (usuarioBanco) {
            const senhaValida = await bcrypt.compare(senha, usuarioBanco.senha);
            if (senhaValida) {
                return res.json({ sucesso: true, token: 'token-simples-dental' });
            }
        }
        res.status(401).json({ sucesso: false, mensagem: 'Usuário ou senha incorretos' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
});

// Rota para Buscar Pagamentos
app.get('/api/pagamentos', async (req, res) => {
    try {
        const pagamentos = await db.all('SELECT * FROM pagamentos ORDER BY id DESC');
        res.json(pagamentos);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar dados' });
    }
});

// Rota para Salvar Pagamentos
app.post('/api/pagamentos', async (req, res) => {
    try {
        const { cliente, valor, formaPagamento, emissor, vencimento } = req.body;
        const dataRegistro = new Date().toLocaleDateString('pt-BR'); 

        await db.run(`
            INSERT INTO pagamentos (cliente, valor, formaPagamento, emissor, vencimento, dataRegistro)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [cliente, valor, formaPagamento, emissor, vencimento, dataRegistro]);
        
        res.status(201).json({ mensagem: 'Salvo com sucesso!' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao salvar' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Sistema rodando! Acesse: http://localhost:${PORT}`);
});