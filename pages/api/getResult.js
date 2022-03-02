import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "POST": {
      return getResult(req, res);
    }
  }
}

async function getResult(req, res) {
  req.body = JSON.parse(req.body);
  console.log(req.body.userEmail);

  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let mbtiResult = await db
      .collection("users")
      .find({ email: req.body.userEmail })
      .sort({ published: -1 })
      .toArray();

    // return the posts
    return res.json({
      message: JSON.parse(JSON.stringify(mbtiResult)),
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
