import { Router, Request, Response } from "express";
import Post, { IPost } from "../models/Post";
import sanitizeContent from "../utils/sanitize";
import { creatPostValidation, updatePostValidation } from "../validation/post";
import { authMiddleware } from "../utils/authMiddleware";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const allPost: IPost[] = await Post.find()
      .populate("creator", "name")
      .populate("tags", "name")
      .sort({ createdAt: -1 });
    res.status(200).send(allPost);
  } catch (error) {
    res.status(500).send("smating wennt wrong with geting all postes");
  }
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === 'string') {
      req.body[key] = sanitizeContent(req.body[key]);
    }
  });

  const { value, error } = creatPostValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0]?.message);

  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await Post.create({
      ...value,
      creator: req.user.id,
    });

    res.status(201).send({
      message: "user creater seccesfuly",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/myPost", authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const posts = await Post.find({ creator: req.user.id });
    if (!posts) {
      return res
        .status(200)
        .send("post not found , you need to creat post first");
    }
    res.status(200).send(posts);
  } catch (error) {
    res
      .status(500)
      .send("semting went wrong wen i trid to fetch the user posts ");
  }
});

router.patch("/:id", authMiddleware, async (req: Request, res: Response) => {
  Object.keys(req.body).forEach((key) => {
    req.body[key] = sanitizeContent(req.body[key]);
  });

  const { value, error } = updatePostValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0]?.message);

  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }

    const postIdToUpdat = req.params.id;
    const userId = req.user.id;
    const findPost = await Post.findById(postIdToUpdat);

    if (!findPost) return res.status(404).send("can't find post");
    if (findPost.creator.toString() !== userId && !req.user.isAdmin) {
      return res
        .status(400)
        .send(
          "you'r can't updat this post because you are not cratoer and you are not admin",
        );
    }

    const { title, content, tags } = value;

    if (title) findPost.title = title;
    if (content) findPost.content = content;
    if (tags) findPost.tags = tags;

    await findPost.save();
    res.status(200).send({
      message: "update seccessfuly",
      post: findPost,
    });
  } catch (error) {
    res.status(500).send({
      message: "samting wennt wrong with update post",
      error,
    });
  }
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }

    const postIdToDelete = req.params.id;
    const userId = req.user.id;
    const findPost = await Post.findById(postIdToDelete);

    if (!findPost) return res.status(400).send("can't find post");
    if (findPost.creator.toString() !== userId && !req.user.isAdmin) {
      return res
        .status(400)
        .send(
          "you'r can't delete this post because you are not cratoer and you are not admin",
        );
    }
    await Post.findByIdAndDelete(postIdToDelete);
    res.status(204).send("delete secssesfuly");
  } catch (error) {
    res.status(500).send({
      message: "samting wennt wrong with update post",
      error,
    });
  }
});

router.get("/filterByTag/:id", authMiddleware, async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }
  try{
    const tagId = sanitizeContent(req.params.id as string);
    const filterPost = await Post.find({tags: tagId})
    .populate("creator","username")
    .populate("tags")
    .sort({createdAt : -1});

    res.status(200).json(filterPost);
  }catch(error){
    res.status(500).json({ message: "Error filtering posts", error });
  }
});

export default router;
