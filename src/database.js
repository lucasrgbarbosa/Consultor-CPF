const sqlite3 = require('sqlite3').verbose();

// Conectar ao banco de dados (ou criar se não existir)
const db = new sqlite3.Database('./cpfs.db');

// Criar a tabela de CPFs se não existir
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS cpfs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cpf TEXT UNIQUE NOT NULL,
        createdAt TEXT NOT NULL
    )`);
});

module.exports = db;