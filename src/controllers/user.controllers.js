const create = (req, res) => {
  const user = req.body;
  res.json("hello");

  console.log(user);
};

module.exports = { create }; // exportando a função para poder ser usado pela user.route
