import Mongoose from "mongoose";

const { Schema } = Mongoose;

const spotSchema = new Schema({
  title: String,
  description: String,
  image: String,
  latitude: Number,
  longitude: Number,
  category: String,
  img: String,
  // implementing visibility for private and public poi
  visibility: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Spot = Mongoose.model("Spot", spotSchema);
