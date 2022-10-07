import express from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";

//ROTAS
import userRoute from "./src/routes/user.route.js"; // importando todas as rotas
import authRoute from "./src/routes/auth.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDatabase();
app.use(express.json()); // aplicação apta para enviar e receber arquivos json
app.use("/user", userRoute); // usando a rota
app.use("/auth", authRoute);

app.listen(port, () => console.log(`Rodando na porta ${port}`));
