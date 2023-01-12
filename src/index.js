import express from "express";
import connectDatabase from "./database/db.js";
import dotenv from "dotenv";

//ROTAS
import userRoute from "./routes/user.route.js"; // importando todas as rotas
import authRoute from "./routes/auth.route.js";
import newsRoute from "./routes/news.route.js";
import swaggerRoute from "./routes/swagger.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDatabase();
app.use(express.json()); // aplicação apta para enviar e receber arquivos json
app.use("/user", userRoute); // usando a rota
app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/doc", swaggerRoute);

app.listen(port, () => console.log(`Rodando na porta ${port}`));
