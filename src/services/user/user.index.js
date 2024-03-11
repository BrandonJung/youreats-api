import { ObjectId } from "bson";
import { devDB } from "../../../config.js";

const userColl = devDB.collection("Users");

export const retrieveUser = async (params) => {
  const userId = params?.query?.userId;
  const nUserId = new ObjectId(userId);
  if (userId) {
    const userRes = await userColl
      .find({
        _id: nUserId,
      })
      .toArray();
    return userRes[0];
  } else {
    throw new Error("No user ID provided");
  }
};

export const makeUser = async (params) => {
  const firstName = params?.body?.firstName;
  const lastName = params?.body?.lastName;
  const email = params?.body?.email;
  const mobile = params?.body?.mobile;

  if (!firstName) {
    throw new Error("No first name provided");
  }
  if (!email) {
    throw new Error("No email provided");
  }

  const newUserObject = {
    firstName,
    email,
  };
  if (lastName) {
    newUserObject.lastName = lastName;
  }
  if (mobile) {
    newUserObject.mobile = mobile;
  }

  const makeUserRes = await userColl.insertOne(newUserObject);
  return makeUserRes;
};

export const deleteAllUsers = async () => {
  const deleteAllUsersRes = await userColl.deleteMany({});
  return deleteAllUsersRes;
};
