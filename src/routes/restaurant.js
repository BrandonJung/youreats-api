import express from "express";
import {
  addRestaurant,
  deleteAllRestaurants,
  retrieveRestaurantById,
  retrieveRestaurants,
  updateRestaurantField,
} from "../services/restaurant/restaurant.index.js";
const router = express.Router({ mergeParams: true });

router.post("/addRestaurant", async (req, res) => {
  try {
    const addRestaurantRes = await addRestaurant(req);
    console.log("Add res", addRestaurantRes);
    res.send(addRestaurantRes);
  } catch (e) {
    console.log(e);
  }
});

router.get("/retrieveRestaurants", async (req, res) => {
  try {
    const retrieveRestaurantsRes = await retrieveRestaurants(req);
    console.log("Retrieve Restaurant", retrieveRestaurantsRes);
    res.send(retrieveRestaurantsRes);
  } catch (e) {
    console.log(e);
  }
});

router.get("/retrieveRestaurantById", async (req, res) => {
  try {
    const retrieveRestaurantByIdRes = await retrieveRestaurantById(req);
    console.log("Retrieve by id", retrieveRestaurantByIdRes);
    res.send(retrieveRestaurantByIdRes);
  } catch (e) {
    console.log(e);
  }
});

router.post("/updateField", async (req, res) => {
  try {
    const updateFieldRes = await updateRestaurantField(req);
    console.log("Update res field", updateFieldRes);
    res.send(updateFieldRes);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/deleteAllRestaurants", async (req, res) => {
  try {
    const deleteAllRestaurantsRes = await deleteAllRestaurants();
    console.log("Delete Restaurants", deleteAllRestaurantsRes);
    res.send(deleteAllRestaurantsRes);
  } catch (e) {
    console.log(e);
  }
});

export default router;
