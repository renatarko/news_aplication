const User = require("../models/User");

const createService = (body) => User.create(body);

const findAllService = () => User.find(); // função do mongoose para buscar todos os usuários.

const findByIdService = (id) => User.findById(id);

module.exports = {
  createService,
  findAllService,
  findByIdService,
};
