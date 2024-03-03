const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  templateMethodGet,
  templateMethodPost,
  templateMethodPut,
  templateMethodDelete,
} = require("../services/template/template.index");

router.get("/", (req, res) => {
  const retObject = templateMethodGet(req.body);
  res.send(retObject);
});

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

module.exports = router;
