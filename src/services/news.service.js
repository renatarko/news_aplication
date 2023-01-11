import News from "../models/News.js";

const createService = (body) => News.create(body);

const findAllService = (limit, offset) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user")

const countNews = () => News.countDocuments();

const topNewsServices = () => News.findOne().sort({_id: -1}).populate("user") 

export { createService, findAllService, countNews, topNewsServices };
