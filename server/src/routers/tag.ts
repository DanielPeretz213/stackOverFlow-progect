import { Router } from "express";
import { authMiddleware } from "../utils/authMiddleware";
import {
  createTag,
  deleteTagById,
  getAllTags,
} from "../controller/tag.controller";

const router = Router();

router.get("/", getAllTags);

router.post("/", authMiddleware, createTag);

router.delete("/:id", authMiddleware, deleteTagById);

export default router;
