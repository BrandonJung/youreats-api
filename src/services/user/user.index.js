import { ObjectId } from "bson";
import { devDB } from "../../../config.js";

const userColl = devDB.collection("Users");

export const retrieveUserById = async (params) => {
  const userId = params?.query?.userId;
  if (!userId) {
    const userRes = await userColl
      .find({
        _id: new ObjectId("65e8524c4787bd41cb6265e9"),
      })
      .toArray();
    console.log(userRes);
    return userRes;
  } else {
    throw new Error("No user ID provided");
  }
};

export const addUser = async () => {};
