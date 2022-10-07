import { createService, findAllService } from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);

    if (!authorization) {
      res.send(401);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.send(401);
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.send(401);
    }

    const { title, text, banner } = req.body;
    if (!title || !text || !banner) {
      res.status(400).send({ message: "Submit all fields for registration" });
    }

    await createService({
      title,
      text,
      banner,
      user: { _id: "633f835dbb6c4ef7dfed81d6" },
    });

    res.status(200).send({
      message: "News created",
      title,
      text,
      banner,
    });
  } catch {
    res.status(500).send({ message: error.message });
  }
};

const findAll = async (req, res) => {
  const news = await findAllService();

  if (news.length === 0) {
    res.send({ message: "There are no registered news" });
  }

  res.send({ news });
};

export { create, findAll };