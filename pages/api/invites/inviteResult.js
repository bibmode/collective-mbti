import { ObjectId } from "mongodb";
import getMBTIAnalysis from "../../../util/getMBTIAnalysis";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "POST": {
      return postResult(req, res);
    }
    case "GET": {
      return getTypology(req, res);
    }
  }
}

async function postResult(req, res) {
  const { user, test, invited, relation, choices, mbtiResult } = JSON.parse(
    req.body
  );

  try {
    // connect to the database
    let { db } = await connectToDatabase();

    // getting date
    const today = new Date();

    // insert
    await db.collection("typology").insertOne({
      _id: test,
      user,
      invited,
      relation,
      choices,
      mbtiResult,
      time: `${today.toLocaleString("en-US")}`,
    });

    updateAccordingToFriends(user, db);
    updateAccumulativeResult(user, db, choices);

    // return a message
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

async function getTypology(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();

    // getting url

    const url = new URL(window.location.href);
    const userId = url.slice(url.origin.length, url.length);

    console.log(userId);

    // insert
    let results = await db
      .collection("typology")
      .find({
        user: userId,
      })
      .toArray();

    // return a message
    return res.json({
      message: JSON.parse(JSON.stringify(results)),
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

async function updateAccordingToFriends(userId, db) {
  // connect to the database
  // let { db } = await connectToDatabase();
  let compiledChoices = [];
  // console.log(userId);

  const userTypology = await db
    .collection("typology")
    .find({ user: userId })
    .toArray();

  const resTypology = await JSON.parse(JSON.stringify(userTypology));

  console.log("++++++++ according to friends ++++++++");
  console.log(resTypology);

  resTypology.map((item) => {
    compiledChoices.push(...item.choices);
  });

  const friendsResult = await getMBTIAnalysis(
    compiledChoices,
    "According To Friends"
  );

  // update
  await db.collection("users").updateOne(
    { _id: ObjectId(userId) },
    {
      $set: {
        AccordingToFriends: friendsResult,
        choicesAccordingToFriends: compiledChoices,
      },
    }
  );
}

async function updateAccumulativeResult(userId, db, selfTestChoices) {
  // connect to the database
  // let { db } = await connectToDatabase();
  let compiledChoices = selfTestChoices;
  // console.log(userId);

  const userTypology = await db
    .collection("typology")
    .find({ user: userId })
    .toArray();

  const resTypology = await JSON.parse(JSON.stringify(userTypology));

  console.log("++++++++ according to friends ++++++++");
  console.log(resTypology);

  resTypology.map((item) => {
    compiledChoices.push(...item.choices);
  });

  const accumulativeResult = await getMBTIAnalysis(
    compiledChoices,
    "Accumulative Result"
  );

  // update
  await db.collection("users").updateOne(
    { _id: ObjectId(userId) },
    {
      $set: {
        AccumulativeResult: accumulativeResult,
        choicesAccumulativeResult: compiledChoices,
      },
    }
  );
}
