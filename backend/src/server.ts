import cors from "cors";

import { errorHandler } from "./middlewares/errorHandler.js";

import petsRoutes from "./routes/pets.routes.js";

import { pool } from "./db.js";

import express from "express";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Servidor de adoção de pets funcionando!");
});

app.use(errorHandler);

app.get("/especies", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM especies ORDER BY nome");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar espécies" });
  }
});

app.use(errorHandler);

app.use("/pets", petsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});