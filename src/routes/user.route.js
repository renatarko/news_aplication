const route = require("express").Router(); // é a mesma coisa do app = express()
const userController = require("../controllers/user.controllers"); // importando o arquivo que está a função de soma

route.post("/", userController.create);

module.exports = route;
