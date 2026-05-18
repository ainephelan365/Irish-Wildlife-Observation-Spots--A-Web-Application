// Implementing review feature model for each wildlife spot

import Mongoose from "mongoose";

const { Schema } = Mongoose;

const spotReviewSchema = new Schema({
  title: String,
  comment: String,
  category: String,
  date: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  spotid: {
    type: Schema.Types.ObjectId,
    ref: "Spot",
  },
});

export const Review = Mongoose.model("Review", spotReviewSchema);
