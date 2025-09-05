const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json()); // Para interpretar JSON no corpo das requisições


function validateCpf(cpf) {
  if (!cpf || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;

  return true;
}

// Rota para adicionar CPF
app.post('/cpf', (req, res) => {
    const { cpf } = req.body;

    if (!validateCpf(cpf)) {
        return res.status(400).json({ type: "InvalidCpfException", message: "CPF is not valid." });
    }

    db.get("SELECT * FROM cpfs WHERE cpf = ?", [cpf], (err, row) => {
        if (row) {
            return res.status(400).json({ type: "ExistsCpfException", message: "CPF already exists." });
        }

        const createdAt = new Date().toISOString();
        db.run("INSERT INTO cpfs (cpf, createdAt) VALUES (?, ?)", [cpf, createdAt], function(err) {
            if (err) {
                return res.status(500).json({ message: "Error inserting CPF." });
            }
            res.status(201).json({ cpf, createdAt });
        });
    });
});

// Rota para verificar CPF
app.get('/cpf/:cpf', (req, res) => {
    const { cpf } = req.params;

    if (!validateCpf(cpf)) {
        return res.status(400).json({ type: "InvalidCpfException", message: "CPF is not valid." });
    }

    db.get("SELECT * FROM cpfs WHERE cpf = ?", [cpf], (err, row) => {
        if (!row) {
            return res.status(404).json({ type: "NotFoundCpfException", message: "CPF not found." });
        }
        res.json(row);
    });
});

// Rota para remover CPF
app.delete('/cpf/:cpf', (req, res) => {
    const { cpf } = req.params;

    if (!validateCpf(cpf)) {
        return res.status(400).json({ type: "InvalidCpfException", message: "CPF is not valid." });
    }

    db.run("DELETE FROM cpfs WHERE cpf = ?", [cpf], function(err) {
        if (err || this.changes === 0) {
            return res.status(404).json({ type: "NotFoundCpfException", message: "CPF not found." });
        }
        res.status(204).send();
    });
});

// Rota para listar todos os CPFs
app.get('/cpf', (req, res) => {
    db.all("SELECT * FROM cpfs", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Error retrieving CPFs." });
        }
        res.json(rows);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});