import { countNews, createService, findAllService, topNewsService, findByIdService, findBySearchService, byUserService } from "../services/news.service.js";

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
  try {
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
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
};

const topNews = async (req, res) => {
  try {
    const news = await topNewsService()

    if (!news) {
      return res.send({message: "There is no registered post"})
    }

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAavatar: news.user.avatar,
      }
    })

  } catch(error) {
    res.status(500).send({ message: error.message });
  }
}

const findById = async (req, res) => {
  try {
    const { id } = req.params

    const news = await findByIdService(id)

    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAavatar: news.user.avatar,
      }
    })
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
}

const findBySearch = async (req, res) => {
  try {
  const { title } = req.query
  
  const news = await findBySearchService(title)

  if(news.length === 0) {
    return res.status(400).send({menssage: "There is no news with this title"})
  }

  res.send({
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
  })

  } catch(error) {
    res.status(500).send({ message: error.message });
  }
}

const byUser = async (req, res) => {
  try {
    const id = req.userId
    const news = await byUserService(id)

    return res.send({
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
    })
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
}

export { create, findAll, topNews, findById, findBySearch, byUser };
