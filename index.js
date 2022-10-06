import express from "express";
import connectDatabase from "./src/database/db.js";
import userRoute from "./src/routes/user.route.js"; // importando todas as rotas
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDatabase();
app.use(express.json()); // aplicação apta para enviar e receber arquivos json
app.use("/user", userRoute); // usando a rota

app.listen(port, () => console.log(`Rodando na porta ${port}`));
