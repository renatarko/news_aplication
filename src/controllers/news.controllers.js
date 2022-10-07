import { createService, findAllService } from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({ message: "Submit all fields for registration" });
    }

    await createService({
      title,
      text,
      banner,
      id: "object id fake",
    });

    res.send(201);
  } catch {
    res.status(500).send({ message: error.message });
  }
};

const findAll = (req, res) => {
  const news = [];

  res.send({ news });
};

export default { create, findAll };
