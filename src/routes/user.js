import express from "express";
import {
  deleteAllUsers,
  makeUser,
  retrieveUser,
} from "../services/user/user.index.js";
const router = express.Router({ mergeParams: true });

router.get("/retrieveUserByUserId", async (req, res) => {
  try {
    const userRes = await retrieveUser(req);
    console.log("User Res: " + userRes);
    if (userRes) {
      res.send(userRes);
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/createUser", async (req, res) => {
  try {
    const makeUserRes = await makeUser(req);
    console.log("Make User Res: " + makeUserRes);
    res.send(makeUserRes);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/deleteAllUsers", async (req, res) => {
  try {
    const deleteAllUsersRes = await deleteAllUsers();
    console.log("Delete All Users Res: " + deleteAllUsersRes);
    res.send(deleteAllUsersRes);
  } catch (e) {
    console.log(e);
  }
});

export default router;
