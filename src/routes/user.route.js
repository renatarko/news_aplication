const route = require("express").Router(); // é a mesma coisa do app = express()
const userController = require("../controllers/user.controllers"); // importando o arquivo que está a função de soma

const { validId, validUser } = require("../middlewares/global.middlewares");

route.post("/", userController.create);
route.get("/", userController.findAll);
route.get("/:id", validId, validUser, userController.findById);
route.patch("/:id", validId, validUser, userController.update);

module.exports = route;
