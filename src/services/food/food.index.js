import { ObjectId } from "bson";
import { devDB } from "../../../config.js";

const restaurantColl = devDB.collection("Restaurants");
const foodColl = devDB.collection("Foods");

export const addFoodItem = async (params) => {
  const foodName = params?.body?.foodName;
  const eaterName = params?.body?.eaterName;
  const rating = params?.body?.rating;
  const note = params?.body?.note;
  const restaurantId = params?.body?.restaurantId;

  if (!foodName || !eaterName || !restaurantId) {
    throw new Error("Missing param");
  }

  const nRestaurantId = new ObjectId(restaurantId);

  const restaurantObject = await restaurantColl.findOne({
    _id: nRestaurantId,
  });

  const newNoteObject = {
    eater: eaterName,
    note: note,
  };

  const newRatingObject = {
    eater: eaterName,
    rating: rating,
  };

  let newFoodItemObject = {
    name: foodName,
    lowerName: foodName.toLowerCase(),
    eaters: [eaterName],
    restaurantId: nRestaurantId,
    ratings: [],
    notes: [],
  };

  if (rating) {
    newFoodItemObject.ratings = [newRatingObject];
  }
  if (note) {
    newFoodItemObject.notes = [newNoteObject];
  }

  let foodItem = await foodColl.findOne({
    restaurantId: nRestaurantId,
    lowerName: foodName.toLowerCase(),
  });

  if (foodItem) {
    // food item already exists
    const eaterAlreadyExists = foodItem.eaters.findIndex(
      (eater) => eater.toLowerCase() === eaterName.toLowerCase()
    );
    if (eaterAlreadyExists === -1) {
      foodItem.eaters.push(eaterName);
    }
    if (rating) {
      foodItem.ratings.push(newRatingObject);
    }
    if (note) {
      foodItem.notes.push(newNoteObject);
    }
    const updateFoodItem = await foodColl.updateOne(
      { _id: new ObjectId(foodItem._id) },
      { foodItem }
    );
    return updateFoodItem;
  } else {
    const insertFoodItem = await foodColl.insertOne(newFoodItemObject);
    const insertedFoodId = insertFoodItem.insertedId;
    if (restaurantObject) {
      const restaurantFoodListRes = await restaurantColl.updateOne(
        { _id: nRestaurantId },
        { $push: { foods: insertedFoodId } }
      );
      return restaurantFoodListRes;
    }
  }
};

export const retrieveFoodsList = async (params) => {
  const foodsArray = params?.query?.foodsArray;
  if (!foodsArray) throw new Error("Missing foods list id");
  const searchFoodsArray = foodsArray.map((foodId) => {
    return new ObjectId(foodId);
  });
  const retrieveFoodsListRes = await foodColl
    .find({
      _id: { $in: searchFoodsArray },
    })
    .toArray();
  return retrieveFoodsListRes;
};

export const updateField = async (params) => {
  const { fieldKey, fieldValue, foodKey, restaurantKey } = params?.body;
  if (!fieldKey || !fieldValue || !foodKey || !restaurantKey) {
    throw new Error("Missing params");
  }
  const nFoodKey = new ObjectId(foodKey);
  let updateObj = {};
  if (fieldKey === "name") {
    updateObj[`${fieldKey}`] = fieldValue;
    updateObj["lowerName"] = fieldValue.toLowerCase();
  } else {
    updateObj[`${fieldKey}`] = fieldValue;
  }
  const updateFieldRes = await foodColl.updateOne(
    {
      _id: nFoodKey,
    },
    {
      $set: updateObj,
    }
  );
  const updatedItemObject = await foodColl.findOne({ _id: nFoodKey });
  return updatedItemObject;
};

export const deleteAllFoods = async () => {
  const deleteAllFoodsRes = await foodColl.deleteMany({});
  return deleteAllFoodsRes;
};
