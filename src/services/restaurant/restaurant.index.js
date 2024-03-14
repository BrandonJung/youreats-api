import { ObjectId } from "bson";
import { devDB } from "../../../config.js";

const restaurantColl = devDB.collection("Restaurants");

export const addRestaurant = async (params) => {
  const restaurantName = params?.body?.name;
  const userId = params?.body?.userId;
  const newRestaurantObject = {
    name: restaurantName,
    lowerName: restaurantName.toLowerCase(),
    imageURL: "",
    foods: [],
    usersSubscribed: [userId],
  };
  const newRestaurantRes = await restaurantColl.insertOne(newRestaurantObject);
  return newRestaurantRes;
};

export const retrieveRestaurants = async (params) => {
  const userId = params?.query?.userId;
  const retrieveRestaurantsRes = await restaurantColl
    .find({
      usersSubscribed: userId,
    })
    .toArray();
  return retrieveRestaurantsRes;
};

export const retrieveRestaurantById = async (params) => {
  const restaurantId = params?.query?.restaurantId;
  const nRestaurantId = new ObjectId(restaurantId);
  const retrieveRes = await restaurantColl.findOne({ _id: nRestaurantId });
  return retrieveRes;
};

export const updateRestaurantField = async (params) => {
  const { fieldKey, fieldValue, restaurantKey } = params?.body;
  if (!fieldKey || !fieldValue || !restaurantKey) {
    throw new Error("Missing params");
  }
  const nRestaurantId = new ObjectId(restaurantKey);
  let updateObj = {};
  if (fieldKey === "name") {
    updateObj[`${fieldKey}`] = fieldValue;
    updateObj["lowerName"] = fieldValue.toLowerCase();
  } else {
    updateObj[`${fieldKey}`] = fieldValue;
  }
  const updateFieldRes = await restaurantColl.updateOne(
    {
      _id: nRestaurantId,
    },
    {
      $set: updateObj,
    }
  );
  const updatedItemObject = await restaurantColl.findOne({
    _id: nRestaurantId,
  });
  return updatedItemObject;
};

export const deleteAllRestaurants = async () => {
  const deleteAllUsersRes = await restaurantColl.deleteMany({});
  return deleteAllUsersRes;
};
