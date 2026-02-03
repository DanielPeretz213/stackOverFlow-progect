import { Router, Request, Response } from "express";
import Tag from "../models/Tag";
import { authMiddleware } from "../utils/authMiddleware";
import sanitizeContent from "../utils/sanitize";
import { addTagValidation } from "../validation/tag";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find();
    res.status(200).send(tags);
  } catch (error) {
    res.status(500).send({
      message: "samting went wrong with fetchin all tags",
      error,
    });
  }
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    Object.keys(req.body).forEach((key) => {
      req.body[key] = sanitizeContent(req.body[key]);
    });

    const { error, value } = addTagValidation.validate(req.body);

    if (error) return res.status(400).send(error.details[1].message);

    if (!req.user) return res.status(401).send("Unauthorized");
    if (!req.user.isAdmin)
      return res.status(400).send("only admin cat add tags");
    if(!value) return res.status(400).send("you need to send tag name");
    const newTAg = await Tag.create(value);
    res.status(200).send({
      message: "adding tag secssfuly",
      newTAg,
    });
  } catch (error) {
    res.status(500).send({
      message: "samting went wrong with add tags",
      error,
    });
  }
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {   
   try {
       if (!req.user) {
         return res.status(401).send("Unauthorized");
       }
   
       const tagIdToDelete = req.params.id;
       const findTag = await Tag.findById(tagIdToDelete);
   
       if (!findTag) return res.status(400).send("can't find tag");
       if (!req.user.isAdmin) {
         return res
           .status(400)
           .send(
             "you'r can't delete this tag because you are not admin",
           );
       }
       await Tag.findByIdAndDelete(tagIdToDelete);
       res.status(204).send("delete secssesfuly")
   
     } catch (error) {
       res.status(500).send({
         message: "samting wennt wrong with delete tag",
         error,
       });
     }
})

export default router;
