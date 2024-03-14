import { Router } from "express";
import { validateNewMessage } from "../middleware/validation";
import { Message } from "../database/model/masseges";
import { IMessage } from "../@types/message";
import { isAdmin } from "../middleware/is-admin";

const router = Router();

//GET all messages
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allMessages = await Message.find();
    if (!allMessages) {
      res.json("No Messages");
    }
    return res.json(allMessages);
  } catch (e) {
    next(e);
  }
});

//POST new message
router.post("/", validateNewMessage, async (req, res, next) => {
  try {
    
    const message = new Message(req.body as IMessage);
    message.save()
    res.status(201).json({ message: "Message saved", saved: message });
  } catch (e) {
    next(e);
  }
});

//DELETE message
router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteMessage = await Message.findOneAndDelete({ _id: id });
    return res.json({ message: "message deleted", deleteMessage });
  } catch (e) {
    next(e);
  }
});


export { router as contactRouter };
