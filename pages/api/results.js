import { connectToDatabase } from "../../util/mongodb";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "POST": {
      return addResult(req, res);
    }
  }
}

async function addResult(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // add the post
    await db.collection("selftest-results").insertOne(JSON.parse(req.body));
    // return a message

    console.log(res);

    return res.json({
      message: "Result added successfully",
      success: true,
    });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
