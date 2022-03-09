import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);
  const { userId, reqFunction } = req.body;

  // switch the methods
  switch (reqFunction) {
    case "getUser": {
      return getUser(req, res, userId);
    }
    case "getTypology": {
      return getTypology(req, res, userId);
    }
    case "updateAccordingToFriends": {
      return addFriendsCalculation(req, res, userId);
    }
  }
}

async function getUser(req, res, userId) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let userResult = await db
      .collection("users")
      .find({ _id: ObjectId(userId) })
      .toArray();

    // return the posts
    return res.json({
      message: JSON.parse(JSON.stringify(userResult)),
      success: true,
    });
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function getTypology(req, res, userId) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let userResult = await db
      .collection("typology")
      .find({ user: userId })
      .sort({ published: -1 })
      .toArray();

    // return the posts
    return res.json({
      message: JSON.parse(JSON.stringify(userResult)),
      success: true,
    });
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function addFriendsCalculation(req, res, userId) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();

    req.body = JSON.parse(req.body);
    const { friendsResult } = req.body;

    console.log(friendsResult);

    // fetch the posts
    let userResult = await db.collection("users").updateOne(
      { _id: ObjectId(userId) },
      {
        $set: { AccordingToFriends: friendsResult },
      }
    );

    // return the posts
    return res.json({
      success: true,
    });
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
