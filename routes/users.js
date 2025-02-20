const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Rota para listar todos os usuários
router.get("/users", (req, res) => {
  pool.query("SELECT id, name, email FROM users", (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuários:", err);
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
    res.json(results);
  });
});
// Rota para buscar um usuário pelo ID
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT id, name, email FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuário:", err);
      return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(results[0]);
  });
});

// Rota para adicionar um novo usuário
router.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }
  pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], (err, results) => {
    if (err) {
      console.error("Erro ao adicionar usuário:", err);
      return res.status(500).json({ error: "Erro ao adicionar usuário" });
    }
    res.status(201).json({ message: "Usuário criado com sucesso", userId: results.insertId });
  });
});

// Rota para excluir um usuário pelo ID
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir usuário:", err);
      return res.status(500).json({ error: "Erro ao excluir usuário" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário excluído com sucesso" });
  });
});


module.exports = router;
