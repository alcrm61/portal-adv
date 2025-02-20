const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Rota para listar todos os clientes
router.get("/clientes", (req, res) => {
  pool.query("SELECT id, name, email, phone FROM clientes", (err, results) => {
    if (err) {
      console.error("Erro ao buscar clientes:", err);
      return res.status(500).json({ error: "Erro ao buscar clientes" });
    }
    res.json(results);
  });
});
// Rota para adicionar um novo cliente
router.post("/clientes", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  pool.query(
    "INSERT INTO clientes (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone],
    (err, results) => {
      if (err) {
        console.error("Erro ao adicionar cliente:", err);
        return res.status(500).json({ error: "Erro ao adicionar cliente" });
      }
      res.status(201).json({ message: "Cliente criado com sucesso", clientId: results.insertId });
    }
  );
});

// Rota para buscar um cliente pelo ID
router.get("/clientes/:id", (req, res) => {
  const { id } = req.params;

  pool.query("SELECT id, name, email, phone FROM clients WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar cliente:", err);
      return res.status(500).json({ error: "Erro ao buscar cliente" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json(results[0]);
  });
});


module.exports = router;
