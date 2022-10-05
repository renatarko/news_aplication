const route = require("express").Router(); // é a mesma coisa do app = express()
const userController = require("../controllers/user.controllers"); // importando o arquivo que está a função de soma

route.post("/", userController.create);
route.get("/", userController.findAll);
route.get("/:id", userController.findById);

module.exports = route;
