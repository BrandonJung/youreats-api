import express from "express";
const router = express.Router({ mergeParams: true });
import {
  templateMethodGet,
  templateMethodPost,
  templateMethodPut,
  templateMethodDelete,
} from "../services/template/template.index.js";
import { db } from "../../config.js";

// router.get("/", (req, res) => {
//   const retObject = templateMethodGet(req.body);
//   res.send(retObject);
// });

router.post("/", (req, res) => {
  const retObject = templateMethodPost(req.body);
  res.send(retObject);
});

router.put("/", (req, res) => {
  const retObject = templateMethodPut(req.body);
  res.send(retObject);
});

router.delete("/", (req, res) => {
  const retObject = templateMethodDelete(req.body);
  res.send(retObject);
});

// Get a list of 50 posts
router.get("/", async (req, res) => {
  let collection = await db.collection("restaurants");
  let results = await collection.find({}).limit(50).toArray();
  res.send(results).status(200);
});

export default router;
