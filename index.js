const express = require("express");
const app = express();

const userRoute = require("./src/routes/user.route.js"); // importando todas as rotas

const port = 3000;

app.use(express.json());
app.use("/user", userRoute); // usando a rota

app.listen(3000, () => console.log(`Rodando na porta ${port}`));
