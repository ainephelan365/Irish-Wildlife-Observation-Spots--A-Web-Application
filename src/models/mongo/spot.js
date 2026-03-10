import Mongoose from "mongoose";

const { Schema } = Mongoose;

const spotSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const spot = Mongoose.model("spot", spotSchema);
