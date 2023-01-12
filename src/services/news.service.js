import News from "../models/News.js";

const createService = (body) => News.create(body);

const findAllService = (limit, offset) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countNews = () => News.countDocuments();

const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

const findByIdService = (id) => News.findById(id);

const findBySearchService = (title) =>
  News.find({
    title: { $regex: `${title || ""}`, $options: "i" }, //expressão regular do mongoDB
  })
    .sort({ _id: -1 })
    .populate("user");

const byUserService = (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate("user");

const upDateService = (id, title, text, banner) =>
  News.findByIdAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

const eraseService = (id) => News.findByIdAndDelete({ _id: id });

const likesNewsService = (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

const deleteLikesNewsService = (idNews, userId) =>
  News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } });

const addCommentService = (idNews, userId, comment) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return News.findOneAndUpdate(
    { _id: idNews },
    {
      $push: {
        comments: { idComment, userId, comment, createdAt: new Date() },
      },
    }
  );
};

const deleteCommentService = (idNews, userId, idComment) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { comments: { userId, idComment } } }
  );

export {
  createService,
  findAllService,
  countNews,
  topNewsService,
  findByIdService,
  findBySearchService,
  byUserService,
  upDateService,
  eraseService,
  likesNewsService,
  deleteLikesNewsService,
  addCommentService,
  deleteCommentService,
};
