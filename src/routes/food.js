import express from "express";
import {
  addFoodItem,
  deleteAllFoods,
  retrieveFoodsList,
  updateField,
} from "../services/food/food.index.js";
const router = express.Router({ mergeParams: true });

router.post("/addFoodItem", async (req, res) => {
  try {
    const addFoodRes = await addFoodItem(req);
    console.log("Add res", addFoodRes);
    res.send(addFoodRes);
  } catch (e) {
    console.log(e);
  }
});

router.post("/updateField", async (req, res) => {
  try {
    const updateFieldRes = await updateField(req);
    console.log("Update res", updateFieldRes);
    res.send(updateFieldRes);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/deleteAllFoods", async (req, res) => {
  try {
    const deleteAllFoodsRes = await deleteAllFoods();
    console.log("Delete all food res", deleteAllFoodsRes);
    res.send(deleteAllFoodsRes);
  } catch (e) {
    console.log(e);
  }
});

router.get("/retrieveFoods", async (req, res) => {
  try {
    const retrieveFoodsListRes = await retrieveFoodsList(req);
    console.log("Retrieve Foods List", retrieveFoodsListRes);
    res.send(retrieveFoodsListRes);
  } catch (e) {
    console.log(e);
  }
});

export default router;
