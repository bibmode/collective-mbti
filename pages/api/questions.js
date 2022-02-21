import { connectToDatabase } from "../../util/mongodb";

const selfTestQuestionnaire = async (req, res) => {
  const { db } = await connectToDatabase();
  let questions;

  if (req.body.testType === "self-test") {
    questions = await db
      .collection("self-test")
      .aggregate([{ $sample: { size: 32 } }])
      .limit(33)
      .toArray();
  }

  res.json(questions);
};

export default selfTestQuestionnaire;
