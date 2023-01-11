import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

import { create, findAll, findById, topNews, findBySearch, byUser } from "../controllers/news.controllers.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", findBySearch);
router.get("/byUser", authMiddleware, byUser)

router.get("/:id", authMiddleware, findById);

export default router;
