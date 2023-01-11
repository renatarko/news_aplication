import { countNews, createService, findAllService } from "../services/news.service.js";

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
      user: { _id: req.userId },
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
  let {limit, offset} = req.query

  limit = Number(limit)
  offset = Number(offset)

  if(!limit) {
    limit = 5
  }

  if(!offset) {
    offset = 0
  } 


  // Paginations
  const news = await findAllService(limit, offset);

  const total = await countNews()
  const currentUrl = req.baseUrl
  
  const next = offset - limit
  const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${offset}` : null

  const previous = offset - limit < 0 ? null : offset - limit
  const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${offset}` : null

  if (news.length === 0) {
    res.send({ message: "There are no registered news" });
  }

  res.send({
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: news.map(item => ({
      id: item._id,
      title: item.title,
      text: item.text,
      banner: item.banner,
      likes: item.likes,
      comments: item.comments,
      name: item.user.name,
      userName: item.user.username,
      userAavatar: item.user.avatar,
    }))
  });
};

export { create, findAll };
