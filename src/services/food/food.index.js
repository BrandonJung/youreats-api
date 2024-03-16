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

  const createdById = restaurantObject.createdBy;

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
    createdBy: createdById,
    ratings: [],
    notes: [],
    tags: [],
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
      { $set: foodItem }
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

export const updateFoodField = async (params) => {
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

export const addFoodTag = async (params) => {
  const foodId = params?.body?.foodId;
  const foodTag = params?.body?.foodTag;
  if (!foodId || !foodTag) {
    throw new Error("Missing Params");
  }
  console.log("asdf", foodId);
  const nFoodId = new ObjectId(foodId);
  const updateTagRes = await foodColl.updateOne(
    {
      _id: nFoodId,
    },
    { $push: { tags: foodTag } }
  );
  const updatedFoodObject = await foodColl.findOne({ _id: nFoodId });
  return updatedFoodObject;
};

export const removeFoodTag = async (params) => {
  const foodId = params?.body?.foodId;
  const foodTagIndex = params?.body?.foodTagIndex;
  if (!foodId || foodTagIndex === null || foodTagIndex === undefined) {
    throw new Error("Missing Params");
  }
  const nFoodId = new ObjectId(foodId);
  const foodObject = await foodColl.findOne({ _id: nFoodId });
  let tagArray = foodObject.tags;
  tagArray.splice(foodTagIndex, 1);
  const updateTagRes = await foodColl.updateOne(
    { _id: nFoodId },
    { $set: { tags: tagArray } }
  );
  const updatedFoodObject = await foodColl.findOne({ _id: nFoodId });
  return updatedFoodObject;
};

export const deleteAllFoods = async () => {
  const deleteAllFoodsRes = await foodColl.deleteMany({});
  return deleteAllFoodsRes;
};
