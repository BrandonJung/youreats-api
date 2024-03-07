import express from "express";
import { addUser, retrieveUserById } from "../services/user/user.index.js";
const router = express.Router({ mergeParams: true });

router.get("/retrieveUserByUserId", async (req, res, next) => {
  try {
    const userRes = await retrieveUserById(req);
    if (userRes) {
      res.send(userRes);
    }
  } catch (e) {
    res.sendStatus(404);
  }
});

router.post("/add", async (req, res) => {
  const addUserRes = await addUser(req?.body);
  if (addUserRes) {
  } else {
    res.sendStatus();
  }
});

export default router;
