import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

import { create, findAll, findById, topNews } from "../controllers/news.controllers.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews)
router.get("/:id", findById)

export default router;
