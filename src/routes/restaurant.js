import express from "express";
import {
  addRestaurant,
  deleteAllRestaurants,
  retrieveRestaurants,
} from "../services/restaurant/restaurant.index.js";
const router = express.Router({ mergeParams: true });

router.post("/addRestaurant", async (req, res) => {
  try {
    const addRestaurantRes = await addRestaurant(req);
    console.log("Add res", addRestaurantRes);
    res.send(addRestaurantRes);
  } catch (e) {
    res.sendStatus(400);
  }
});

router.get("/retrieveRestaurants", async (req, res) => {
  try {
    const retrieveRestaurantsRes = await retrieveRestaurants(req);
    console.log("Retrieve Restaurant", retrieveRestaurantsRes);
    res.send(retrieveRestaurantsRes);
  } catch (e) {
    res.sendStatus(400);
  }
});

router.delete("/deleteAllRestaurants", async (req, res) => {
  try {
    const deleteAllRestaurantsRes = await deleteAllRestaurants();
    console.log("Delete Restaurants", deleteAllRestaurantsRes);
    res.send(deleteAllRestaurantsRes);
  } catch (e) {
    res.sendStatus(400);
  }
});

export default router;
