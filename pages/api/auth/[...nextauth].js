import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { MongoClient } from "mongodb";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    jwt: async ({ token, user }) => {
      const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      //Get all the users
      const users = await client.db().collection("users");

      //Find user with the email
      const result = await users.findOne({
        email: token.email,
      });

      if (result && !result.selfTested) {
        users.updateOne({ email: token.email }, { $set: { selfTested: null } });
      }

      if (result && !result.AccordingToFriends) {
        users.updateOne(
          { email: token.email },
          { $set: { AccordingToFriends: null } }
        );
      }

      if (result && !result.AccumulativeResult) {
        users.updateOne(
          { email: token.email },
          { $set: { AccumulativeResult: null } }
        );
      }

      token.selfTested = result.selfTested;
      token.AccordingToFriends = result.AccordingToFriends;
      token.AccumulativeResult = result.AccumulativeResult;

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token;

      return session;
    },
  },
});
