import express from "express";
import { devDB } from "../../config.js";
const router = express.Router({ mergeParams: true });

const restaurantColl = devDB.collection("Restaurants");

router.post("/add", async (req, res) => {
  const restaurantName = req?.body?.name;
  const newRestaurantObject = {
    name: restaurantName,
    imageURL: "",
    foodList: [],
  };
  const result = await restaurantColl.insertOne(newRestaurantObject);
  res.send(result).status(200);
});

export default router;
