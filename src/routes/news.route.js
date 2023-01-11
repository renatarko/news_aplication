import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

import { create, findAll, topNews } from "../controllers/news.controllers.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews)

export default router;
