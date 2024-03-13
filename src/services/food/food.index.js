import { ObjectId } from "bson";
import { devDB } from "../../../config.js";

const restaurantColl = devDB.collection("Restaurants");
const foodListColl = devDB.collection("FoodsList");

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
    restaurantId: nRestaurantId,
    eaters: [eaterName],
    ratings: [],
    notes: [],
  };
  if (rating) {
    newFoodItemObject.ratings = [newRatingObject];
  }
  if (note) {
    newFoodItemObject.notes = [newNoteObject];
  }

  if (restaurantObject.foodListId) {
    // Restaurant food list exists
    const foodListId = new ObjectId(restaurantObject.foodListId);
    let foodListObject = await foodListColl.findOne({
      _id: foodListId,
    });
    let foodsObject = foodListObject.foods;
    const foodItemAlreadyExistsIndex = foodsObject.findIndex(
      (food) => food.name.toLowerCase() === foodName.toLowerCase()
    );
    if (foodItemAlreadyExistsIndex > -1) {
      // Food Item exists
      const eaterAlreadyExists = foodsObject[
        foodItemAlreadyExistsIndex
      ].eaters.findIndex(
        (eater) => eater.toLowerCase() === eaterName.toLowerCase()
      );
      if (eaterAlreadyExists === -1) {
        foodsObject[foodItemAlreadyExistsIndex].eaters.push(eaterName);
      }
      if (rating) {
        foodsObject[foodItemAlreadyExistsIndex].ratings.push(newRatingObject);
      }
      if (note) {
        foodsObject[foodItemAlreadyExistsIndex].notes.push(newNoteObject);
      }
      const modifyExistingFoodListRes = await foodListColl.updateOne(
        {
          _id: foodListObject._id,
        },
        {
          $set: {
            foods: foodsObject,
          },
        }
      );
      return modifyExistingFoodListRes;
    } else {
      // Food Item doesn't exist
      const updateFoodsListRes = await foodListColl.updateOne(
        { _id: foodListObject._id },
        { $push: { foods: newFoodItemObject } }
      );
      return updateFoodsListRes;
    }
  } else {
    // Restaurant food list doesn't exist
    const newFoodListObject = {
      foods: [newFoodItemObject],
    };
    const insertFoodListRes = await foodListColl.insertOne(newFoodListObject);
    const insertedFoodListId = insertFoodListRes.insertedId;
    const restaurantFoodListRes = await restaurantColl.updateOne(
      { _id: nRestaurantId },
      {
        $set: {
          foodListId: insertedFoodListId,
        },
      }
    );
    return restaurantFoodListRes;
  }
};

export const retrieveFoodsList = async (params) => {
  const foodsListId = params?.query?.foodsListId;
  if (!foodsListId) throw new Error("Missing foods list id");
  const retrieveFoodsListRes = await foodListColl.findOne({
    _id: new ObjectId(foodsListId),
  });
  return retrieveFoodsListRes;
};

export const deleteAllFoods = async () => {
  const deleteAllFoodsRes = await foodListColl.deleteMany({});
  return deleteAllFoodsRes;
};
