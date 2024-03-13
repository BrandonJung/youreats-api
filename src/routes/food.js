import express from "express";
import { addFoodItem, deleteAllFoods } from "../services/food/food.index.js";
const router = express.Router({ mergeParams: true });

router.post("/addFoodItem", async (req, res) => {
  try {
    const addFoodRes = await addFoodItem(req);
    console.log("Add res", addFoodRes);
    res.send(addFoodRes);
  } catch (e) {
    res.sendStatus(400);
  }
});

router.delete("/deleteAllFoods", async (req, res) => {
  try {
    const deleteAllFoodsRes = await deleteAllFoods();
    console.log("Delete all food res", deleteAllFoodsRes);
    res.send(deleteAllFoodsRes);
  } catch (e) {
    res.sendStatus(400);
  }
});

export default router;
