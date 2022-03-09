import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "PUT": {
      return updateResult(req, res);
    }
  }
}

async function updateResult(req, res) {
  const { mbti, userEmail, choices } = JSON.parse(req.body);
  console.log(mbti, userEmail);
  try {
    // connect to the database
    let { db } = await connectToDatabase();

    // update the published status of the post
    await db.collection("users").updateOne(
      {
        email: userEmail,
      },
      { $set: { selfTested: mbti, choicesSelfTested: choices } }
    );

    // return a message
    return res.json({
      message: "User updated successfully",
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
