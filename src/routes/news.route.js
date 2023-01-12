import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

import { create, findAll, findById, topNews, findBySearch, byUser, upDate, erase, likesNews } from "../controllers/news.controllers.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", findBySearch);
router.get("/byUser", authMiddleware, byUser);
router.get("/:id", authMiddleware, findById);
router.patch("/:id", authMiddleware, upDate);
router.delete("/:id", authMiddleware, erase);
router.patch("/like/:id", authMiddleware, likesNews);

export default router;
