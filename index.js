const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

// Importando rotas
const usersRoutes = require("./routes/users");
const clientesRoutes = require("./routes/clientes");

app.use("/api", usersRoutes);
app.use("/api", clientesRoutes);

// Rota principal
app.get("/", (req, res) => {
  res.send("Servidor rodando 🚀");
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
