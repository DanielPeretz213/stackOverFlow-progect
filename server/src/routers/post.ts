import { Router } from "express";
import { authMiddleware } from "../utils/authMiddleware";
import {
  createPost,
  deletePostById,
  filterPostByTag,
  getAllPost,
  getAllUserConectedPost,
  getPostById,
  updatePost,
} from "../controller/post.controller";

const router = Router();

router.get("/", getAllPost);

router.post("/", authMiddleware, createPost);

router.get("/myPost", authMiddleware, getAllUserConectedPost);

router.patch("/:id", authMiddleware, updatePost);

router.delete("/:id", authMiddleware, deletePostById);

router.get("/filterByTag/:id", filterPostByTag);

router.get("/fetchPost/:id", getPostById);

export default router;
