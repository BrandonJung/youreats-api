import { ObjectId } from "bson";
import { devDB } from "../../../config.js";

const restaurantColl = devDB.collection("Restaurants");

export const addRestaurant = async (params) => {
  const restaurantName = params?.body?.name;
  const userId = params?.body?.userId;
  const newRestaurantObject = {
    name: restaurantName,
    imageURL: "",
    foods: [],
    usersSubscribed: [userId],
  };
  const newRestaurantRes = await restaurantColl.insertOne(newRestaurantObject);
  return newRestaurantRes;
};

export const retrieveRestaurants = async (params) => {
  const userId = params?.query?.userId;
  const nUserId = new ObjectId(userId);
  const retrieveRestaurantsRes = await restaurantColl
    .find({
      usersSubscribed: userId,
    })
    .toArray();
  return retrieveRestaurantsRes;
};

export const deleteAllRestaurants = async () => {
  const deleteAllUsersRes = await restaurantColl.deleteMany({});
  return deleteAllUsersRes;
};
